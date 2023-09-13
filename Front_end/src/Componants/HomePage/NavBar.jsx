import React, { useContext, useEffect, useRef, useState } from 'react'
import './Navbar.css'
import { auth } from '../../Store/AuthRedux'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { HomeContext } from '../../Contexts/HomeContext'
import { axiosInstance } from '../../Contexts/AxioContext'

function NavBar() {
    const { createpost, setCreatePost, setIsNotification } = useContext(HomeContext)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [notifiactionCount, setNotificationCount] = useState()
    const iconRef = useRef()
    useEffect(() => {
        axiosInstance.get('notification/get-unread-notifications').then(response => {
            if (response.data.result) {
                let unreadCount = response.data.count
                setNotificationCount(unreadCount)
            }
        })
    }, [])
    useEffect(() => {
        if (notifiactionCount > 0)
            iconRef.current.style.color = 'red'
        else
            iconRef.current.style.color = 'black'
    }, [notifiactionCount])
    return (
        <div className='container left-side-nav'>
            <div className='logo small-screen-item-hide'>
                <h4 className='logo-text p-2 pt-4'>PHOTOSPHERE</h4>
            </div>
            <div className='navbar-items'>
                <div className='py-2'
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                        window.location.reload()
                        navigate('/')
                    }}
                >
                    <i className="bi bi-house-door-fill nav-icon mx-2"></i>
                    <span className='h5 ps-2 small-screen-item-hide'>Home</span>
                </div>
                <div className='py-2'>
                    <i className="bi bi-search  nav-icon mx-2"></i>
                    <span className='h5 ps-2 small-screen-item-hide'>Search</span>
                </div>
                <div className='py-2'>
                    <i className="bi bi-compass-fill nav-icon mx-2"></i>
                    <span className='h5 ps-2 small-screen-item-hide'>Explore</span>
                </div>
                <div className='py-2' style={{ cursor: 'pointer' }} onClick={() => navigate('/chat')}>
                    <i className="bi bi-chat-quote-fill nav-icon mx-2"></i>
                    <span className='h5 ps-2 small-screen-item-hide'>Messages</span>
                </div>
                <div className='py-2' style={{ cursor: 'pointer' }} onClick={() => setCreatePost(!createpost)}>
                    <i className="bi bi-plus-circle-fill nav-icon mx-2 "></i>
                    <span className='h5 ps-2 small-screen-item-hide'>Create</span>
                </div>
                <div className='py-2' style={{ cursor: 'pointer' }} onClick={() => {
                    setIsNotification(true)
                    iconRef.current.style.color = 'black'
                }}>
                    <i className="bi bi-bell-fill nav-icon mx-2" ref={iconRef}></i>
                    <span className='h5 ps-2 small-screen-item-hide'>Notification</span>
                </div>
                <div className='py-2' style={{ cursor: 'pointer' }} onClick={() => navigate('/profile')}>
                    <i className="bi bi-person-circle nav-icon mx-2"></i>
                    <span className='h5 ps-2 small-screen-item-hide'>Profile</span>
                </div>
                <div className='logout-btn-div'>
                    <button className='btn btn-danger btn-sm small-screen-item-hide'
                        onClick={() => dispatch(auth.logout())}
                    >Logout</button>
                </div>

            </div>

        </div>
    )
}

export default NavBar