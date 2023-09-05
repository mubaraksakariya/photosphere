import React, { useContext, useEffect, useState } from 'react'
import './RightNav.css'
import AxiosContext from '../../Contexts/AxioContext'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid';
import UserThumpnail from '../Profile/UserThumpnail'
import SuggestedUser from './SuggestedUser'

function RightNav() {
    const navigate = useNavigate()
    const [username, setUsername] = useState('username')
    const [first_name, setFirst_name] = useState('first_name')
    const [profilepic, setProfilePic] = useState(null)
    const profile = useSelector(state => state.profile)
    const mediaurl = useSelector((state) => state.mediaurl)
    const [suggestedUsers, setSuggestedUsers] = useState([])
    const axiosInstance = useContext(AxiosContext)
    useEffect(() => {
        setFirst_name(profile.first_name)
        setUsername(profile.username)
        setProfilePic(mediaurl + profile?.profile_img)
    }, [profile])
    useEffect(() => {
        axiosInstance.get('suggestedusers').then(response => {
            if (response.data.result) {
                setSuggestedUsers(response.data.users)
            }
        })
    }, [])

    const manageFollow = (e) => {
        console.log(e.target.id);
        axiosInstance.put('follow', { user: e.target.id }).then(response => {
            console.log(response.data.user);
        })
    }
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
                {
                    suggestedUsers.map(user => {
                        return (
                            <SuggestedUser user={user} key={uuidv4()} />
                        )
                    })
                }

            </div>
        </div>
    )
}

export default RightNav