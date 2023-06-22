import React from 'react'
import './ProfilePosts.css'
import ProfilePost from './ProfilePost'
function ProfilePosts() {
    return (
        <div class="row justify-content-center align-items-center g-2">
            <div class="col ">
                <ProfilePost />
            </div>
            <div class="col">
                <ProfilePost />
            </div>
            <div class="col">
                <ProfilePost />
            </div>
        </div>
    )
}

export default ProfilePosts