import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SignedInLinks, { SignedInLinksSidebar } from './SignedInLinks';
import SignedOutLinks, { SignedOutLinksSidebar } from './SignedOutLinks';
import M from 'materialize-css';
import { connect } from 'react-redux';
import { authOut } from '../../store/actions/authActions';
import Axios from 'axios';

class Navbar extends Component {

    componentDidMount() {
        const options = {
            inDuration: 250,
            outDuration: 200,
            draggable: true,
            edge : "right"
        };
        M.Sidenav.init(this.Sidenav, options);
    }

    handleNav = () => {
        M.Sidenav.getInstance(this.Sidenav).close();
    }

    handleLogout = () => {
        if (!(this.props.auth && this.props.auth.uid && this.props.auth.key)) {
            return ;
        }
        Axios.get("http://localhost:8080/api/logout?id=" + this.props.auth.uid + "&token=" + this.props.auth.key);
        this.props.authLogout();
        M.Sidenav.getInstance(this.Sidenav).close();
    }

    render() {
        const auth = this.props.auth.id !== -1 && this.props.auth.key != null;
        const main_links = auth ? <SignedInLinks onLogout={this.handleLogout} state={this.props.auth}/> : <SignedOutLinks />;
        const side_links = auth ? <SignedInLinksSidebar onClickLink={this.handleNav} onLogout={this.handleLogout} state={this.props.auth}/> : <SignedOutLinksSidebar onClickLink={this.handleNav}/>;
        // const main_links = <div><SignedInLinks onLogout={this.handleLogout}/><SignedOutLinks /></div>;
        // const side_links = <div><SignedInLinksSidebar onClickLink={this.handleNav} onLogout={this.handleLogout}/><SignedOutLinksSidebar onClickLink={this.handleNav}/></div>;
        return (
            <nav className="nav-wrapper white">
                <Link to='/' className="brand-logo black-text logo">Matcha'Soul</Link>
                { main_links }
                <a href="#!" data-target="slide-out" className="sidenav-trigger right"><i className="material-icons">menu</i></a>
                <ul ref={Sidenav => { this.Sidenav = Sidenav; }} id="slide-out" className="sidenav">
                    { side_links }
                </ul>
            </nav>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ...state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        authLogout : () => { dispatch(authOut()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);