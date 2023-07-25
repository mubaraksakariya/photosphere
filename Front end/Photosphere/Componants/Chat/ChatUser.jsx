import React, { useEffect } from 'react'
import './ChatUser.css'
import { useSelector } from 'react-redux'
import BeatLoader from "react-spinners/BeatLoader";

function ChatUser({ user, setCurrentChat, isTyping = false }) {
    const mediaurl = useSelector(state => state.mediaurl)
    useEffect(() => {
        console.log(isTyping);
    }, [isTyping])

    return (
        <div className='p-2 my-1 border border-dark rounded'
            style={{ cursor: 'pointer', maxHeight: '1oo%' }}
            onClick={() => setCurrentChat(user)}
        >
            <div className="chat-img-div">
                <img src={mediaurl + user.profile_img} alt="" className='chat-img' />
                <div className='chat-username pe-3'>
                    <p>{user.username}</p>
                    <p className='last-seen'>Last seen time</p>
                </div>
                <BeatLoader
                    color="#36d7b7"
                    size={10}
                    loading={isTyping}
                />
            </div>
        </div>
    )
}

export default ChatUser