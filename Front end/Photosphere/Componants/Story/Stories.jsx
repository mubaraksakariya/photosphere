import React, { useContext } from 'react'
import './Stories.css'
import StoryView from './StoryView'
import { HomeContext } from '../../Contexts/HomeContext'
import { v4 as uuidv4 } from 'uuid';

function Stories() {
    const { setStoryView } = useContext(HomeContext)
    const closeStory = () => setStoryView(false)

    return (
        <div>
            <div className="row justify-content-center align-items-center g-2">
                <div className="col story-main-div" onClick={closeStory}></div>
                <div className="col-6">
                    <StoryView key={uuidv4()} />
                </div>
                <div className="col story-main-div" onClick={closeStory}></div>
            </div>
        </div>
    )
}

export default Stories