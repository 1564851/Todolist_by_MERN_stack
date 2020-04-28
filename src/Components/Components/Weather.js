import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'


class Weather extends Component {
    componentDidMount(){
        console.log(this.props.WeatherIconID)
    }
    render() {
        const WeatherStyle={
            display: 'flex',
            flexDirection: 'row-reverse',
            padding: '2vmin',
            color: 'white',
            zIndex:'3'
        }
        const WeatherIconIDURL =  `https://openweathermap.org/img/wn/${this.props.WeatherIconID}@2x.png`
        

        return (
            //1. Maintain Aspect ratio (If width is less than height, use width, else use height)
            //2. Always maintain the image smaller size to the 15% of view
            <div style={WeatherStyle}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <img src={WeatherIconIDURL} alt='WeatherIcon' style={{
                        width: '12vmin',
                        height: '12vmin',
                    }}></img>

                    <Typography variant="h6" style={{
                        textAlign: 'center',
                        fontSize: '2vmin', 
                    }}>{this.props.Temperature.toFixed(1)}˚C {this.props.Humidity}%</Typography>
                </div>
            </div>

        )
    }
}

export default Weather