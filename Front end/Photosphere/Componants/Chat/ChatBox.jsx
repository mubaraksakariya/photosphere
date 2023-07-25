import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import './ChatBox.css'
import ChatUser from './chatUser';
import { useNavigate } from 'react-router-dom';
import { WebSocketContext } from '../../Contexts/WebSocketContext';
import AxiosContext from '../../Contexts/AxioContext';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
import Box from './Box';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'


function ChatBox({ currentChat }) {
    const inputRef = useRef()
    const scrollRef = useRef()
    const navigate = useNavigate()
    const axioinstance = useContext(AxiosContext)
    const [messageHistory, setMessageHistory] = useState([]);
    const [receivedMessage, setReceivedMessage] = useState(null);
    const socket = useContext(WebSocketContext);
    const profile = useSelector(state => state.profile)
    const [isTyping, setIsTyping] = useState(false)

    const handleEmojiSelect = (emoji) => {
        const emojiText = emoji.native;
        inputRef.current.value += emojiText;
    };

    useEffect(() => {
        axioinstance.get('chat/getmessagehistory', { params: { reciever: currentChat.id } }).then(response => {
            if (response.data.result) {
                let usermessage = response.data.messages
                setMessageHistory(old => usermessage)
            }
        })
    }, [currentChat])
    useEffect(() => {
        if (socket) {
            // Set up a listener for incoming messages
            socket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                let sender_id = data.sender
                if (currentChat.id === sender_id) {
                    if (data.text !== '_USER_IS_TYPING_')
                        setReceivedMessage(data);
                    else {
                        setIsTyping(true);
                        // clearTimeout(typingTimeout);
                        typingTimeout = setTimeout(() => {
                            setIsTyping(false);
                        }, 2500);
                    }
                }
            }
        }
    }, [socket])

    useEffect(() => {
        if (receivedMessage) {
            setMessageHistory(old => [...old, receivedMessage]);
        }
    }, [receivedMessage])

    useLayoutEffect(() => {
        if (scrollRef && scrollRef.current) {
            const { scrollHeight, clientHeight } = scrollRef.current;
            scrollRef.current.scrollTop = scrollHeight - clientHeight;
        }
    });

    const manageSend = (e) => {
        e.preventDefault()
        let currentMessage = inputRef.current.value
        inputRef.current.value = ""
        if (socket && currentMessage !== "") {
            const messageObject = {
                text: currentMessage,
                receiver: currentChat.id,
                sender: profile.id
            };
            socket.send(JSON.stringify(messageObject))
            setMessageHistory(old => [...old, messageObject])
        }

    };
    const manageTyping = () => {
        if (socket) {
            const messageObject = {
                text: '_USER_IS_TYPING_',
                receiver: currentChat.id,
                sender: profile.id
            };
            socket.send(JSON.stringify(messageObject))
        }
    }
    const navigateToProfile = (() => navigate('/userprofile/', { state: { user: currentChat.id } }))

    return (
        <div className='chat-box'>
            <div className="chat-box-first" >
                <ChatUser user={currentChat} setCurrentChat={navigateToProfile} isTyping={isTyping} />
            </div>
            <div className="chat-box-second border border-black rounded" ref={scrollRef}>
                {messageHistory.map(message => {
                    return (
                        <Box key={uuidv4()} message={message} currentChat={currentChat} />
                    )
                })}
            </div>
            <div className="chat-box-third ">
                <form class="d-flex pe-2" role="search">
                    <div class="btn-group dropup">
                        <button type="button" class="btn" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                            😀
                        </button>
                        <ul class="dropdown-menu p-0 m-0">
                            <li class="dropdown-item p-0 m-0 ">
                                <Picker data={data} onEmojiSelect={handleEmojiSelect} />
                            </li>
                        </ul>
                    </div>
                    <input class="form-control me-2 w-100" type="text" placeholder="text.." aria-label="chat" ref={inputRef}
                        onChange={manageTyping}
                    />
                    <button class="btn btn-outline-success" type="submit"
                        onClick={manageSend}
                    >send</button>
                </form>
            </div>
        </div>
    )
}


export default ChatBox