import React, { useContext, useEffect, useState } from 'react'
import './Notifications.css'
import { axiosInstance } from '../../Contexts/AxioContext'
import { HomeContext } from '../../Contexts/HomeContext'
import NotificationComponant from './NotificationComponant'

function Notifications() {
    const { setIsNotification } = useContext(HomeContext)
    const [notifications, setNotifications] = useState([]);
    useEffect(() => {
        axiosInstance.get('notification/getnotifications').then((response) => {
            let notifications = response.data.notifications
            setNotifications(notifications)
        })
    }, [])
    return (
        <div className="row justify-content-center align-items-center g-2">
            <div className="col-md"></div>
            <div className="col-md notification-main-div">
                <div className='header'>
                    <img src="./just logo.png" alt="" className='heading-logo' />
                    <h5 className='h5 pt-2'>Notifications</h5>
                    <i className="bi bi-x-square-fill notification-close-button"
                        onClick={() => setIsNotification(false)}
                    ></i>
                </div>
                <div className="notifiaction-body">
                    {
                        notifications && notifications.map((notification) => {
                            return (
                                <NotificationComponant notification={notification} key={notification.id} />
                            )
                        })
                    }
                </div>
            </div>
            <div className="col-md"></div>
        </div>
    )
}

export default Notifications