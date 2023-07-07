import React from 'react'
import './ProfilePosts.css'


function ProfilePost() {
    return (
        <div className="card" style={{ maxWidth: '500px', maxHeight: '300px', overflow: 'hidden' }}>
            <img className="card-img-top" src='public/PostDemo.jpg' alt="Card image" />
            <div className="card-img-overlay d-flex flex-column justify-content-center align-items-center "
                style={{ opacity: 0 }}
                onMouseEnter={(event) => {
                    event.target.style.backgroundColor = 'rgba(0, 0, 0, 0.2)'
                    event.target.style.opacity = 0.7
                    event.target.style.color = 'white'
                }}
                onMouseLeave={(event) => {
                    event.target.style.backgroundColor = 'transparent'
                    event.target.style.opacity = 0
                }}
            >
                <i className="bi bi-heart px-2">5</i>
                <i className="bi bi-chat px-2">15</i>
            </div>
        </div >
    )
}

export default ProfilePost