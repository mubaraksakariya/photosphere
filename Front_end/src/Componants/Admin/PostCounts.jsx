import React from 'react'

function PostCounts() {
    return (
        <div className="row justify-content-center align-items-center g-2 my-2 ">
            <div className="col shadow-lg p-3 mb-5 bg-body rounded m-2">
                <h6>Posts today</h6>
                <span>0000</span>
            </div>
            <div className="col shadow-lg p-3 mb-5 bg-body rounded m-2">
                <h6>Totoal posts</h6>
                <span>0000</span>
            </div>
            <div className="col shadow-lg p-3 mb-5 bg-body rounded m-2">
                <h6>Users today</h6>
                <span>0000</span>
            </div>
            <div className="col shadow-lg p-3 mb-5 bg-body rounded m-2">
                <h6>Total users</h6>
                <span>0000</span>
            </div>
        </div>
    )
}

export default PostCounts