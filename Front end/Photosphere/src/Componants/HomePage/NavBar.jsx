import React, { useContext } from 'react'
import './NavBar.css'
import { auth } from '../../Store/AuthRedux'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { HomeContext } from '../../Contexts/HomeContext'

function NavBar() {
    const { createpost, setCreatePost } = useContext(HomeContext)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    return (
        <div className='container left-side-nav'>
            <div className=''>
                <h4 className='logo-text p-2 pt-4'>PHOTOSPHERE</h4>
            </div>
            <div className='pt-4'>
                <div className='py-2'
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                        window.location.reload()
                        navigate('/')
                    }}
                >
                    <i className="bi bi-house-door-fill nav-icon mx-2"></i>
                    <span className='h5 ps-2'>Home</span>
                </div>
                <div className='py-2'>
                    <i className="bi bi-search  nav-icon mx-2"></i>
                    <span className='h5 ps-2'>Search</span>
                </div>
                <div className='py-2'>
                    <i className="bi bi-compass-fill nav-icon mx-2"></i>
                    <span className='h5 ps-2'>Explore</span>
                </div>
                <div className='py-2' style={{ cursor: 'pointer' }} onClick={() => navigate('/chat')}>
                    <i className="bi bi-chat-quote-fill nav-icon mx-2"></i>
                    <span className='h5 ps-2'>Messages</span>
                </div>
                <div className='py-2' style={{ cursor: 'pointer' }} onClick={() => setCreatePost(!createpost)}>
                    <i className="bi bi-plus-circle-fill nav-icon mx-2 "></i>
                    <span className='h5 ps-2'>Create</span>
                </div>
                <div className='py-2'>
                    <i className="bi bi-bell-fill nav-icon mx-2"></i>
                    <span className='h5 ps-2'>Notification</span>
                </div>
                <div className='py-2' style={{ cursor: 'pointer' }} onClick={() => navigate('/profile')}>
                    <i className="bi bi-person-circle nav-icon mx-2"></i>
                    <span className='h5 ps-2'>Profile</span>
                </div>

            </div>
            <div>
                <button className='btn btn-danger btn-sm'
                    onClick={() => dispatch(auth.logout())}
                >Logout</button>
            </div>
        </div>
    )
}

export default NavBar