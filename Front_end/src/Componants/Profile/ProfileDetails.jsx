import React, { } from 'react'
import './ProfileDetails.css'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function ProfileDetails() {

    const navigate = useNavigate()
    const profile = useSelector(state => state.profile)
    const mediaurl = useSelector((state) => state.mediaurl)

    return (
        <div className="d-flex justify-content-around pt-3 pb-3">
            <div className='me-5 profile-img-div'
                onClick={() => navigate('/')}
                style={{ cursor: 'pointer' }}
            >
                {profile.profile_img ?
                    <img src={mediaurl + profile.profile_img} alt="Profile image" className='profile-img' /> :
                    <img src='/no-profile-picture' alt="Profile image" className='profile-img' />
                }
            </div>
            <div className='ms-5'>
                <div className='d-flex pt-3 '>
                    <div >
                        <span className='h3'>{profile.username}</span>
                    </div>
                    <div className='d-flex flex-column justify-content-center mx-3'>
                        <button className='btn btn-sm btn-secondary'
                            onClick={() => navigate('/editprofile')}
                        >Edit Profile</button>
                    </div>
                    <div className='d-flex flex-column justify-content-center' >
                        <i className="bi bi-gear" style={{ cursor: 'pointer' }}
                            onClick={() => { navigate('/profilesettings', { state: { profile: profile } }) }}
                        ></i>
                    </div>
                </div>
                <div className='pt-3'>
                    <ul className="d-flex p-0 m-0">
                        <li className="list-group-item pe-4">Posts {profile.number_of_posts}</li>
                        <li className="list-group-item pe-4">Followers {profile.followersCount}</li>
                        <li className="list-group-item">Following {profile.followiigCount}</li>

                    </ul>
                </div>
                <div className='pt-3'>
                    <span>{profile.bio}</span>
                </div>
            </div>
        </div>
    )
}

export default ProfileDetails