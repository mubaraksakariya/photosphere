import React, { useContext, useEffect, useState } from 'react'
import './UserProfile.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import OtherProfileDetails from '../../Componants/OtherProfile/OtherProfileDetails'
import OtherProfilePosts from '../../Componants/OtherProfile/OtherProfilePosts'
import AxiosContext from '../../Contexts/AxioContext'

function UserProfile() {
    const location = useLocation()
    const isUser = useSelector(state => state.isUser)
    const navigate = useNavigate()
    const [user, setUser] = useState()
    const axiosInstance = useContext(AxiosContext)
    const profile = useSelector(state => state.profile)
    useEffect(() => {
        let current_user = null
        if (location.state) {
            localStorage.setItem('current_user', location.state.user)
            current_user = location.state.user
        }
        else {
            current_user = localStorage.getItem('current_user')
        }
        current_user && axiosInstance.get('getuser', { params: { user: current_user } }).then(response => {
            if (response.data.result) {
                let newuser = response.data.user
                setUser(newuser)
            }
        })
    }, [location.state])

    useEffect(() => {
        if (!isUser) navigate('/login')
        console.log(profile.id);
        profile && user && (profile.id == user.id) && navigate('/profile/')
        localStorage.setItem('current_path', location.pathname)
    }, [isUser, profile, user])

    return (
        <div className="container-fluid">
            <div className="row justify-content-center align-items-center g-2">
                <div className="col-md"></div>
                <div className="col-md-9">
                    <div className=''>
                        <OtherProfileDetails user={user} />
                    </div>
                    <div className='p-2'>
                        <OtherProfilePosts user={user} />
                    </div>
                </div>
                <div className="col-md"></div>
            </div>
        </div>
    )
}

export default UserProfile