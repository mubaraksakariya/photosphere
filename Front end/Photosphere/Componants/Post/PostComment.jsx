import React, { useContext, useEffect, useState } from 'react'
import './PostComment.css'
import AxiosContext from '../../Contexts/AxioContext'
import { useSelector } from 'react-redux'
function PostComment({ comment, post, comments, setComments, comment_index }) {
    const [commentUser, setCommentUser] = useState([])
    const axioinstance = useContext(AxiosContext)
    const mediaUrl = useSelector((state) => state.mediaurl)
    const profile = useSelector(state => state.profile)
    useEffect(() => {
        axioinstance.get('getuser', { params: { user: comment.user_id } }).then(response => {
            if (response.data.result) {
                let user = response.data.user
                setCommentUser(user)
            }
        })
    }, [])

    const manageCommentdelete = (e) => {
        e.preventDefault()
        axioinstance.get('post/deletecomment', { params: { comment: comment.id } }).then(response => {
            if (response.data.result) {
                setComments((prevComments) => {
                    let restOfcomments = prevComments.filter((item) => item.id !== comment.id)
                    return restOfcomments
                })
            }
        })
    }

    return (
        <div className="card-body py-0">
            <div style={{ display: 'inline-block', cursor: 'pointer' }}>
                <img src={mediaUrl + commentUser.profile_img} alt=""
                    className='rounded-circle img-thumbnail comment-profile-image'
                />
                <span>{commentUser.username} :</span>
            </div>


            <div className="dropstart float-end">
                <span className="" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false" >
                    <i className="bi bi-three-dots-vertical style={{cursor:'pointer'}}"></i>
                </span>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    {(profile.id == comment.user_id || profile.id == post.user_id) &&
                        <li><a className="dropdown-item" href="#"
                            onClick={manageCommentdelete}
                        >delete</a></li>}
                    <li><a className="dropdown-item" href="#">report</a></li>
                </ul>
            </div>
            <span>{comment.text}</span>

        </div>
    )
}

export default PostComment