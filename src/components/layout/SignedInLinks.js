import React from 'react';
import { NavLink } from 'react-router-dom';

const SignedInLinks = ({onLogout}) => {
    return (
        <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><NavLink to='/profiles-list' className="black-text">Profiles</NavLink></li>
            <li><NavLink to='/lucky' className="pink-text">Lucky</NavLink></li>
            <li><NavLink to='/profile-admirer' className="black-text">Historique</NavLink></li>
            <li><NavLink to='/' className="red-text" onClick={onLogout}>Log Out</NavLink></li>
            <li><NavLink to='/profile-edit' className="btn btn-floating pink lighten-1">LM</NavLink></li>
        </ul>
    )
}

export const SignedInLinksSidebar = ({onClickLink, onLogout}) => {
    return (
        <div>
            <li><NavLink to='/profiles-list' className="black-text" onClick={onClickLink}>Profiles</NavLink></li>
            <li><NavLink to='/match' className="pink-text" onClick={onClickLink}>Match</NavLink></li>
            <li><NavLink to='/profile-admirer' className="black-text">Historique</NavLink></li>
            <li><NavLink to='/lucky' className="pink-text" onClick={onClickLink}>Lucky</NavLink></li>
            <li><NavLink to='/' className="red-text" onClick={onLogout}>Log Out</NavLink></li>
        </div>
    )
}

export default SignedInLinks;