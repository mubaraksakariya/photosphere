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

function Home() {
    const isUser = useSelector(state => state.isUser)
    const navigate = useNavigate()
    const location = useLocation()

    const {
        createpost,
        storyview,
        isStory,
    } = useContext(HomeContext);

    useEffect(() => {
        if (!isUser) navigate('/login')
        else localStorage.setItem('current_path', location.pathname)
    }, [isUser])

    useEffect(() => {
        if (storyview.story || isStory || createpost) {
            document.body.style.overflow = 'hidden'; // Disable scrolling
        } else {
            document.body.style.overflow = ''; // Enable scrolling
        }
    }, [storyview, isStory, createpost]);
    return (
        <>
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

            <div className="row justify-content-center mx-4">
                <div className="col-md-2 ">
                    <NavBar />
                </div>
                <div className="col-md-7">
                    <StoyNav />
                    <Posts />
                </div>
                <div className="col-md-3 ">
                    <RightNav />
                </div>
            </div>
        </>
    )
}

export default Home