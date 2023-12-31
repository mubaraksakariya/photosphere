import React, { useContext, useEffect, useRef, useState } from 'react'
import './Post.css'
import AxiosContext from '../../Contexts/AxioContext'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import PostComment from './PostComment'
import { v4 as uuidv4 } from 'uuid';
import { HomeContext } from '../../Contexts/HomeContext'

function Post({ post_id }) {
    const [post, setPost] = useState([])
    const axioinstance = useContext(AxiosContext)
    const { setIsPostView } = useContext(HomeContext)
    const mediaUrl = useSelector((state) => state.mediaurl)
    const [media, setMedia] = useState([])
    const [postowner, setPostowner] = useState([])
    const navigate = useNavigate()
    const [postLike, setPostLike] = useState(false)
    const [totalLikes, setTotalLiks] = useState(0)
    const commentRef = useRef()
    const commentTextRef = useRef()
    const [comments, setComments] = useState([])
    const profile = useSelector(state => state.profile)
    useEffect(() => {
        post.id && axioinstance.get('post/getmedia', { params: { post_id: post.id } }).then((response) => {
            if (response.data.result) {
                let medaiset = response.data.media
                setMedia(medaiset)
            }
        })
        post.id && axioinstance.get('getuser', { params: { user: post.user } }).then((response) => {
            if (response.data.result) {
                let user = response.data.user
                setPostowner(user)
            }
        })
        if (post.is_liked) setPostLike(true)
        setTotalLiks(post.total_likes)
    }, [post])

    useEffect(() => {
        post.id && axioinstance.get('post/getcomments', { params: { post_id: post.id, count: 2 } }).then((response) => {
            if (response.data.result) {
                let newcomments = response.data.comments
                setComments(newcomments)
            }
        })
    }, [post])

    useEffect(() => {
        axioinstance.get('post/post', { params: { post_id: post_id } }).then(response => {
            setPost(response.data.post)
        })
    }, [])
    const manageLike = () => {
        axioinstance.put('post/likeapost', { post_id: post.id }).then((response) => {
            if (response.data.result) {
                if (postLike) setTotalLiks((like) => like - 1)
                else setTotalLiks((like) => like + 1)
                setPostLike(!postLike)
            }
        })
    }
    const manageNewComment = (e) => {
        e.preventDefault()
        commentRef.current.style.display = 'none'
        let text = commentTextRef.current.value
        const data = {
            comment: text,
            post_id: post.id
        }
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        axioinstance.post('post/commentonpost', data, config).then((response) => {
            if (response.data.result) {
                setComments(oldComments => [...oldComments, ...response.data.comment])
            }
        })
    }
    const redirectToProfile = () => {
        if (profile.id == postowner.id) navigate('profile')
        else navigate('userprofile', { state: { user: postowner.id } })
    }
    const openPost = () => {
        setIsPostView({ post: true, post_item: post, media: media, postowner: postowner })
    }
    return (
        <div className="card post-box" style={{ width: '100%' }}>
            <div className="pt-1 px-3 d-flex border-bottom">
                {postowner &&
                    <div
                        onClick={redirectToProfile}
                        style={{ cursor: 'pointer' }}
                    >
                        <img src={mediaUrl + postowner.profile_img} alt=""
                            className='rounded-circle img-thumbnail postowner-profile-image'
                            loading="lazy"
                        />
                        <span>{postowner.username}</span>
                    </div>
                }
            </div>
            <div className="card-body p-0">
                <div id={post.id} className="carousel slide d-flex flex-column justify-content-around" style={{ maxHeight: '500px', height: '500px', overflow: 'hidden' }}>
                    {media.length > 1 && <>
                        <div className="carousel-indicators ">
                            {media.map((image, index) => {
                                return (
                                    <button key={uuidv4()} type="button" data-bs-target={`#${post.id}`} data-bs-slide-to={index} className={index === 0 ? "active" : ""} aria-current={index === 0 ? "true" : ""} aria-label={`Slide ${index + 1}`} ></button>
                                )
                            })}
                        </div>
                    </>
                    }
                    <div className="carousel-inner " style={{ cursor: 'pointer' }} onClick={openPost}>
                        {
                            media.map((image, index) => {
                                return (
                                    <div className={`carousel-item${index === 0 ? ' active' : ''} col-10`} key={uuidv4()}>
                                        <img src={mediaUrl + image} className="d-block w-100" alt={`image${index}`} onDoubleClick={manageLike} loading="lazy" />
                                    </div>
                                )
                            })
                        }
                    </div>
                    {media.length > 1 && <>
                        <button className="carousel-control-prev" type="button" data-bs-target={`#${post.id}`} data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target={`#${post.id}`} data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </>
                    }
                </div>
            </div>

            <div className="card-body py-1 border-top">
                <div className='d-flex'>
                    <i className={postLike ? "bi bi-heart-fill text-danger px-1" : "bi bi-heart px-1"}
                        onClick={manageLike}
                        style={{ cursor: 'pointer' }}
                    ></i> <span className='pe-1'>{totalLikes}</span>
                    <i className="bi bi-chat p-0 px-1"
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                            if (commentRef.current.style.display === 'none')
                                commentRef.current.style.display = ''
                            else commentRef.current.style.display = 'none'
                        }}
                    ></i>
                    <i className="bi bi-send px-1"
                        style={{ cursor: 'pointer' }}
                    ></i>
                </div>
            </div>
            <div className="card-body pt-0">
                <p className="card-text">{post.caption}</p>
            </div>
            {
                comments && comments.map((comm, index) => {
                    return (<PostComment key={uuidv4()} comment={comm} post={post} comments={comments} setComments={setComments} comment_index={index} />)
                })
            }
            <div className="card-body py-0" style={{ cursor: 'pointer' }}>
                <p>View all comments...</p>
            </div>
            <div className="card-body py-0 pb-1" ref={commentRef} style={{ display: 'none' }}>
                <form action="" className='d-flex'
                    onSubmit={manageNewComment}
                >
                    <input type="text" name="" id="" className='w-100 me-1 form-control'
                        ref={commentTextRef}
                    />
                    <button type="submit" className='btn btn-sm btn-success'>submit</button>
                </form>
            </div>
        </div>
    )
}

export default Post