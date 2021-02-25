import { Component } from "react";
import { TwootContext } from '../contexts/TwootContext';
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
    
        const result = await axios.get("http://127.0.0.1:8000/users");
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
        axios.get("http://127.0.0.1:8000/twoot/get/byuser/" + x).then(x => {
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
                <ul>
                    { this.getUsers() }
                </ul>
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