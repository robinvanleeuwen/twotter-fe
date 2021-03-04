import React, { Component, useContext } from "react";
import * as settings from '../settings';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from "../contexts/UserContext";
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    ButtonGroup,
    FormErrorMessage,
    FormHelperText,
} from "@chakra-ui/react"

class Users extends Component {
    
    static contextType = UserContext;

    primaryFields = ["username"];
    uiFields = ["email", "first_name", "last_name"];

    constructor(props) {
        super(props);
        
        this.state = [...this.primaryFields, ...this.uiFields].map((id) => {
            return { [id]: "" };
        });

        console.log(this.state);
    }

    clearState(field_type="all") {
        
        if (field_type === "all" || field_type === "ui"){

            this.uiFields.forEach((field) => {
                this.setState({ [field]: "" });
            });
        }
        if (field_type === "all" || field_type === "primary") {

            this.primaryFields.forEach((field) => {
                this.setState({ [field]: "" });
            });
        }
        
        
    }

    lookupUser(lookupKey) {
        console.log(settings.API_SERVER);
        console.log(process.env.NODE_ENV);
        if (lookupKey === "") {
            console.log("Clearing State");
            this.clearState("all");
            return;
        }
        try {
            axios.get(`${settings.API_SERVER}/user/${lookupKey}`)
            .then(res => {
                if (res.status != 200) {
                    throw (new Error("No 200 status"));
                }    
                if ("error" in res.data) {
                    this.clearState("ui");
                    return;
                }
                const user = res.data;
                this.setState(user);
                console.log(this.state);
            });
        } catch (err) {
            console.log("Error found");
        }
        
    }

    updateRecord = (e) => {

        let data = {};
        [...this.primaryFields, ...this.uiFields].forEach((field) => {
            data[field] = this.state[field];
        })

        axios.put(`${settings.API_SERVER}/user`, data)
        .then(res => {
                toast.info('Record Updated', {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                });
            
        });
    }

    updateField = (e) => {

        this.setState({[e.target.id]: e.target.value});
    }

    changeHandler = (e) => {
        this.lookupUser(e.target.value);
        this.updateField(e);
    }

    getPrimaryFormField = (fields) => {

        return fields.map((field) => {
            return (
                <div className="primary-fields">
                    <FormControl
                        key={field}
                        isRequired
                    >
                    <FormLabel>
                            {field}
                    </FormLabel>
                    <Input
                        data-lpignore="true"
                        id={field}
                        type="text"
                        onChange={this.changeHandler}
                        value={this.state[field]}
                    />
                    </FormControl>
                </div>
            )
        });
    }

    getUIFormFields = (fields) => {
        return fields.map((field) => {
            return (
                <div align="left" className="ui-fields">
                <FormControl
                    id={field}
                    key={field}
                >
                    <FormLabel>
                        {field}
                    </FormLabel>
                        <Input
                        data-lpignore="true"
                        type="text"
                        onChange={this.updateField}
                        value={this.state[field]}
                    />
                </FormControl>
                </div>
            )
        });
    }

    render() {
        return (
            <div>
                    <div align="left">
                    <hr />
                    { this.getPrimaryFormField(this.primaryFields) }
                    </div>
                    <hr />
                    { this.getUIFormFields(this.uiFields) }
                    <hr />
                    <ButtonGroup role="form" key="fg1">
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
                    </ButtonGroup>
                <ToastContainer
                    position="top-left"
                    autoClose={1500}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    key="toastcontainer"
                />
            </div>
        )
    }
}

export default Users;