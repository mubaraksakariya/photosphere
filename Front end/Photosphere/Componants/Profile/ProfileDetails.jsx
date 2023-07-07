import React, { useEffect, useLayoutEffect, useState } from 'react'
import './ProfileDetails.css'
import { axiosInstance } from '../../Contexts/AxioContext'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function ProfileDetails() {
    const [userName, setUsername] = useState('No user')
    const [postCount, serPostCount] = useState(0)
    const [followersCount, setFollowersCount] = useState(0)
    const [followiigCount, setFollowingCount] = useState(0)
    const [bio, setBio] = useState('No bio')
    const navigate = useNavigate()
    const profile = useSelector(state => state.profile)
    const [profilepic, setProfilePic] = useState(null)
    const mediaurl = useSelector((state) => state.mediaurl)

    useEffect(() => {
        setUsername(profile.username)
        setBio(profile.bio)
        setProfilePic(mediaurl + profile?.profile_img)
        setBio(profile.bio)
    }, [profile])
    return (
        <div className="d-flex justify-content-around pt-3 pb-3">
            <div className='me-5'
                style={{ maxWidth: '12vw', cursor: 'pointer' }}
                onClick={() => navigate('/')}
            >
                <img src={profilepic} alt="Profile image" className='rounded-circle img-thumbnail' />
            </div>
            <div className='ms-5'>
                <div className='d-flex pt-3 '>
                    <div >
                        <span className='h3'>{userName}</span>
                    </div>
                    <div className='d-flex flex-column justify-content-center mx-3'>
                        <button className=''
                            onClick={() => navigate('/editprofile')}
                        >Edit Profile</button>
                    </div>
                    <div className='d-flex flex-column justify-content-center'>
                        <i className="bi bi-gear"></i>
                    </div>
                </div>
                <div className='pt-3'>
                    <ul className="d-flex p-0 m-0">
                        <li className="list-group-item pe-4">Posts {postCount}</li>
                        <li className="list-group-item pe-4">Followers {followersCount}</li>
                        <li className="list-group-item">Following {followiigCount}</li>

                    </ul>
                </div>
                <div className='pt-3'>
                    <span>{bio}</span>
                </div>
            </div>
        </div>
    )
}

export default ProfileDetails