import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import './Home.css'
import NavBar from '../../Componants/HomePage/NavBar'
import Posts from '../../Componants/Post/Posts'
import RightNav from '../../Componants/HomePage/RightNav'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import CreatePost from '../../Componants/Post/CreatePost'
import StoyNav from '../../Componants/HomePage/StoyNav'
import Stories from '../../Componants/Story/Stories'
import CreateStory from '../../Componants/Story/CreateStory'
import { HomeContext } from '../../Contexts/HomeContext';
import PostView from '../../Componants/Post/PostView'
import Notifications from '../../Componants/HomePage/Notifications'

function Home() {
    const isUser = useSelector(state => state.isUser)
    const navigate = useNavigate()
    const location = useLocation()

    const {
        createpost,
        storyview,
        isStory,
        isPostview,
        isNotification
    } = useContext(HomeContext);

    useEffect(() => {
        if (!isUser) navigate('/login')
        else localStorage.setItem('current_path', location.pathname)
    }, [isUser])

    useEffect(() => {
        if (storyview.story || isStory || createpost || isPostview.post || isNotification) {
            document.body.style.overflow = 'hidden'; // Disable scrolling
        } else {
            document.body.style.overflow = ''; // Enable scrolling
        }
    }, [storyview, isStory, createpost, isPostview, isNotification]);
    return (
        <>
            {
                isPostview.post &&
                <div className='overlay'>
                    <PostView />
                </div>
            }
            {
                storyview.story &&
                <div className='overlay'>
                    <Stories />
                </div>
            }
            {
                isStory &&
                <div className='overlay' >
                    <CreateStory />
                </div>
            }
            {
                createpost &&
                <div className='overlay' >
                    <CreatePost />
                </div>
            }
            {
                isNotification &&
                <div className='overlay' >
                    <Notifications />
                </div>
            }
            <div className="row justify-content-center mx-4">
                <div className="col-md-2 navbar-bottom ">
                    <NavBar />
                </div>
                <div className="col-md-7">
                    <StoyNav />
                    <Posts />
                </div>
                <div className="col-md-3 hide-right-nav">
                    <RightNav />
                </div>
            </div>
        </>
    )
}

export default Home