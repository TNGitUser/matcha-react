import React, { Component } from 'react'
import { connect } from 'react-redux'
import Axios from 'axios';
import M from 'materialize-css';

class UserView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ...props.user
        }
    }

    render() {
        return (
            <li className="collection-item avatar" key={ this.state.login } onClick={this.props.redirect}>
                <img src={ this.state.profilePic } alt="Profile visual" className="circle"/>
                <span className="title">{ this.state.firstname } { this.state.lastname }</span>
                <p>{this.state.age} ans<br/> {this.state.city}</p>
                <span className="secondary-content">{this.state.count}</span>
            </li>
        )
    }
}

class Historic extends Component {

    constructor(props) {
        super(props);

        this.state = {
            historicDay : null,
            historicWeek : null
        }
    }

    componentDidMount() {
        Axios.post("http://10.12.10.19:8080/api/get_historic", {
            id : this.props.auth.uid,
            token : this.props.auth.key
        }).then((response) => {
            console.log(response.data);
            if (response.data.status === 0) {
                M.toast({html : "Une erreur s'est produite. Merci de réessayer." , classes : "red"});
                return ;
            }
            this.setState({
                historicDay : response.data.success.historicDay,
                historicWeek : response.data.success.historicWeek
            }, () => {console.log(this.state)});
        });
    }   

    render() {
        return (
            <div className="historic-page container">
                <div className="historic-day">
                    <h3>Historique journalier</h3>
                    <ul className="collection">
                        { this.state.historicDay !== null && this.state.historicDay.map((user_view, index) => {
                            return <UserView user={user_view} redirect={() => {this.props.history.push("/profiles/" + user_view.login)}} key={index}/>
                        })}
                    </ul>
                </div>
                <div className="historic week">
                    <h3>Historique hebdomadaire</h3>
                    <ul className="collection">
                        { this.state.historicWeek !== null && this.state.historicWeek.map((user_view, index) => {
                                return <UserView user={user_view} redirect={() => {this.props.history.push("/profiles/" + user_view.login)}}  key={index}/>
                            })}
                    </ul>
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

export default connect(mapStateToProps)(Historic);
