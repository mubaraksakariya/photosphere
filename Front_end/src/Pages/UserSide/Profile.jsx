import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import './Profile.css'
import ProfileDetails from '../../Componants/Profile/ProfileDetails'
import ProfilePosts from '../../Componants/Profile/ProfilePosts'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Followers from '../../Componants/Profile/Followers'
import Following from '../../Componants/Profile/Following'


function Profile() {
    const isUser = useSelector(state => state.isUser)
    const navigate = useNavigate()
    const location = useLocation()
    const [overlay, setOverlay] = useState(null)
    useLayoutEffect(() => {
        if (!isUser) navigate('/login')
        else localStorage.setItem('current_path', location.pathname)
    }, [isUser])
    return (
        <div className="container-fluid">
            {
                overlay === 'followers' &&
                <div className='profile-overlay'>
                    <Followers setOverlay={setOverlay} />
                </div>
            }
            {
                overlay === 'following' &&
                <div className='profile-overlay'>
                    <Following setOverlay={setOverlay} />
                </div>
            }
            <div className="row justify-content-center align-items-center g-2">
                <div className="col"></div>
                <div className="col-md-9">
                    <div className=''>
                        <ProfileDetails setOverlay={setOverlay} />
                    </div>
                    <div className=''>
                        <ProfilePosts />
                    </div>
                </div>
                <div className="col"></div>
            </div>
        </div>
    )
}

export default Profile