import React from 'react'
import './Stories.css'

function Stories() {
    return (
        <div className="container-fluid w-100   d-flex stories p-4">
            <div className='px-2'>
                <img className="rounded-circle img-thumbnail story-image" alt="avatar1" src="https://mdbcdn.b-cdn.net/img/new/avatars/9.webp" />
                <p>Username</p>
            </div>
            <div className='px-2'>
                <img className="rounded-circle img-thumbnail story-image" alt="avatar1" src="https://mdbcdn.b-cdn.net/img/new/avatars/9.webp" />
                <p>Username</p>
            </div>
            <div className='px-2'>
                <img className="rounded-circle img-thumbnail story-image" alt="avatar1" src="https://mdbcdn.b-cdn.net/img/new/avatars/9.webp" />
                <p>Username</p>
            </div>
        </div>
    )
}

export default Stories