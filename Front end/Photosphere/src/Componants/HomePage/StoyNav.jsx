import React, { useContext, useEffect, useState } from 'react'
import './StoyNav.css'
import AxiosContext from '../../Contexts/AxioContext'
import StoryTHumbnail from '../Story/StoryTHumbnail'
import { HomeContext } from '../../Contexts/HomeContext'
import { v4 as uuidv4 } from 'uuid';

function StoyNav() {
    const axiosInstance = useContext(AxiosContext)
    const { isStory, setIsStory, storyUserList, setStoryUerList } = useContext(HomeContext)

    useEffect(() => {
        axiosInstance.get('story/getstories').then(response => {
            if (response.data.result) {
                let userIds = response.data.users;
                // setStories(allStories);
                // let userIds = [...new Set(allStories.map(story => story.user_id))]
                setStoryUerList(userIds)
            }
        })
    }, [isStory])

    return (
        <div className="container-fluid w-100   d-flex p-4">
            <div className='px-2 d-flex flex-column justifu-content-center align-items-center' style={{ cursor: 'pointer' }}
                onClick={() => setIsStory(oldval => !oldval)}
            >
                <div className='circle-icon'>
                    <i className="bi bi-plus-circle plus-icon m-0 p-0"></i>
                </div>
                <span className='p-0 m-0'>Add a story</span>
            </div>
            {
                storyUserList.map((user, index) => {
                    return (
                        <StoryTHumbnail key={uuidv4()} user={user} index={index} />
                    )
                })
            }


        </div>
    )
}

export default StoyNav