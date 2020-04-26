import React, { Component } from 'react'
import './App.css'
import moment from 'moment'
import Image from './Components/Image';


export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: moment().format('LTS'),
      date: moment().format('L'),
      weekday: moment().format('dddd'),
      latitude: 22.28552,
      longtitude: 114.15769,
      HalfHourInterval: 10000,
      WeatherIconID: '01d',
      Temperature: 25,
      Humidity: 80,
      textStyle: {textAlign: "center",
                  color: "white",
                  paddingBottom: '2.5%',
      },
    };
  }

  fetchWeather(){
    const success = (pos)=>{
      let crd = pos.coords;
      this.setState({
        latitude: crd.latitude,
        longtitude: crd.longitude
      })
    }

    navigator.geolocation.getCurrentPosition(success)

    let url = '/api/fetchweather';
    //Make API for the request
    //WEATHER_APP_ID='42e941caa2f322253f729fb85f026aa6'
    fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        lat: this.state.latitude,
        lng: this.state.longtitude
      })
    }).then(res=>res.json()
    ).then(data=>{
      this.setState({
        WeatherIconID: data.WeatherIconID,
        Temperature: data.Temperature,
        Humidity: data.Humidity
      })
    }).catch(err=>{
      console.log(err)
    })
  }

  componentDidMount(){
    this.fetchWeather()
    this.interval = setInterval(()=>{this.setState({time: moment().format('LTS'),
                                                    date: moment().format('L'),
                                                    weekday: moment().format('dddd'),
  });}, 1000)

    this.HalfHourInterval = setInterval(()=>{
      this.fetchWeather()
    },600000)}
    
  componentWillUnmount(){
    clearInterval(this.interval);
    clearInterval(this.HalfHourInterval)
  }

  render() {
    
    return (
      <div>
        <Image textStyle={this.state.textStyle} date={this.state.date} weekday={this.state.weekday} time={this.state.time} Temperature={this.state.Temperature} Humidity={this.state.Humidity} WeatherIconID={this.state.WeatherIconID}>
        </Image>
      </div>
    )
  }
}

export default App
