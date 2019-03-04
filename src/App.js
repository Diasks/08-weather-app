import React, { Component } from 'react';
import './App.css';

class App extends Component {
constructor() {
  super();
  this.state = {
    items: [],
    isLoaded: false,
    error: null
  };
}


componentDidMount() {
  fetch("url:en till api:et")
  .then(res => res.json())
  .then(res => {
this.setState({
  items: res.results
} 
  )});
}




  render() {
const { items } = this.state;
    return (
      <div className="App">
    <h1>Planets</h1>
    <ul> 
    {items.map(planet=> (<li>{planet.name}</li>)
  )}</ul>
      </div>
    );
  }
}

export default App;
