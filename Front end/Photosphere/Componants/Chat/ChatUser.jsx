import React, { useContext, useEffect, useState } from 'react'
import './ChatUser.css'
import { useSelector } from 'react-redux'
import BeatLoader from "react-spinners/BeatLoader";
import { WebSocketContext } from '../../Contexts/WebSocketContext';

function ChatUser({ user, setCurrentChat }) {
    const mediaurl = useSelector(state => state.mediaurl)
    const socket = useContext(WebSocketContext);
    const [isTyping, setIsTyping] = useState(false)
    const [hasUnreadMessage, setHasUnreadMessage] = useState(false)
    useEffect(() => {
        if (socket) {
            // Set up a listener for incoming messages
            socket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                let sender_id = data.sender
                if (user.id == sender_id && data.text === '_USER_IS_TYPING_') {
                    console.log(data.text);
                    setIsTyping(true);
                    const typingTimeout = setTimeout(() => {
                        setIsTyping(false);
                    }, 2500);
                }
                if (user.id == sender_id && data.text !== '_USER_IS_TYPING_') {
                    setHasUnreadMessage(true)
                }
            }
        }
    }, [socket])
    return (

        <div className='p-2 my-1 border border-dark rounded'
            style={{ cursor: 'pointer', maxHeight: '1oo%', display: 'flex', justifyContent: 'space-between' }}
            onClick={() => {
                setCurrentChat(user)
                setHasUnreadMessage(old => false)
            }}
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
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: "center" }} className='px-3'>
                    {hasUnreadMessage && <div className="unread-indicator">new</div>}
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: "center" }} className='px-3'>
                {user.is_online && <div className="online-indicator"></div>}
            </div>
        </div>
    )
}

export default ChatUser