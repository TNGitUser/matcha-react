import React, { Component } from 'react'
import { connect } from 'react-redux';
import Axios from 'axios';
import { authLogin } from '../../store/actions/authActions';

export class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            error: null
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        Axios.post("http://10.12.9.18:8080/login", {email : this.state.email, password : this.state.password}).then((response) => {
            const data = response.data;
            const log_status = data.login_user_status;
            const status = log_status.status ? true : false;
            var user = -1;
            if (status) {
                user = log_status.success;
                this.props.authUser(user);
                this.props.history.push("/");
            } else {
                if (log_status.error === "email") {
                    var mail_input = document.getElementById("email");
                    mail_input.classList.add("login-error");
                    console.log("Mail error");
                }
                else if (log_status.error === "password") {
                    var pwd_input = document.getElementById("password");
                    pwd_input.classList.add("login-error");
                    console.log("Password error");
                }
                else console.log("Unknown error");
            }
        }).catch((error) => {
            console.log(error);
          });

    }

    handleChange = (e) => {
        var input = document.getElementById(e.target.id);
        input.classList.remove("login-error");
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    render() {
        var error = this.state.error;
        return (
            <div>
                <div className="row">
                    { error }
                    <div className="col s8 m6 offset-s2 offset-m3 ">
                        <form className="white signin z-depth-3" onSubmit={this.handleSubmit}>
                            <h5 className="grey-text text-darken-3">Sign in</h5>
                            <div className="input-field">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" onChange={this.handleChange}/>
                            </div>
                            <div className="input-field">
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" onChange={this.handleChange}/>
                            </div>
                            <div className="input-field">
                                <button className="btn pink lighten-1 z-depth-0">Login</button>
                                <button className="btn grey lighten-1 z-depth-1 right hide-on-med-and-down small" onClick={() => { this.props.history.push('/forgot-password') }}>Mot de passe oublié ?</button>
                                <i className="material-icons hide-fw-pwd right forgot_pwd" onClick={() => { this.props.history.push('/forgot-password') }}>https</i>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ...state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        authUser : (id) => { dispatch(authLogin(id)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
