import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

export class ProfilePeek extends Component {
    state = {}
    /*state = {
        profile_id : 5468871046058184,
        profile_picture : "/img/users/StellaCox.jpg",
        //profile_picture : "/img/users/beautiful_female.jpg",
        firstname : "Stella",
        lastname : "Cox",
        age : 26,
        city : "Vernon",
        liked : false
    }*/

    constructor(props) {
        super(props);

        this.state = {
            ...props.profile
        };
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
                <div className={this.state.log ? "online-badge" : "online-badge red"}></div>
                <div className="profile-image activator" onClick={() => { this.props.history.push('/profiles/' + this.state.login) }}>
                    <img src={this.state.profilePic} alt="" className="activator"/>
                </div>
                <div className="profilePeekActions">
                    <a href="#like" onClick={this.handleLike} className={"btn-floating btn-large waves-effect waves-light " + liked_style}>
                        <i className={"fa fa-heart " + liked_icon_style} aria-hidden="true"></i>
                    </a>
                    <a href="#!" className="btn-floating btn-large disabled">
                        <i className="material-icons">message</i>
                    </a>
                </div>
                <div className="card-content">
                    <span className="card-title activator grey-text center" onClick={() => { this.props.history.push('/profiles/' + this.state.profile_id) }}>{ this.state.firstname }</span>
                    <p className="pink-text center">{this.state.age} ans - {this.state.city}</p>
                </div>
            </div>
        )
    }
}

export default withRouter(ProfilePeek)