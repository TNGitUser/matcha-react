import React, { Component } from 'react'
import ProfilePeek from './ProfilePeek'

export class ProfileList extends Component {
    render() {
        return (
            <div className="container">
                <div className="row profile-row s8 m8">
                    <ProfilePeek />
                    <ProfilePeek />
                    <ProfilePeek />
                    <ProfilePeek />
                </div>
                <div className="row profile-row s8 m8">
                    <ProfilePeek />
                    <ProfilePeek />
                    <ProfilePeek />
                    <ProfilePeek />
                </div>
            </div>
        )
    }
}

export default ProfileList