import React, { useLayoutEffect } from 'react'
import './AdminNav.css'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function AdminNav() {
    const profile = useSelector((state) => state.profile)
    const navigate = useNavigate()

    return (
        <div className='border-end  ' style={{ minHeight: '90vh' }}>
            <div className='py-2 '>
                <h3>Photosphere</h3>
            </div>
            <div className='py-2'>
                <img src="../../public/PostDemo.jpg" className='img img-thumbnailt w-25 rounded' alt="../../public/PostDemo.jpg" />
                <span>{profile.email}</span>
            </div>
            <div className='py-2'>
                <div className='py-2'
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate('/admin/')}
                >Dashboard</div>
                <div className='py-2'
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate('/admin/users/')}
                >
                    Users
                </div>
                <div className='py-2'
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate('/admin/postlist/')}
                >
                    Posts
                </div>
            </div>
        </div>
    )
}

export default AdminNav