import React, { Component } from 'react';
import {Container, Col, Row, Card, CardBody, Alert, Table, Button } from 'reactstrap';
import Skycons from 'react-skycons';
import './App.css';
//Laddat ner react-moment som dependency och importerat den för att transformera datum och tid från unix
import Moment from 'react-moment';
//Valt format för datum och tid:
Moment.globalFormat = 'MM/DD HH:mm';

/*hade en weather array från början för all data,
 men för att få tillgång till all data med tanke på att det är objekt och array och objekt i 
 array osv så valde jag att göra en tom array för respektive sak jag vill kunna visa användaren */
class App extends Component {
constructor() {
  super();

  this.state = {
    weather: [],
    currently: [],
    hourly: [],
    daily: [],
    error: null
  };
}


/*Jag la i min geolocation i en funktion i min mount eftersom jag sedan sparar ner koordinaterna i respektiva variabel
för att använda dessa i min fetch till API:et, la också till svenska som språk i min request,
efter fetch så väljer jag att göra en setstate för respektive array där jag specifikt väljer vilken data det är jag vill komma åt,
för att inte komplicera livet så vill jag direkt in i arrayerna för daily och hourly så jag sedan bara kan rendera ut den datan i min render funktion*/

componentDidMount() {

  debugger;
  navigator.geolocation.getCurrentPosition((location) =>{
    let latitude = location.coords.latitude;
    let longitude = location.coords.longitude;
    debugger;
  fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/c3acb99cc725550cc7e45a340e32bd52/${latitude},${longitude}?lang=sv`)
  .then(res => res.json())
  .then(data => {
this.setState({ 
  weather: data,
  currently: data['currently'],
  hourly: data['hourly']['data'],
  daily: data['daily']['data']
});

debugger;
});
}) 
   
}

 
/*här uppdaterar jag respektive state till datan jag fetchat från min request och skickar tillbaka
mina html-element med innehåll och klasser jag använder från reactstrap*/

  render() {
const {weather } = this.state
const {currently} = this.state
const {hourly} = this.state
const {daily} = this.state




debugger;
    return (


<Container>

<Alert color="info">
     
   
  <h1>Vädret just nu:</h1>
  <Moment unix>{currently.time}</Moment>
  <p>{currently.summary}, 
temperatur:
 {Math.round(currently.temperature) + "°F"} 
 {Math.round((currently.temperature  - 32) * (5/9)) + "°C"}</p>
{console.log(currently)}
   </Alert>


   <Button outline color="info">5 dagar</Button>{' '}
    <Button outline color="info">7 dagar</Button>{' '}
    <Button outline color="info">Timvis</Button>

<h2>Prognos för varje timme</h2>
{hourly.map(h =>
  <Table bordered dark size="sm">
  <thead>
    <tr>
      <th></th>
      <th>Klockslag</th>
      <th>Sammanfattning</th>
      <th>Temperatur</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row"><Skycons 
      color='white' width="50" height="50"
      icon={h.icon.toUpperCase()}
      autoplay={true}/></th>
      <td><Moment unix>{h.time}</Moment></td>
      <td>{h.summary}</td>
      <td>{Math.round((h.temperature  - 32) * (5/9)) + " °C"}
      </td>
    </tr></tbody>
    </Table>

)}


<h2>7-dagars prognos för {weather.timezone}</h2>

{daily.map(d => 



<div>


  <Row> 
    <Col  xs="4" sm="4">
  <Card body inverse color="info" style={{borderColor: '#333' }}>
    <CardBody>
  <h2> <Moment unix>{d.time}</Moment> </h2>
  <p key={d.summary}>{d.summary}</p>
<Skycons 
      color='white' 
      icon={d.icon.toUpperCase()}
      autoplay={true}/>
  <ul>
<li>soluppgång: <Moment unix>{d.sunriseTime}</Moment> </li> 
 <li>solnedgång: <Moment unix>{d.sunsetTime}</Moment> </li>
 <li key={d.humidity}>luftfuktighet: {d.humidity + "%"}</li>
<li key={d.windSpeed}>vindstyrka: {Math.round((d.windSpeed)) + " mph"}</li>

<li key={d.temperatureHigh}>Högsta temperatur: {Math.round((d.temperatureHigh  - 32) * (5/9)) + " °C"}</li>
<li key={d.temperatureLow}>Lägsta temperatur: {Math.round((d.temperatureLow  - 32) * (5/9)) + " °C"}</li>
</ul>
</CardBody>
</Card>
</Col>
</Row> 
</div>


)}

</Container>



);

} 

}

export default App;

//Saker som ska finnas med för användaren:

// Temperatur, Vindstyrka, Luftfuktighet, Soluppgång & nedgång (klockslag), välj mellan farenheit & celcius

//se kortöversikt 7 dagars väder, var tredje timme för nuvarande dygn, 5-dagars prognos

