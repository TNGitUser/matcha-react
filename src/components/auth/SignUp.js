import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import ReactPasswordStrength from 'react-password-strength';


export class SignUp extends Component {
    state = {
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        login: ''
    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        console.log(e);
        Axios.post("http://10.12.9.18:8080/create_user", {...this.state}).then((response) => {
            const data = response.data;
            console.log(data);
        }).catch((error) => {
            console.log(error);
          });
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
        console.log(this.props);
        return (
            <div className="row">
                <div className="col s8 m4 offset-s2 offset-m4 ">
                    <form className="white signin z-depth-3" onSubmit={this.handleSubmit}>
                        <h5 className="grey-text text-darken-3">Sign up</h5>
                        <div className="row">
                            <div className="input-field col s6">
                                <input id="firstname" type="text" onChange={this.handleChange} className="validate" />
                                <label htmlFor="firstname">First Name</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="lastname" type="text" onChange={this.handleChange} className="validate" />
                                <label htmlFor="lastname">Last Name</label>
                            </div>
                        </div>
                        <div className="input-field">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" onChange={this.handleChange} className="validate"/>
                        </div>
                        <div className="input-field">
                            <label htmlFor="login">Login</label>
                            <input type="text" id="login" onChange={this.handleChange} className="validate"/>
                        </div>
                        <ReactPasswordStrength className="input-field password-field" minLength={6} minScore={2}
                            scoreWords={['Faible', 'Moyen', 'Suffisant', 'Fort', 'Compliqué']}
                            tooShortWord={"Trop court"}
                            changeCallback={(e) => {this.handlePassword(e, "password")}}
                            inputProps={{ id: "password", name: "password", autoComplete: "off", placeholder: "Nouveau password"}}/>
                        <ReactPasswordStrength className="input-field password-field" minLength={6} minScore={2}
                            scoreWords={['Faible', 'Moyen', 'Suffisant', 'Fort', 'Compliqué']}
                            tooShortWord={"Trop court"}
                            changeCallback={(e) => {this.handlePassword(e, "vpassword")}}
                            inputProps={{ id: "vpassword", name: "password", autoComplete: "off", placeholder: "Vérification"}}/>
                        <p>
                            <label>
                                <input id="allow-geo" type="checkbox" className="filled-in" onChange={this.handleCheckBoxChange}/>
                                <span htmlFor="allow-geo" >Allow geo-localisation</span>
                            </label>
                        </p>                                
                        <div className="input-field">
                            <button className="btn pink lighten-1 z-depth-0 waves-effect waves-light">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(SignUp);
