import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'


class Weather extends Component {
    componentDidMount(){
        console.log(this.props.WeatherIconID)
    }
    render() {
        const WeatherStyle={
            textAlign: 'right',
            padding: '2%',
            color: 'white',
            zIndex:'3'
        }
        const WeatherIconIDURL =  `http://openweathermap.org/img/wn/${this.props.WeatherIconID}@2x.png`
        

        return (
            <div style={WeatherStyle}>
                <img src={WeatherIconIDURL} alt='WeatherIcon'></img>
                <Typography variant="h6">{this.props.Temperature.toFixed(1)}˚C {this.props.Humidity}%</Typography>
            </div>
        )
    }
}

export default Weather