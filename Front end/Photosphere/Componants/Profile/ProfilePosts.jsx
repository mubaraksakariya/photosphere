import React from 'react'
import './ProfilePosts.css'
import ProfilePost from './ProfilePost'
function ProfilePosts() {
    return (
        <div className="row justify-content-center align-items-center g-2">
            <div className="col ">
                <ProfilePost />
            </div>
            <div className="col">
                <ProfilePost />
            </div>
            <div className="col">
                <ProfilePost />
            </div>
        </div>
    )
}

export default ProfilePosts