import React from 'react'
import './Profile.css'
import ProfileDetails from '../../Componants/Profile/ProfileDetails'
import ProfilePosts from '../../Componants/Profile/ProfilePosts'


function Profile() {
    return (
        <div className="container-fluid">
            <div className="row justify-content-center align-items-center g-2">
                <div className="col"></div>
                <div className="col-md-8">
                    <div className='border border-primary'>
                        <ProfileDetails />
                    </div>
                    <div className='border border-primary'>
                        <ProfilePosts />
                    </div>
                </div>
                <div className="col"></div>
            </div>
        </div>
    )
}

export default Profile