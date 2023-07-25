import React, { useEffect } from 'react'
import './Box.css'
import { useSelector } from 'react-redux';

function Box({ message, currentChat }) {
    const profile = useSelector(state => state.profile)
    const mediaurl = useSelector(state => state.mediaurl)

    return (
        <div className='p-2'>
            {profile.id !== message.sender ?
                <div className="row justify-content-center align-items-center g-2">
                    <div className="col d-flex justify-content-start p-2">
                        <div className=' chat-img-div'>
                            <img className='chat-img' src={mediaurl + currentChat.profile_img} alt="" />
                        </div>
                        <p className='border border-black rounded px-2 d-flex justify-content-center align-items-center'>{message.text}</p>
                    </div>
                    <div className="col"></div>
                </div>
                :
                <div className="row justify-content-center align-items-center g-2">
                    <div className="col"></div>
                    <div className="col d-flex justify-content-end p-2">
                        <p className='border border-black rounded px-2 d-flex justify-content-center align-items-center'>{message.text}</p>
                        <div className=' chat-img-div'>
                            <img className='chat-img' src={mediaurl + profile.profile_img} alt="" />
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Box