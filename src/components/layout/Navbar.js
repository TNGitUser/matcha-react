import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SignedInLinks, { SignedInLinksSidebar } from './SignedInLinks';
import SignedOutLinks, { SignedOutLinksSidebar } from './SignedOutLinks';
import M from 'materialize-css';

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

    render() {
        const links = <SignedInLinks />;
        return (
            <nav className="nav-wrapper white">
                <Link to='/' className="brand-logo black-text logo">Matcha'Soul</Link>
                { links }
                <SignedOutLinks />
                <a href="#!" data-target="slide-out" className="sidenav-trigger right"><i className="material-icons">menu</i></a>
                <ul ref={Sidenav => { this.Sidenav = Sidenav; }} id="slide-out" className="sidenav">
                    <SignedInLinksSidebar/>
                    <SignedOutLinksSidebar/>
                </ul>
            </nav>
        )
    }
}

export default Navbar;