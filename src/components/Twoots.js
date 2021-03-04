import { Component } from "react";
import { TwootContext } from '../contexts/TwootContext';
import * as settings from '../settings';

import axios from 'axios';

class Twoots extends Component {

    constructor(props) {
        super(props);
        this.state = {
            "users": [],
            "twoots": [],
        };
    }

    static contextType = TwootContext;
    

    async getUsersFromAPI() {
    
        const result = await axios.get(`${settings.API_SERVER}/users`);
        return result;
    }
    componentDidMount() {
        this.getUsersFromAPI().then(result => {
            this.setState({
                "users": result.data.map(x => {
                    return x.username
                })
            });
        });
    }
    getUsers() {
        return this.state.users.map(x => {
            return (
                <li key={x}><a href="#" onClick={(x) => this.getTwoots(x.target.text)}>{x}</a></li>
            )
        });
    }

    getTwoots(x) {
        axios.get(`${settings.API_SERVER}/twoot/get/byuser/` + x).then(x => {
            var twoots = [];

            for (const key in x.data[1]) {
                twoots.push(x.data[1][key])
            }

            this.setState({
                "twoots": twoots
            });
        });
    }

    render() {

        return (
            <div>
                <div className="users">
                <ul>
                    { this.getUsers() }
                    </ul>
                </div>
                <div className="container" id="container">
                {
                    this.state["twoots"].map(x => (
                        <div className="twoot">{x}</div>
                    ))
                }
                </div>  
            </div>
        );
    }

}

export default Twoots;