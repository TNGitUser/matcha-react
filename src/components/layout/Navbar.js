import React from 'react';
import { Link } from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';

const Navbar = () => {
    const links = <SignedInLinks />;
    return (
        <nav className="nav-wrapper white">
            <Link to='/' className="brand-logo black-text logo">Matcha'Soul</Link>
            { links }
            <SignedOutLinks />
        </nav>
    )
}

export default Navbar;