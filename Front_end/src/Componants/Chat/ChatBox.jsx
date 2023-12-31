import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import './ChatBox.css'
import ChatUser from './ChatUser';
import { useNavigate } from 'react-router-dom';
import { WebSocketContext } from '../../Contexts/WebSocketContext';
import AxiosContext from '../../Contexts/AxioContext';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
import Box from './Box';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { ChatContext } from '../../Contexts/ChatContext';


function ChatBox({ currentChat }) {
    const inputRef = useRef()
    const scrollRef = useRef()
    const navigate = useNavigate()
    const axioinstance = useContext(AxiosContext)
    const [messageHistory, setMessageHistory] = useState([]);
    const socket = useContext(WebSocketContext);
    const profile = useSelector(state => state.profile)
    const { newMessage, setNewMessage } = useContext(ChatContext);
    const handleEmojiSelect = (emoji) => {
        const emojiText = emoji.native;
        inputRef.current.value += emojiText;
    };

    useEffect(() => {
        if (currentChat.id) {
            axioinstance.get('chat/getmessagehistory', { params: { reciever: currentChat.id } }).then(response => {
                if (response.data.result) {
                    let usermessage = response.data.messages
                    setMessageHistory(usermessage)
                } else {
                    console.log(response.data.error);
                }
            })
        }

    }, [currentChat])

    useEffect(() => {
        if (newMessage) {
            let sender_id = newMessage.sender
            if (currentChat.id == sender_id && newMessage.text !== '_USER_IS_TYPING_') {
                setMessageHistory(old => [...old, newMessage]);
                setNewMessage("_USER_IS_TYPING_")
            }
        }
    }, [newMessage])

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
                <ChatUser user={currentChat} setCurrentChat={navigateToProfile} showUnreadNotification={false} />
            </div>
            <div className="chat-box-second border border-black rounded" ref={scrollRef}>
                {
                    messageHistory && messageHistory.length <= 0 ?
                        <div className='p-5'>
                            <div className="row justify-content-center align-items-center g-2 p-5">
                                <div className="col-12 d-flex justify-content-center p-2 p-5">
                                    <p className='p-5'>No chat yet</p>
                                </div>
                            </div>
                        </div>
                        :
                        messageHistory.map(message => {
                            return (
                                <Box key={uuidv4()} message={message} currentChat={currentChat} />
                            )
                        })
                }
            </div>
            <div className="chat-box-third ">
                <form className="d-flex pe-2" role="search">
                    <div className="btn-group dropup">
                        <button type="button" className="btn" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                            😀
                        </button>
                        <ul className="dropdown-menu p-0 m-0">
                            <li className="dropdown-item p-0 m-0 ">
                                <Picker data={data} onEmojiSelect={handleEmojiSelect} />
                            </li>
                        </ul>
                    </div>
                    <input className="form-control me-2 w-100" type="text" placeholder="text.." aria-label="chat" ref={inputRef}
                        onChange={manageTyping}
                    />
                    <button className="btn btn-outline-success" type="submit"
                        onClick={manageSend}
                    >send</button>
                </form>
            </div>
        </div>
    )
}


export default ChatBox