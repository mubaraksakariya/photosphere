import React, { useEffect, useState } from 'react'
import './ChatBox.css'
import ChatUser from './chatUser';
import { useNavigate } from 'react-router-dom';

function ChatBox({ currentChat }) {
    const navigate = useNavigate()
    useEffect(() => {
        console.log(currentChat);
    })
    const navigateToProfile = (() => navigate('/userprofile/'))
    return (
        <div style={{ height: '100%' }}>
            <div className="small-div" style={{ height: '10%', backgroundColor: '#f0f0f0' }}>
                <ChatUser user={currentChat} setCurrentChat={navigateToProfile} />
            </div>
            <div className="middle-div border border-black rounded mt-3" style={{ height: '74%', backgroundColor: '#d3d3d3' }}>
                Middle Div (80%)
            </div>
            <div className="small-div border border-black rounded mt-2" style={{ height: '10%', backgroundColor: '#f0f0f0' }}>
                Last Div (10%)
            </div>
        </div>
    )
}

export default ChatBox