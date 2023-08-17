import React, { createContext, useContext, useEffect, useState } from 'react';
import { WebSocketContext } from './WebSocketContext';

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const socket = useContext(WebSocketContext);
    const [isTyping, setIsTyping] = useState(false);
    const [hasUnreadMessage, setHasUnreadMessage] = useState(false);
    const [newMessage, setNewMessage] = useState([]);

    useEffect(() => {
        if (socket) {
            socket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                setNewMessage(data);
                if (data.text === '_USER_IS_TYPING_') {
                    setIsTyping(true);
                    const typingTimeout = setTimeout(() => {
                        setIsTyping(false);
                    }, 2500);
                }
                if (data.text !== '_USER_IS_TYPING_')
                    setHasUnreadMessage(true);
            };
        }
    }, [socket]);

    const chatContextValues = {
        isTyping,
        hasUnreadMessage,
        newMessage
    };

    return (
        <ChatContext.Provider value={chatContextValues}>
            {children}
        </ChatContext.Provider>
    );
}

export { ChatContext, ChatProvider };
