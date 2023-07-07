import React, { useEffect, useLayoutEffect } from 'react'
import { useSelector } from 'react-redux'
import AdminNav from '../../Componants/Admin/AdminNav';
import AdminNavTop from '../../Componants/Admin/AdminNavTop';
import PostCounts from '../../Componants/Admin/PostCounts';
import LatestPosts from '../../Componants/Admin/LatestPosts';
import TopUsers from '../../Componants/Admin/TopUsers';
import { useLocation, useNavigate } from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate()
    const location = useLocation()
    const isAdmin = useSelector(state => state.isAdmin)
    useLayoutEffect(() => {
        console.log(isAdmin);
        if (!isAdmin) navigate('/admin/login')
        else localStorage.setItem('current_path', location.pathname)
    }, [])
    return (
        <div className="row justify-content-center g-2 p-3">
            <div className="col-2">
                <AdminNav />
            </div>
            <div className="col-10">
                <div>
                    <AdminNavTop />
                </div>
                <div>
                    <PostCounts />
                </div>
                <div className="row justify-content-center align-items-center g-2">
                    <div className="col">
                        <LatestPosts />
                    </div>
                    <div className="col">
                        <TopUsers />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard