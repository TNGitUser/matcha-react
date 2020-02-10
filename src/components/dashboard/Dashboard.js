import React, { Component } from 'react'
import { connect } from 'react-redux'

class Dashboard extends Component {
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
