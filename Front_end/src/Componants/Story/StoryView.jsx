import React, { useContext, useEffect, useState } from 'react'
import './StoryView.css'
import ProgressBar from '../../Componants/Others/ProgressBar'
import { HomeContext } from '../../Contexts/HomeContext'
import AxiosContext from '../../Contexts/AxioContext'
import { useSelector } from 'react-redux'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom'

function StoryView() {
    const { storyview, setStoryView, storyUserList } = useContext(HomeContext)
    const axiosInstance = useContext(AxiosContext)
    const userStories = storyview.stories

    const [storyOwner, setStoryOwner] = useState(storyview.storyOwner)
    const baseUrl = useSelector(state => state.mediaurl)
    const [bar, setBar] = useState(0)
    const profile = useSelector(state => state.profile)
    const navigate = useNavigate()
    useEffect(() => {
        storyview.setStories(oldStories => {
            const updatedStories = [...oldStories];
            updatedStories[0].is_viewed = true;
            return updatedStories;
        });
        axiosInstance.get('story/setsoryviewed', { params: { stories: userStories[0].id } })
    }, [])

    const manageChange = (index) => {
        if (userStories[index].is_viewed == false) {
            axiosInstance.get('story/setsoryviewed', { params: { stories: userStories[index].id } }).then(response => {
                if (response.data.result) {
                    storyview.setStories(oldStories => {
                        const updatedStories = [...oldStories];
                        updatedStories[index].is_viewed = true;
                        return updatedStories;
                    });
                }
            })
        }
        if (index >= userStories.length - 1) setStoryView(false)
        setBar(index)
    }
    const redirectToProfile = () => {
        if (profile.id == storyOwner.id) navigate('profile')
        else navigate('userprofile', { state: { user: storyOwner.id } })
    }
    return (
        <div className=''>
            <div className='story-top-bar'>
                <div style={{ cursor: 'pointer' }}
                    onClick={redirectToProfile}
                >
                    <img src={baseUrl + storyOwner.profile_img} alt="" className='img-thumpnail rounded-circle m-2 ms-0'
                        style={{ width: '2rem', height: '2rem' }}
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