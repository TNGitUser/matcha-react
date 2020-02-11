import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

export class ProfilePeek extends Component {
    state = {
        profile_id : 5468871046058184,
        age : 26,
        city : "Vernon"
    }

    render() {
        return (
            <div className="col card profilePeek" onClick={() => { this.props.history.push('/profiles/' + this.state.profile_id) }}>
                <div className="profile-image activator">
                    <img src="/img/beautiful_female.jpg" alt="" className="activator wave-effect waves-block waves-light"/>
                </div>
                <div className="card-content">
                    <span className="card-title activator grey-text center">Laura</span>
                    <p className="pink-text center">{this.state.age} ans - {this.state.city}</p>
                </div>
            </div>
        )
    }
}

export default withRouter(ProfilePeek)
