import React from 'react'
import './Posts.css'
function Posts() {
    return (
        <div className="conainer-fluid   d-flex flex-column justify-content-center align-items-center ">
            <div className="card post-box">
                <img className="card-img-top" src="https://mdbcdn.b-cdn.net/img/new/avatars/9.webp" alt="Card image cap" />
                <div className="card-body">
                    <div className='d-flex'>
                        <i className="bi bi-heart px-1"></i>
                        <i className="bi bi-chat p-0 px-1"></i>
                        <i className="bi bi-send px-1"></i>
                    </div>
                </div>
                <div className="card-body pt-0">
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
                <div className="card-body py-0">
                    <p>View all comments...</p>
                </div>
                <div className="card-body py-0">
                    <p>Last comment</p>
                </div>
                <div className="card-body py-0">
                    <p>Second Last comment</p>
                </div>

            </div>



            <div className="card post-box">
                <img className="card-img-top" src="https://mdbcdn.b-cdn.net/img/new/avatars/9.webp" alt="Card image cap" />
                <div className="card-body">
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
            </div>
        </div>
    )
}

export default Posts