import React, { useEffect, useLayoutEffect, useState } from 'react'
import './Home.css'
import NavBar from '../../Componants/HomePage/NavBar'
import Stories from '../../Componants/HomePage/Stories'
import Posts from '../../Componants/HomePage/Posts'
import RightNav from '../../Componants/HomePage/RightNav'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import CreatePost from '../../Componants/HomePage/CreatePost'

function Home() {
    const isUser = useSelector(state => state.isUser)
    const navigate = useNavigate()
    const location = useLocation()
    const [createpost, setCreatPost] = useState(false)
    useLayoutEffect(() => {
        if (!isUser) navigate('/login')
        else localStorage.setItem('current_path', location.pathname)
    }, [isUser])
    return (
        <div className="row justify-content-center mx-4">
            <div className="col-md-2 ">
                <NavBar createpost={createpost} setCreatePost={setCreatPost} />
            </div>
            <div className="col-md-7">
                <Stories />
                {createpost && <CreatePost setCreatePost={setCreatPost} />}
                <Posts />
            </div>
            <div className="col-md-3  ">
                <RightNav />
            </div>
        </div>
    )
}

export default Home