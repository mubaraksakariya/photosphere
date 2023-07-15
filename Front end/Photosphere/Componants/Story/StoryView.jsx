import React, { useContext, useEffect, useState } from 'react'
import './StoryView.css'
import ProgressBar from '../../Componants/Others/ProgressBar'
import { HomeContext } from '../../Contexts/HomeContext'
import AxiosContext from '../../Contexts/AxioContext'
import { useSelector } from 'react-redux'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { v4 as uuidv4 } from 'uuid';

function StoryView() {
    const { storyview, setStoryView, storyUserList, stories } = useContext(HomeContext)
    const axiosInstance = useContext(AxiosContext)
    const [userStories, setUserStories] = useState([])
    const [storyOwner, setStoryOwner] = useState([])
    const baseUrl = useSelector(state => state.mediaurl)
    const [bar, setBar] = useState(0)
    useEffect(() => {
        axiosInstance.get('story/getstories', { params: { user_id: storyUserList[storyview.index] } }).then(response => {
            if (response.data.result) {
                let stories = response.data.stories
                setUserStories(old => stories)

            }
        })
        axiosInstance.get('getuser', { params: { user: storyUserList[storyview.index] } }).then(response => {
            if (response.data.result) {
                let owner = response.data.user
                setStoryOwner(owner)
            }
        })
        const updatedStories = [...stories];
        updatedStories[0].is_viewed = true;
        setUserStories(updatedStories)
    }, [])

    const manageChange = (index, item) => {
        const updatedStories = [...stories];
        updatedStories[index].is_viewed = true;
        setUserStories(updatedStories)
        if (index == userStories.length - 1) {
            let storyIds = userStories.map(story => story.id)
            axiosInstance.get('story/setsoryviewed', { params: { stories: JSON.stringify(storyIds) } }).then(response => {
                if (response.data.result) {

                }
            })
            let newIndex = storyview.index + 1
            setStoryView(false)
        }
        setBar(index)
    }
    return (
        <div className=''>
            <div className='story-top-bar'>
                <div style={{ cursor: 'pointer' }}>
                    <img src={baseUrl + storyOwner.profile_img} alt="" className='img-thumpnail rounded-circle m-2 ms-0'
                        style={{ width: '2.5vw' }}
                    />
                    <span className='text-white'>{storyOwner.username}</span>
                </div>
                <div className='row m-0 p-0'>
                    {
                        userStories && userStories.map((story, index) => {
                            const current = index === bar ? 'active' : '';
                            return (
                                <div className='col rounded bg-secondary px-0 mx-1' key={uuidv4()} >
                                    <div className={current}
                                        style={{ minHeight: '6px', backgroundColor: 'silver' }}
                                    ></div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className='my-2' >
                <Carousel
                    showArrows={true}
                    centerMode={true}
                    centerSlidePercentage={100}
                    autoPlay={true}
                    interval={2000}
                    onChange={manageChange}
                    showStatus={false}
                    showThumbs={false}
                    infiniteLoop={true}
                    autoFocus={true}
                >
                    {
                        userStories && userStories.map((story, index) => {
                            return (
                                <div key={uuidv4()}>
                                    <img src={baseUrl + story.file} />
                                </div>
                            );

                        })
                    }< img src="" alt="" />
                </Carousel>
            </div>
        </div >

    )
}

export default StoryView