import React from 'react';
import { NavLink } from 'react-router-dom';

const SignedOutLinks = () => {
    return (
        <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><NavLink to='/signin' className="black-text">Sign In</NavLink></li>
            <li><NavLink to='/signup' className="black-text">Sign Up</NavLink></li>
        </ul>
    )
}

export const SignedOutLinksSidebar = () => {
    return (
        <div>
            <li><NavLink to='/signin' className="black-text">Sign In</NavLink></li>
            <li><NavLink to='/signup' className="black-text">Sign Up</NavLink></li>
        </div>
    )
}

export default SignedOutLinks;