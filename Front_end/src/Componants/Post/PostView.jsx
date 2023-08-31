import React, { useContext, useEffect, useRef, useState } from 'react'
import './PostView.css'
import { HomeContext } from '../../Contexts/HomeContext';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
import AxiosContext from '../../Contexts/AxioContext'
import PostComment from './PostComment';
import { useNavigate } from 'react-router-dom';

function PostView() {
    const mediaUrl = useSelector((state) => state.mediaurl)
    const axioinstance = useContext(AxiosContext)
    const { setIsPostView, setPosts, isPostview } = useContext(HomeContext)
    const [currentPost, setCurrentPost] = useState(isPostview.post)
    const [media, setMedia] = useState(isPostview.media)
    const [postowner, setPostOWner] = useState(isPostview.postowner)
    const [postLike, setPostLike] = useState(currentPost.is_liked)
    const [totalLikes, setTotalLiks] = useState(currentPost.total_likes)
    const [comments, setComments] = useState([])
    const commentTextRef = useRef()
    const profile = useSelector(state => state.profile)
    const navigate = useNavigate()
    useEffect(() => {
        axioinstance.get('post/getcomments', { params: { post_id: currentPost.id } }).then((response) => {
            if (response.data.result) {
                let newcomments = response.data.comments
                setComments(newcomments)
            }
        })
    }, [])
    const manageLike = () => {
        axioinstance.put('post/likeapost', { post_id: currentPost.id }).then((response) => {
            if (response.data.result) {
                if (postLike) setTotalLiks((like) => like - 1)
                else setTotalLiks((like) => like + 1)
                setPostLike(!postLike)
                setPosts(oldPosts => {
                    const updatedPosts = oldPosts.map(post => {
                        if (post.id === currentPost.id) {
                            return {
                                ...post,
                                is_liked: !postLike,
                                total_likes: postLike ? post.total_likes - 1 : post.total_likes + 1
                            };
                        }
                        return post;
                    });
                    return updatedPosts;
                });
            }
        })
    }
    const manageNewComment = (e) => {
        e.preventDefault()
        let text = commentTextRef.current.value
        commentTextRef.current.value = ""
        const data = {
            comment: text,
            post_id: currentPost.id
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
    return (
        <div className="container" >
            <div className="row main-post-div">
                <div className="col-md-8">
                    <i className="bi bi-x-square float-end close-botton-smallscreen" style={{ cursor: 'pointer', color: 'red' }} onClick={() => setIsPostView(false)}></i>
                    <div className="card-body p-0">
                        <div id={currentPost.id} className="carousel slide d-flex flex-column justify-content-around" style={{ maxHeight: '500px', height: '500px', overflow: 'hidden' }}>
                            {/* {media.length > 1 && <>
                                <div className="carousel-indicators ">
                                    {media.map((image, index) => {
                                        return (
                                            <button key={uuidv4()} type="button" data-bs-target={`#${currentPost.id}`} data-bs-slide-to={index} className={index === 0 ? "active" : ""} aria-current={index === 0 ? "true" : ""} aria-label={`Slide ${index + 1}`} ></button>
                                        )
                                    })}
                                </div>
                            </>
                            } */}
                            <div className="carousel-inner ">
                                {
                                    media.map((image, index) => {
                                        return (
                                            <div className={`carousel-item${index === 0 ? ' active' : ''} col-10`} key={uuidv4()}>
                                                <img src={mediaUrl + image} className="d-block w-100" alt={`image${index}`} loading="lazy" />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            {media.length > 1 && <>
                                <button className="carousel-control-prev" type="button" data-bs-target={`#${currentPost.id}`} data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target={`#${currentPost.id}`} data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </>
                            }
                        </div>
                    </div>
                </div>
                <div className="col-md-4 post-details-smallscreen">
                    <i className="bi bi-x-square float-end close-botton" style={{ cursor: 'pointer', color: 'red' }} onClick={() => setIsPostView(false)}></i>
                    <div className='user-div'
                        onClick={redirectToProfile}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className='postowner-img-div'>
                            <img src={mediaUrl + postowner.profile_img} alt="" className='postowner-img' />
                        </div>
                        <span className='text-white'>{postowner.username}</span>
                    </div>
                    <div className="card-body pt-0">
                        <div className="card-body py-1">
                            <div className='d-flex g-5'>
                                <i className={postLike ? "bi bi-heart-fill text-danger px-1" : "bi bi-heart px-1"}
                                    onClick={manageLike}
                                    style={{ cursor: 'pointer' }}
                                ></i> <span className='pe-1'>{currentPost.total_likes}</span>
                                <i className="bi bi-chat p-0 px-1"
                                    style={{ cursor: 'pointer' }}

                                ></i> <span className='pe-1'>{currentPost.total_comments}</span>
                                <i className="bi bi-send px-1"
                                    style={{ cursor: 'pointer' }}
                                ></i>
                            </div>
                        </div>
                        <p className="card-text  py-2">{currentPost.caption}</p>
                    </div>
                    <div className='py-2'>
                        <div className="comment-div">
                            {
                                comments.length > 0 ? comments.map((comm, index) => {
                                    return (<PostComment key={uuidv4()} comment={comm} post={currentPost} comments={comments} setComments={setComments} comment_index={index} />)
                                }) :
                                    <span>No Comments yet<br />Post a comment...  </span>
                            }
                        </div>
                        <div className="comment-input">
                            <div className="card-body py-0 pb-1" >
                                <form action="" className='d-flex'
                                    onSubmit={manageNewComment}
                                >
                                    <input type="text" name="" id="" className='w-100 me-1 form-control' placeholder='Comment here...'
                                        ref={commentTextRef}
                                    />
                                    <button type="submit" className='btn btn-sm btn-success'>submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default PostView