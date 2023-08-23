import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import './StoryTHumbnail.css'
import AxiosContext from '../../Contexts/AxioContext'
import { useSelector } from 'react-redux'
import { HomeContext } from '../../Contexts/HomeContext'

function StoryTHumbnail({ index, user }) {
    const signalRef = useRef()
    const { setStoryView, storyview } = useContext(HomeContext)
    const axiosInstance = useContext(AxiosContext)
    const [storyOwner, setStoryOwner] = useState(null)
    const [stories, setStories] = useState([])
    const mediaurl = useSelector(state => state.mediaurl)

    useEffect(() => {
        axiosInstance.get('getuser', { params: { user: user } }).then(response => {
            if (response.data.result) {
                let user = response.data.user
                setStoryOwner(user)
            }
        })

    }, [])

    useMemo(() => {
        axiosInstance.get('story/getstories', { params: { user_id: user } }).then(response => {
            if (response.data.result) {
                setStories(response.data.stories)
            }
        })
        if (storyOwner && stories) {
            let currentUserStories = stories.filter((story) => !story.is_viewed)
            if (currentUserStories.length == 0) {
                signalRef.current.style.backgroundColor = 'white'
            }
            else {
                signalRef.current.style.backgroundColor = 'turquoise'
            }
        }
    }, [storyview, storyOwner])

    const manageStoryClick = () => {
        setStoryView({ story: true, index: index, stories: stories, setStories: setStories, storyOwner })
    }
    return (
        <div className='px-2'>
            <div
                style={{ cursor: 'pointer' }}
                onClick={manageStoryClick}
                className='d-flex justify-content-center rounded-circle signaldiv p-0 m-0'
                ref={signalRef}
            >
                {storyOwner && <img className="rounded-circle img-thumbnail story-image" alt="avatar1" src={mediaurl + storyOwner.profile_img} />}
            </div>
            {storyOwner && <p>{storyOwner.username}</p>}
        </div>
    )
}

export default StoryTHumbnail