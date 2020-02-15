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
    }

    render() {
        return (
            <div className="fullpage">
                <div className="full-love">
                    <img src="/img/ItCouldBeYou.jpg" className="full-love-img" alt="It could be you !"/>
                    <h2 className="catch">Ça pourrait-être vous !</h2>
                </div>
                <div className="rest-for-mobile hide-on-med-and-up">
                    ojpinobde
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
