import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

export class SignUp extends Component {
    state = {
        email: '',
        password: '',
        firstName: '',
        lastName: ''
    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        console.log(e);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleCheckBoxChange = (e) => {
        console.log(e.target.id);
        console.log("Checkbox status : ", e.target.checked);
    }

    componentDidMount() {
        document.querySelector("#allow-geo").checked = "checked";
    }

    render() {
        return (
            <div className="row">
                <div className="col s8 m4 offset-s2 offset-m4 ">
                    <form className="white signin z-depth-3" onSubmit={this.handleSubmit}>
                        <h5 className="grey-text text-darken-3">Sign up</h5>
                        <div className="row">
                            <div className="input-field col s6">
                                <input id="firstName" type="text" onChange={this.handleChange} className="validate" />
                                <label htmlFor="firstName">First Name</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="lastName" type="text" onChange={this.handleChange} className="validate" />
                                <label htmlFor="lastName">Last Name</label>
                            </div>
                        </div>
                        <div className="input-field">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" onChange={this.handleChange} className="validate"/>
                        </div>
                        <div className="input-field">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" onChange={this.handleChange} className="validate"/>
                        </div>
                        <div className="input-field">
                            <label htmlFor="password-check">Password</label>
                            <input type="password" id="password-check" onChange={this.handleChange} className="validate"/>
                        </div>
                        <p>
                            <label>
                                <input id="allow-geo" type="checkbox" className="filled-in" onChange={this.handleCheckBoxChange}/>
                                <span htmlFor="allow-geo" >Allow geo-localisation</span>
                            </label>
                        </p>
                        <div className="input-field">
                            <button className="btn pink lighten-1 z-depth-0 pulse">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(SignUp)
