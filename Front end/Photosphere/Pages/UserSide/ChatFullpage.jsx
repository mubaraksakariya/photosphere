import React, { useContext, useEffect, useState } from 'react'
import './ChatFullpage.css'
import AxiosContext from '../../Contexts/AxioContext'
import { useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid';
import ChatBox from '../../Componants/Chat/ChatBox';
import ChatUser from '../../Componants/Chat/chatUser';

function ChatFullpage() {
    const [users, setUsers] = useState([])
    const axioinstance = useContext(AxiosContext)
    const mediaurl = useSelector(state => state.mediaurl)
    const [currentChat, setCurrentChat] = useState([])
    useEffect(() => {
        axioinstance.get('chat/getusers').then(response => {
            let allUsers = response.data.users
            console.log(allUsers);
            setUsers(allUsers)
        })
    }, [])
    return (
        <div className="container chat-main-div">
            <div className="row chat-user-side">
                <div className="col-md-3 p-2 m-1 border border-dark rounded">
                    <form className="row g-3">
                        <div className="col-8">
                            <input type="text" className="form-control" id="inputPassword2" placeholder="Search" />
                        </div>
                        <div className="col-4">
                            <button type="submit" className="btn btn-primary mb-3 ">search</button>
                        </div>
                    </form>
                    <div className='chat-user-div'>
                        {
                            users.map((user) => {
                                return (<ChatUser key={uuidv4()} user={user} setCurrentChat={setCurrentChat} />)
                            })
                        }
                    </div>
                </div>
                {/* <div className="col"></div> */}
                <div className="col-md-8 m-1 border border-dark rounded">
                    <ChatBox currentChat={currentChat} />
                </div>
            </div>
        </div >
    )
}

export default ChatFullpage