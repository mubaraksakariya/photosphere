import React, { useContext, useEffect, useState } from 'react'
import './NotificationComponant.css'
import AxiosContext from '../../Contexts/AxioContext'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Spinner from '../Others/Spinner'
import { LineWave } from 'react-loader-spinner'

function NotificationComponant({ notification }) {
    const axiosInstance = useContext(AxiosContext)
    const [user, setUser] = useState([])
    const mediaurl = useSelector(state => state.mediaurl)
    const navigate = useNavigate()


    useEffect(() => {
        axiosInstance.get('getuser', { params: { user: notification.context } }).then(response => {
            let user = response.data.user
            setUser(user)
        })
    }, [notification])

    useEffect(() => {
        axiosInstance.get('notification/notificationviewed', { params: { notification_id: notification.id } })
    }, [notification])

    const manageAccept = () => {
        axiosInstance.post('follow', { user: user.id }).then(response => {
            if (response.data.result) {
                setUser(oldUser => ({
                    ...oldUser,
                    ...response.data.user
                }));
            }
        })
        notification.notification_type = "following"
        console.log(notification);
    }
    return (
        <>

            {user.username && notification && (notification.notification_type === "message") &&
                <div className={`notification ${notification.is_read ? '' : 'shadow'}`}
                    onClick={() => navigate('/chat')}
                >
                    <div className='user-img-div'>
                        <img src={mediaurl + user.profile_img} alt="" className='user-img' />
                    </div>
                    <p>{user.username} have send you a message</p>
                </div>
            }

            {user.username && notification && (notification.notification_type === "following") &&
                <div className={`notification ${notification.is_read ? '' : 'shadow'}`}
                    onClick={() => navigate('userprofile', { state: { user: user.id } })}
                >
                    <div className='user-img-div'>
                        <img src={mediaurl + user.profile_img} alt="" className='user-img' />
                    </div>
                    <p>{user.username} is following you now </p>
                </div>
            }
            {user.username && notification && (notification.notification_type === "follow_request") &&
                <div className={`notification ${notification.is_read ? '' : 'shadow'}`}>
                    <div className='user-img-div'>
                        <img src={mediaurl + user.profile_img} alt="" className='user-img' />
                    </div>
                    <p
                        onClick={() => navigate('userprofile', { state: { user: user.id } })}
                    >{user.username} have requseted to follow you  </p>
                    <button className='btn btn-sm btn-success accept-btn'
                        onClick={manageAccept}
                    >Accept</button>
                </div>
            }
            {user.username && notification && (notification.notification_type === "accepted") &&
                <div className={`notification ${notification.is_read ? '' : 'shadow'}`}
                    onClick={() => navigate('userprofile', { state: { user: user.id } })}
                >
                    <div className='user-img-div'>
                        <img src={mediaurl + user.profile_img} alt="" className='user-img' />
                    </div>
                    <p>{user.username} have Accepted your follow request </p>
                </div>
            }

            {
                !user.username &&
                <div className='d-flex justify-content-center'>
                    {
                        <LineWave height={40} />
                    }
                </div>
            }
        </>
    )
}

export default NotificationComponant