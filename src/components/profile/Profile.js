import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Profile extends Component {
    render() {
        return (
            <div className="container white">
                <h4 className="center">Profile</h4>
                <div className="row">
                    <div className="col s4 center">h</div>
                    <div className="col s4 center">h</div>
                    <div className="col s4 center">h</div>
                </div>
                <div className="divider center"></div>
                <div className="section container">
                    <h5 className="center">Biographie</h5>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Voluptate repudiandae explicabo, mollitia quasi eius, numquam nemo vel sit ad fugiat, minima eveniet veritatis rem nostrum.
                        Minima doloribus error deserunt nulla.</p>
                </div>
                <div className="divider center"></div>
                <div className="section container">
                    <h5 className="center">Caractéristiques</h5>
                    <div className="container">
                        <div className="row">
                            <div className="col s6 center">Hétérosexuel</div>
                            <div className="col s6 center">Homme</div>
                        </div>
                        <div className="row">
                            <div className="col s6 center">h</div>
                            <div className="col s6 center">h</div>
                        </div>
                        <div className="row">
                            <div className="col s6 center">h</div>
                            <div className="col s6 center">h</div>
                        </div>
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

export default connect(mapStateToProps)(Profile)
