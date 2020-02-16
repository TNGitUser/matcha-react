import React from 'react';
import { NavLink } from 'react-router-dom';

const SignedInLinks = ({onLogout, state}) => {
    const initial = state ? state.firstname.charAt(0) + state.lastname.charAt(0) : "XX";
    return (
        <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><NavLink to='/profiles-list' className="black-text">Profiles</NavLink></li>
            <li><NavLink to='/lucky' className="pink-text">Lucky</NavLink></li>
            <li><NavLink to='/profile-admirer' className="black-text">Historique</NavLink></li>
            <li><NavLink to='/' className="red-text" onClick={onLogout}>Log Out</NavLink></li>
            <li><NavLink to='/profile-edit' className="btn btn-floating pink lighten-1">{initial}</NavLink></li>
        </ul>
    )
}

export const SignedInLinksSidebar = ({onClickLink, onLogout, state}) => {
    const name = state ? state.firstname + " " + state.lastname : "Casper";
    return (
        <div>
            <li>
                <div className="user-view">
                    <NavLink to="/profile-edit">
                        <div className="background red"></div>
                        <span className="white-text name circle">{name}</span>
                    </NavLink>
                </div>
            </li>
            <li><NavLink to='/profiles-list' className="black-text" onClick={onClickLink}>Profiles</NavLink></li>
            <li><NavLink to='/match' className="pink-text" onClick={onClickLink}>Match</NavLink></li>
            <li><NavLink to='/profile-admirer' className="black-text">Historique</NavLink></li>
            <li><NavLink to='/lucky' className="pink-text" onClick={onClickLink}>Lucky</NavLink></li>
            <li><NavLink to='/' className="red-text" onClick={onLogout}>Log Out</NavLink></li>
        </div>
    )
}

export default SignedInLinks;