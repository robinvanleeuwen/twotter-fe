import { Component } from "react";
import { Button, Form } from "react-bootstrap";
import axios from 'axios';
import update from 'immutability-helper';


class Users extends Component {

    primaryFields = ["username"];
    uiFields = ["email", "first_name", "last_name"];


    constructor(props) {
        super(props);
        this.state = {}
        this.primaryFields.map((id) => {
            this.setState({[id]:""});
        });

        this.uiFields.map((id) => {
            this.setState({[id]: ""});
        })
    }

    clearState() {
        [...this.primaryFields, ...this.uiFields].forEach((field) => {
            this.setState({[field]: ""});
        })
    }

    lookupUser(lookupKey) {
        if (lookupKey === "") {
            console.log("Clearing State");
            this.clearState();
            return;
        }
        try {
            axios.get('http://127.0.0.1:8000/user/'+lookupKey, { validateStatus: false })
            .then(res => {
                if ("error" in res.data) {
                    this.clearState();
                    return;
                }
                const user = res.data;
                this.setState(user);
            });
        } catch(err) {
        }
        
    }

    updateRecord = (e) => {

        let data = {};
        [...this.primaryFields, ... this.uiFields].forEach((field) => {
            data[field] = this.state[field];
        })

        axios.post('http://127.0.0.1:8000/user/'+this.state.username, data)
        .then(res => {

        });
    }

    updateField = (e) => {

        this.setState({[e.target.id]: e.target.value});
    }

    changeHandler = (e) => {
        this.lookupUser(e.target.value);
        this.updateField(e);
    }

    render() {
        return (
            <div>
                <Form>
                    <div align="left">
                    <hr />
                    <Form.Group>
                        <Form.Label
                        htmlFor="username"
                        >Username</Form.Label>
                        <Form.Control
                        onChange={this.changeHandler}
                        type="text"
                        id="username" />
                    </Form.Group>
                    </div>
                    <hr />
                    <div align="left">
                    <Form.Group>
                        <Form.Label
                        htmlFor="email"
                        value="email">Email</Form.Label>
                        <Form.Control
                        type="text"
                        id="email"
                        onChange={this.updateField}
                        value={this.state.email}
                        />
                    </Form.Group>
                    </div>
                    <div align="left">
                    <Form.Group>
                        <Form.Label
                        htmlFor="first_name"
                        >First Name</Form.Label>
                        <Form.Control
                        type="text"
                        id="first_name"
                        onChange={this.updateField}
                        value={this.state.first_name}
                        />
                    </Form.Group>
                    </div>
                    <div align="left">
                    <Form.Group>
                        <Form.Label
                        htmlFor="last_name"
                        >Last Name</Form.Label>
                        <Form.Control
                        type="text"
                        id="last_name"
                        onChange={this.updateField}
                        value={this.state.last_name}
                        />
                    </Form.Group>
                    </div>
                    <hr />
                    <Form.Group role="form">
                        <Button 
                        className="btn"
                        onClick={this.updateRecord}
                        disabled={!this.state.username}
                        > Update </Button>
                        <Button
                        className="btn"
                        onClick={this.createRecord}
                        disabled={this.state.username}
                        >Create</Button>
                    </Form.Group>
                </Form>
            </div>
        )
    }
}

export default Users;