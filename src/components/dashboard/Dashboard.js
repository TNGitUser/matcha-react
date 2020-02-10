import React, { Component } from 'react'
import { connect } from 'react-redux'

class Dashboard extends Component {
    render() {
        return (
            <div className="home">
                <h2 className="center">Home</h2>
                <div className="home-banner">

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
