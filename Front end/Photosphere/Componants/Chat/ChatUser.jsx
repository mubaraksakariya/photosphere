import React from 'react'
import './ChatUser.css'
import { useSelector } from 'react-redux'


function ChatUser({ user, setCurrentChat }) {
    const mediaurl = useSelector(state => state.mediaurl)

    return (
        <div className='p-2 my-1 border border-dark rounded'
            style={{ cursor: 'pointer', maxHeight: '1oo%' }}
            onClick={() => setCurrentChat(user)}
        >
            <div className="chat-img-div">
                <img src={mediaurl + user.profile_img} alt="" className='chat-img' />
                <div className='chat-username'>
                    <p>{user.username}</p>
                    <p className='last-seen'>Last seen time</p>
                </div>
            </div>
        </div>
    )
}

export default ChatUser