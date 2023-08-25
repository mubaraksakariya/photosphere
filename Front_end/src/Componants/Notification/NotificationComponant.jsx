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
    return (
        <>

            {(notification.notification_type === "message") && user.username ?
                <div className={`notification ${notification.is_read ? '' : 'shadow'}`}
                    onClick={() => navigate('/chat')}
                >
                    <div className='user-img-div'>
                        <img src={mediaurl + user.profile_img} alt="" className='user-img' />
                    </div>
                    <p>{user.username} have send you a message</p>
                </div> :
                <div className='d-flex justify-content-center'>
                    {
                        <LineWave height={50} width={150} />
                    }
                </div>
            }

            {(notification.notification_type === "freind-request") &&
                <div className='notification'
                    onClick={() => navigate('/chat')}
                >
                    <p>you have one or more friend request</p>
                </div>
            }
        </>
    )
}

export default NotificationComponant