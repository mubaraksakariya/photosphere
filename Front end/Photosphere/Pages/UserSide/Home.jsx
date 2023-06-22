import React, { useEffect, useLayoutEffect } from 'react'
import './Home.css'
import NavBar from '../../Componants/NavBar'
import Stories from '../../Componants/Stories'
import Posts from '../../Componants/Posts'
import RightNav from '../../Componants/RightNav'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Home() {
    const isUser = useSelector(state => state.isUser)
    const navigate = useNavigate()
    useEffect(() => {
        if (!isUser) navigate('/login')
    }, [])
    return (
        <div className="row justify-content-center mx-4">
            <div className="col-md-2 ">
                <NavBar />
            </div>
            <div className="col-md-7  ">
                <Stories />
                <Posts />
            </div>
            <div className="col-md-3  ">
                <RightNav />
            </div>
        </div>
    )
}

export default Home