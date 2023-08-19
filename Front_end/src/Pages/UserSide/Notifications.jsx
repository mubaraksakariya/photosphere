import React, { useEffect } from 'react'
import './Notifications.css'
import { axiosInstance } from '../../Contexts/AxioContext'

function Notifications() {
    useEffect(() => {
        axiosInstance.get('notification/getnotifications').then((response) => {
            console.log(response.data);
        })
    }, [])
    return (
        <div className="row justify-content-center align-items-center g-2">
            <div className="col-md-2"></div>
            <div className="col-md notification-main-div">
                <div className='header'>
                    <img src="./just logo.png" alt="" className='heading-logo' />
                    <h5>Notifications</h5>
                </div>
            </div>
            <div className="col-md-2"></div>
        </div>
    )
}

export default Notifications