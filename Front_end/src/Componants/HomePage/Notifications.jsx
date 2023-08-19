import React, { useContext, useEffect } from 'react'
import './Notifications.css'
import { axiosInstance } from '../../Contexts/AxioContext'
import { HomeContext } from '../../Contexts/HomeContext'

function Notifications() {
    const { isNotification, setIsNotification } = useContext(HomeContext)
    useEffect(() => {
        axiosInstance.get('notification/getnotifications').then((response) => {
            console.log(response.data);
        })
    }, [])
    return (
        <div className="row justify-content-center align-items-center g-2">
            <div className="col-md"></div>
            <div className="col-md notification-main-div">
                <div className='header'>
                    <img src="./just logo.png" alt="" className='heading-logo' />
                    <h5 className='h5 pt-2'>Notifications</h5>
                    <i class="bi bi-x-square-fill notification-close-button"
                        onClick={() => setIsNotification(false)}
                    ></i>
                </div>
            </div>
            <div className="col-md"></div>
        </div>
    )
}

export default Notifications