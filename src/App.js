import React, { Component } from 'react'
import update from 'immutability-helper';
import math from 'mathjs';
import './App.css';

class App extends Component {
//konstruktori johon kerätään näppäilty laskutoimitus stateen
  constructor() {
    super()
    this.state = { operations: [] }
  }
//käsitellään klikkaukset
  handleClick = e => {
    //tapahtuman e kohde aka. mikä nappula klikattu
    const value = e.target.getAttribute('data-value')
    //tarkistetaan mitä on klikattu, clear nappulalla stateen tyhjää, yhtäkuin-nappulalla laskutoimitus ja jos tulee muiden nappuloiden painalluksia, niistä jokainen lisätään alkioksi updatella operations taulukkoon
    switch (value) {
      case 'clear':
        this.setState({
          operations: [],
        })
        break
      case 'equal':
        this.calculateOperations()
        break
      default:
        const newOperations = update(this.state.operations, {
          $push: [value],
        })
        this.setState({
          operations: newOperations,
        })
        break
    }
  }
  //laskutoimitukset
  calculateOperations = () => {
    //muutetaan ensin taulukko stringiksi
    let result = this.state.operations.join('')
    if (result) {
      //math.eval osaa muuttaa stringin laskutoimitukseksi 
      result = math.eval(result)
      //notation fixed ja precision 2 määrittävät että tuloksessa näkyy aina vain 2 desimaalia
      result = math.format(result, {notation: 'fixed', precision: 2 })
      //tulos stringiksi ja stateen
      result = String(result)
      this.setState({
        operations: [result],
      }) 
    }
  }
  render() {
    return (
      <div className="App">
        <Display data={this.state.operations} />
        <Buttons>
          <Button onClick={this.handleClick} label="C" value="clear" />
          <Button onClick={this.handleClick} label="7" value="7" />
          <Button onClick={this.handleClick} label="4" value="4" />
          <Button onClick={this.handleClick} label="1" value="1" />
          <Button onClick={this.handleClick} label="0" value="0" />

          <Button onClick={this.handleClick} label="/" value="/" />
          <Button onClick={this.handleClick} label="8" value="8" />
          <Button onClick={this.handleClick} label="5" value="5" />
          <Button onClick={this.handleClick} label="2" value="2" />
          <Button onClick={this.handleClick} label="." value="." />

          <Button onClick={this.handleClick} label="x" value="*" />
          <Button onClick={this.handleClick} label="9" value="9" />
          <Button onClick={this.handleClick} label="6" value="6" />
          <Button onClick={this.handleClick} label="3" value="3" />
          <Button label="" value="null" />

          <Button onClick={this.handleClick} label="-" value="-" />
          <Button onClick={this.handleClick} label="+" size="2" value="+" />
          <Button onClick={this.handleClick} label="=" size="2" value="equal" />
        </Buttons>
      </div>
    )
  }
}
//Laskimen nappuloiden pohja, päivittää lapsensa, eli nappulat
class Buttons extends Component {
  render() {
    return <div className="Buttons"> {this.props.children} </div>
  }
}
//yksittäinen nappula päivittää omat ominaisuutensa
class Button extends Component {
  render() {
    return (
      <div
        onClick={this.props.onClick}
        className="Button"
        data-size={this.props.size}
        data-value={this.props.value}
      >   
        {this.props.label}
      </div>
    )
  }
}

//näyttö, päivittää näytölle näppäiltyä laskutoimitusta
class Display extends Component {
  render() {
    const string = this.props.data.join('')
    return <div className="Display"> {string} </div>
  }
}

export default App;
