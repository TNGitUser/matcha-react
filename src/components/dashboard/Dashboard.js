import React, { Component } from 'react'
import { connect } from 'react-redux'
import Axios from 'axios';
import M from 'materialize-css';

class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            token : this.props.match.params['token']
        };
    }


    componentDidMount = () => {
        if (this.state.token != null) {
        Axios.get("http://10.12.10.19:8080/api/active?token=" + this.state.token).then(
            res => {
                M.toast({html : "Great ! Your accound was activated ", classes : "green toast-container-activation"});
            }).catch(e => {
                console.log(e);
            })
        }
        console.log(this.props);
    }

    render() {
        return (
            <div className="home">
                <div className="home-banner">
                    <img src="img/meeting.jpg" alt="Meeting people is nice !"></img>
                </div>
                <div className="home-about">
                    <h4 className="center title">Matcha'Soul</h4>
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

export default connect(mapStateToProps)(Dashboard)
