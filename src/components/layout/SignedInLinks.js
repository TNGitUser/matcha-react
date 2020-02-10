import React from 'react';
import { NavLink } from 'react-router-dom';

const SignedInLinks = () => {
    return (
        <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><NavLink to='/profiles-list' className="black-text">Profiles</NavLink></li>
            <li><NavLink to='/lucky' className="pink-text">Lucky</NavLink></li>
            <li><NavLink to='/' className="black-text">Log Out</NavLink></li>
            <li><NavLink to='/' className="btn btn-floating pink lighten-1">LM</NavLink></li>
        </ul>
    )
}

export const SignedInLinksSidebar = () => {
    return (
        <div>
            <li><NavLink to='/profiles-list' className="black-text">Profiles</NavLink></li>
            <li><NavLink to='/lucky' className="pink-text">Lucky</NavLink></li>
            <li><NavLink to='/' className="black-text">Log Out</NavLink></li>
        </div>
    )
}

export default SignedInLinks;