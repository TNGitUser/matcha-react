import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

export class ProfilePeek extends Component {
    state = {
        profile_id : 5468871046058184,
        name : "Laura",
        age : 26,
        city : "Vernon",
        liked : false
    }

    handleLike = (e) => {
        this.setState({
            liked : !(this.state.liked)
        });
    }

    render() {
        const liked_style = this.state.liked ? "liked" : "unliked";
        const liked_icon_style = this.state.liked ? "icon-liked" : "";
        return (
            <div className="col card profilePeek">
                <div className="profile-image activator" onClick={() => { this.props.history.push('/profiles/' + this.state.profile_id) }}>
                    <img src="/img/beautiful_female.jpg" alt="" className="activator"/>
                </div>
                <div className="profilePeekActions">
                    <a href="#like" onClick={this.handleLike} className={"btn-floating btn-large waves-effect waves-light " + liked_style}>
                        <i className={"fa fa-heart " + liked_icon_style} aria-hidden="true"></i>
                    </a>
                    <a href="#!" className="btn-floating btn-large enabled">
                        <i className="material-icons">message</i>
                    </a>
                </div>
                <div className="card-content">
                    <span className="card-title activator grey-text center" onClick={() => { this.props.history.push('/profiles/' + this.state.profile_id) }}>Laura</span>
                    <p className="pink-text center">{this.state.age} ans - {this.state.city}</p>
                </div>
            </div>
        )
    }
}

export default withRouter(ProfilePeek)
