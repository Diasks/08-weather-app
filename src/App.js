import React, { Component } from 'react';
import {Container, Col, Row, Card, CardBody, Alert, Table } from 'reactstrap';
import Skycons from 'react-skycons';
import {MDBIcon} from 'mdbreact';
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
  <h1>Vädret just nu i {weather.timezone} <MDBIcon icon="globe" size="lg" /></h1> 

  <ul> 
    <li>  <Moment unix>{currently.time}</Moment></li>
    <li> {currently.summary}</li>
 <li> {Math.round((currently.temperature  - 32) * (5/9)) + "°C"}  </li> 
<li>{Math.round(currently.temperature) + "°F"} </li> 
<li>{currently.humidity + " %"} </li>
<li>{Math.round((currently.windSpeed)) + " mph"} </li>

</ul>
   </Alert>


<h3>Kortöversikt för veckan:</h3>


<Table bordered dark size="sm">
  <thead>
    <tr>
      <th>Prognos för var tredje timme</th>
      <th>Sammanfattning</th>
      <th>Temperatur</th>
    </tr>
  </thead>


  <tbody>


  {hourly.filter((_,i) => i % 3 === 0).map(h =>


 
    <tr>
      <td><Moment unix>{h.time}</Moment></td>
      <td>{h.summary}</td>
      <td>{Math.round((h.temperature  - 32) * (5/9)) + " °C"} {' '}  {Math.round(h.temperature) + "°F"}
      </td>
    </tr>
  
  )}

</tbody>
    </Table>



<h2>5-dagars prognos</h2>




<div>


  <Row> 
  {daily.slice(0,5).map(d => 
    <Col xs="6" sm="4">
  <Card body inverse color="info" style={{borderColor: '#333' }}>
    <CardBody>
  <h3> <Moment unix>{d.time}</Moment> </h3>
  
<Skycons color='white'
      icon={d.icon.toUpperCase()} 
      autoplay={true}/>
  <ul>
  <li key={d.temperatureHigh}><MDBIcon icon="temperature-high" size="lg"/> {Math.round((d.temperatureHigh  - 32) * (5/9)) + " °C"} {' '}
{Math.round(d.temperatureHigh) + " °F"}</li>
<li key={d.temperatureLow}><MDBIcon icon="temperature-low" size="lg"/> {Math.round((d.temperatureLow  - 32) * (5/9)) + " °C"}
{' '} {Math.round(d.temperatureLow) + " °F"}</li>
 <li key={d.humidity}><MDBIcon icon ="tint" size="lg"/><MDBIcon icon ="percent" size="lg" /> {d.humidity + "%"}</li>
<li key={d.windSpeed}><MDBIcon icon="wind" size="lg"/> {Math.round((d.windSpeed)) + " mph"}</li>
<li> <MDBIcon icon="sun" size="lg" /> <MDBIcon icon="long-arrow-alt-up" size="lg" /> <Moment unix>{d.sunriseTime}</Moment> </li> 
 <li> <MDBIcon icon="sun" size="lg" /> <MDBIcon icon="long-arrow-alt-down" size="lg" /> <Moment unix>{d.sunsetTime}</Moment> </li>

</ul>
</CardBody>
</Card>
</Col>
)}
</Row> 
</div>




</Container>



);

} 

}

export default App;

//Saker som ska finnas med för användaren:

// Temperatur, Vindstyrka, Luftfuktighet, Soluppgång & nedgång (klockslag), välj mellan farenheit & celcius

//se kortöversikt 7 dagars väder, var tredje timme för nuvarande dygn, 5-dagars prognos

