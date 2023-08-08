import React, { useContext, useEffect, useRef, useState } from 'react'
import './ChatFullpage.css'
import AxiosContext from '../../Contexts/AxioContext'
import { v4 as uuidv4 } from 'uuid';
import ChatBox from '../../Componants/Chat/ChatBox';
import { useNavigate } from 'react-router-dom';
import ChatUser from '../../Componants/Chat/ChatUser';
function ChatFullpage() {
    const [users, setUsers] = useState([])
    const inputRef = useRef()
    const navigate = useNavigate()
    const axioinstance = useContext(AxiosContext)
    const [currentChat, setCurrentChat] = useState([])

    useEffect(() => {
        axioinstance.get('chat/getusers').then(response => {
            let allUsers = response.data.users
            setUsers(allUsers)
            setCurrentChat(allUsers[0])
        })
    }, [])

    const manageSearch = (e) => {
        e.preventDefault()
        console.log("search");
        let searchString = inputRef.current.value
        axioinstance.get('chat/getusers', { params: { searchString: searchString } }).then(response => {
            let allUsers = response.data.users
            setUsers(allUsers)
            setCurrentChat(allUsers[0])
        })
    }

    return (
        <div className="container main-div">
            <div className="row chat-side">
                <div className="col-md-3 p-2 m-1 border border-dark rounded chat-user-div">
                    <form className="row g-3 d-flex justify-content-end" onSubmit={manageSearch}>
                        <div className='col-2' style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
                            <img src='./just logo.png' alt="" style={{ maxWidth: '2rem' }} />
                        </div>
                        <div className="col-6">
                            <input type="text" className="form-control" id="inputPassword2" placeholder="Search" ref={inputRef} />
                        </div>
                        <div className="col-4">
                            <button type="submit" className="btn btn-primary mb-3 ">search</button>
                        </div>
                    </form>
                    <div className='users-div'>
                        {
                            users && users.map((user) => {
                                return (<ChatUser key={uuidv4()} user={user} setCurrentChat={setCurrentChat} />)
                            })
                        }
                    </div>
                </div>

                <div className="col-md-8 m-1 border border-dark rounded chat-box-div">
                    {currentChat && <ChatBox key={currentChat} currentChat={currentChat} />}
                </div>
            </div>
        </div >
    )
}

export default ChatFullpage