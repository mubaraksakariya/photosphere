import React, { useEffect, useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../Store/AuthRedux'

function AdminNavTop() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isAdmin = useSelector((state) => state.isAdmin)
    useLayoutEffect(() => {
        if (!isAdmin) navigate('/admin/login')
    }, [isAdmin])
    return (
        <div className='d-flex justify-content-end mb-2'>
            <div className='pe-3'>
                <i className="bi bi-bell">Notification</i>
            </div>
            <div className='pe-3'>
                <i className="bi bi-envelope">Messages</i>
            </div>
            <div>
                <button type="button" className="btn btn-sm btn-danger" data-bs-toggle="button" aria-pressed="false"
                    onClick={() => dispatch(auth.logout())}
                >logout</button>
            </div>

        </div>
    )
}

export default AdminNavTop