import React, { Component } from 'react'
import Hill from './hill.jpg'
import Weather from './Weather'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Form from './Form'
import Todo from './Todo'

export class Image extends Component {
    constructor(props){
        super(props)
        this.state={
            todos:[
            ]
        }
    }
    componentDidMount(){
        //Fetch, and setState
        fetch('/api').then((res)=>{
            return res.json()
        }).then(data=>{
            this.setState({
                todos: data
            })
        })
    }
    render() {
        const ContainerStyle={
            background: `url(${Hill})`,
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            zIndex:'-1',
            height: '100vh',
            overflow: 'auto',
        }
        
        return (
            <div style={ContainerStyle}>
                <Weather Temperature={this.props.Temperature} Humidity={this.props.Humidity} WeatherIconID={this.props.WeatherIconID}></Weather>
                    <Container maxWidth="lg" style={{ paddingBottom:'2%', marginTop:'-10%'}}>
                        <Typography variant="h3" style={{textAlign: "center", color: "white", padding: '2.5%'}}>Hello Jordan</Typography>
                        <Typography variant="h4" style={this.props.textStyle}>{this.props.date} {this.props.weekday} {this.props.time}</Typography>
                    </Container>
                    <Container maxWidth="md">
                        <Form todos={this.state.todos}></Form>
                    </Container>
                    <Container maxWidth="sm">
                        <form>
                            <Todo todos={this.state.todos}></Todo>
                        </form>
                    </Container>

            </div>
        )
    }
}
//how to make weather and container start with same height
export default Image