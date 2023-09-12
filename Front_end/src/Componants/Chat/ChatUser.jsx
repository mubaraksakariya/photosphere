import React, { useContext, useEffect, useState } from 'react'
import './ChatUser.css'
import { useSelector } from 'react-redux'
import BeatLoader from "react-spinners/BeatLoader";
import { ChatContext } from '../../Contexts/ChatContext';

function ChatUser({ user, setCurrentChat, showUnreadNotification }) {
    const mediaurl = useSelector(state => state.mediaurl)
    const [isTyping, setIsTyping] = useState(false)
    const [hasUnreadMessage, setHasUnreadMessage] = useState(false)
    const { newMessage } = useContext(ChatContext);
    useEffect(() => {
        if (newMessage) {
            let sender_id = newMessage.sender
            if (user.id == sender_id && newMessage.text === '_USER_IS_TYPING_') {
                setIsTyping(true);
                const typingTimeout = setTimeout(() => {
                    setIsTyping(false);
                }, 2500);
            }
            if (user.id == sender_id && newMessage.text !== '_USER_IS_TYPING_') {
                setHasUnreadMessage(true)
            }
        }
    }, [newMessage])
    useEffect(() => {
        setHasUnreadMessage(old => false)
        console.log(user);
    }, [user])
    return (

        <div className='p-2 my-1 border border-dark rounded'
            style={{ cursor: 'pointer', maxHeight: '1oo%', display: 'flex', justifyContent: 'space-between' }}
            onClick={() => {
                console.log(user);
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
                    {hasUnreadMessage && showUnreadNotification && <div className="unread-indicator">new</div>}
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: "center" }} className='px-3'>
                {user.is_online && <div className="online-indicator"></div>}
            </div>
        </div>
    )
}

export default ChatUser
