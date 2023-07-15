import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import './StoryTHumbnail.css'
import AxiosContext from '../../Contexts/AxioContext'
import { useSelector } from 'react-redux'
import { HomeContext } from '../../Contexts/HomeContext'

function StoryTHumbnail({ index }) {
    const signalRef = useRef()
    const { setStoryView, storyview, storyUserList, stories } = useContext(HomeContext)
    const axiosInstance = useContext(AxiosContext)
    const [storyOwner, setStoryOwner] = useState(null)
    const mediaurl = useSelector(state => state.mediaurl)

    useEffect(() => {
        axiosInstance.get('getuser', { params: { user: storyUserList[index] } }).then(response => {
            if (response.data.result) {
                let user = response.data.user
                setStoryOwner(user)
            }
        })
    }, [])

    useLayoutEffect(() => {
        if (storyOwner) {
            let currentUserStories = stories.filter((story) => !story.is_viewed && story.user_id == storyOwner.id)
            if (currentUserStories.length == 0) {
                signalRef.current.style.backgroundColor = 'white'
            }
            else {
                signalRef.current.style.backgroundColor = 'turquoise'
            }
        }


    }, [storyview, storyOwner])

    const manageStoryClick = () => {
        setStoryView({ story: true, index: index })
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