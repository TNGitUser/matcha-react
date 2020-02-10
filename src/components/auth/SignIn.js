import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

export class SignIn extends Component {
    state = {
        email: '',
        password: '',
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
    render() {
        return (
            <div className="row">
                <div className="col s8 m4 offset-s2 offset-m4 ">
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
                            <button className="btn grey lighten-1 z-depth-1 right" onClick={() => { this.props.history.push('/forgot-password') }}>Mot de passe oublié ?</button>
                        </div>
                    </form>
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

export default withRouter(connect(mapStateToProps)(SignIn))
