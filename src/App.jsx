import React, { Component } from 'react';
import './app.css';
import { Form, FormControl, InputGroup, Glyphicon, Button} from 'react-bootstrap';
import Weather from './Weather';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            json: null
        }
    }

    search() {
        const BASE_URL = "http://api.openweathermap.org/data/2.5/forecast?q=";
        var string = this.state.query;
        var replaced = string.split(' ').join('+');
        const FETCH_URL = BASE_URL + replaced + "&mode=json&APPID=6c9cca3b9c5136848c745e322db2fcca"; 
        fetch(FETCH_URL, {
            method: 'GET'
        })   
        .then(response => response.json())
        .then(json => {
            console.log(json);
            this.setState({json})
        });
        //console.log(this.state);
    }

    render() {
        return (
            <div className = "App">
                <div className = "App-title"> Weather App</div>
                <div className = "Input-form">
                    <Form horizontal>
                        <InputGroup className = "Input-field">
                            <FormControl
                                placeholder = 'Enter Location'
                                onChange = {
                                    event => {
                                        this.setState({query: event.target.value})
                                    }
                                }
                                onKeyPress = {
                                    event => {
                                        if(event.key === 'Enter') {
                                            event.preventDefault();
                                            this.search();
                                        }
                                    }
                                } 
                            />
                            <InputGroup.Addon onClick = {() => this.search()}>
                                <Glyphicon glyph = "search" />
                            </InputGroup.Addon>
                        </InputGroup>
                        <div>
                            <Button className = "Current-location-btn btn-primary"> 
                                Get weather at your current location
                            </Button>
                        </div>
                    </Form>
                </div>
                {   
                    this.state.json !== null                
                    ? <div> 
                        <Weather json = {this.state.json} />
                    </div>
                    : <div></div>
                }
                
            </div>
        )
    }
}

export default App;