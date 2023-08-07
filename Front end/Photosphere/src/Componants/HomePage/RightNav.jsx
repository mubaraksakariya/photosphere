import React, { useContext, useEffect, useState } from 'react'
import './RightNav.css'
import AxiosContext from '../../Contexts/AxioContext'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function RightNav() {
    const axiosInstance = useContext(AxiosContext)
    const navigate = useNavigate()
    const [username, setUsername] = useState('username')
    const [first_name, setFirst_name] = useState('first_name')
    const [profilepic, setProfilePic] = useState(null)
    const profile = useSelector(state => state.profile)
    const mediaurl = useSelector((state) => state.mediaurl)

    useEffect(() => {
        setFirst_name(profile.first_name)
        setUsername(profile.username)
        setProfilePic(mediaurl + profile?.profile_img)
    })

    return (
        <div className="container-fluid position-fixed right-side-nav">
            <div className="pb-5 pt-3">
                <div className='d-flex'>
                    <div style={{ cursor: 'pointer' }} onClick={() => navigate('/profile')}>
                        <img className="rounded-circle img-thumbnail story-image" alt="avatar1" src={profilepic} />
                    </div>
                    <div className='d-flex flex-column justify-content-center' style={{ cursor: 'pointer' }} onClick={() => navigate('/profile')}>
                        <h6 className='p-0 m-0'>{username}</h6>
                        <h6 className='p-0 m-0'>{first_name}</h6>
                    </div>
                </div>
            </div>
            <div>
                <h6 className='my-2'>Suggested for you</h6>
                <div className='d-flex justify-content-between'>
                    <div className="d-flex pe-5">
                        <div>
                            <img className="rounded-circle img-thumbnail suggested-profile-image" alt="avatar1" src="https://mdbcdn.b-cdn.net/img/new/avatars/9.webp" />
                        </div>
                        <div className='d-flex flex-column justify-content-center'>
                            <h6 className='p-0 m-0'>Username</h6>
                            {/* <h6 className='p-0 m-0'>Firsr Name</h6> */}
                        </div>
                    </div>
                    <div className='ps-5 pt-2'>
                        <span>follow</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RightNav