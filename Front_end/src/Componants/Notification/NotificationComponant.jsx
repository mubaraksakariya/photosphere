import React, { useContext, useEffect, useState } from 'react'
import './NotificationComponant.css'
import AxiosContext from '../../Contexts/AxioContext'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { LineWave } from 'react-loader-spinner'
import { HomeContext } from '../../Contexts/HomeContext'

function NotificationComponant({ notification }) {
    const axiosInstance = useContext(AxiosContext)
    const [user, setUser] = useState([])
    const mediaurl = useSelector(state => state.mediaurl)
    const navigate = useNavigate()
    const { setIsPostView, setIsNotification } = useContext(HomeContext)
    const [post, setPost] = useState([])
    useEffect(() => {
        if (notification.notification_type === "message"
            | notification.notification_type === "following"
            | notification.notification_type === "follow_request"
            | notification.notification_type === "accepted") {

            axiosInstance.get('getuser', { params: { user: notification.context } }).then(response => {
                let user = response.data.user
                setUser(user)
            })
        }
        if (notification.notification_type === "like") {
            axiosInstance.get('post/likeapost', { params: { like_id: notification.context } }).then((response) => {
                setUser(response.data.user)
                setPost(response.data.post)
            })
        }
        if (notification.notification_type === "comment") {
            console.log(notification.context);
            axiosInstance.get('post/commentonpost', { params: { comment_id: notification.context } }).then((response) => {
                console.log(response.data);
                setUser(response.data.user)
                setPost(response.data.post)
            })
        }
    }, [notification])

    useEffect(() => {
        if (!notification.is_read) {
            axiosInstance.get('notification/notificationviewed', { params: { notification_id: notification.id } }).then(response => {
            })
        }
    }, [notification])

    const manageAccept = () => {
        axiosInstance.post('follow', { user: user.id }).then(response => {
            if (response.data.result) {
                setUser(oldUser => ({
                    ...oldUser,
                    ...response.data.user
                }));
            }
        })
        notification.notification_type = "following"
        console.log(notification);
    }
    const openPost = () => {
        let postowner = null;
        let media = null;
        console.log("total likes " + post.likes_count);
        // Fetch user data
        axiosInstance.get('getuser', { params: { user: post.user_id } }).then((response) => {
            if (response.data.result) {
                let user = response.data.user;
                postowner = user;

                // After fetching user data, fetch media
                axiosInstance.get('post/getmedia', { params: { post_id: post.id } }).then((response) => {
                    if (response.data.result) {
                        let medaiset = response.data.media;
                        media = medaiset;

                        // After fetching media, set the state
                        setIsPostView({ post: true, post: post, media: media, postowner: postowner });
                        setIsNotification(false)
                    }
                });
            }
        });
    };

    return (
        <>

            {user.username && notification && (notification.notification_type === "message") &&
                <div className={`notification ${notification.is_read ? '' : 'shadow'}`}
                    onClick={() => navigate('/chat')}
                >
                    <div className='user-img-div'>
                        <img src={mediaurl + user.profile_img} alt="" className='user-img' />
                    </div>
                    <p>{user.username} have send you a message</p>
                </div>
            }

            {user.username && notification && (notification.notification_type === "following") &&
                <div className={`notification ${notification.is_read ? '' : 'shadow'}`}
                    onClick={() => navigate('userprofile', { state: { user: user.id } })}
                >
                    <div className='user-img-div'>
                        <img src={mediaurl + user.profile_img} alt="" className='user-img' />
                    </div>
                    <p>{user.username} is following you now </p>
                </div>
            }
            {user.username && notification && (notification.notification_type === "follow_request") &&
                <div className={`notification ${notification.is_read ? '' : 'shadow'}`}>
                    <div className='user-img-div'>
                        <img src={mediaurl + user.profile_img} alt="" className='user-img' />
                    </div>
                    <p
                        onClick={() => navigate('userprofile', { state: { user: user.id } })}
                    >{user.username} have requseted to follow you  </p>
                    <button className='btn btn-sm btn-success accept-btn'
                        onClick={manageAccept}
                    >Accept</button>
                </div>
            }
            {user.username && notification && (notification.notification_type === "accepted") &&
                <div className={`notification ${notification.is_read ? '' : 'shadow'}`}
                    onClick={() => navigate('userprofile', { state: { user: user.id } })}
                >
                    <div className='user-img-div'>
                        <img src={mediaurl + user.profile_img} alt="" className='user-img' />
                    </div>
                    <p>{user.username} have Accepted your follow request </p>
                </div>
            }
            {user.username && notification && (notification.notification_type === "like") &&
                <div className={`notification ${notification.is_read ? '' : 'shadow'}`}
                    onClick={openPost}
                >
                    <div className='user-img-div'>
                        <img src={mediaurl + user.profile_img} alt="" className='user-img' />
                    </div>
                    <p>{user.username} liked a post </p>
                </div>
            }
            {user.username && notification && (notification.notification_type === "comment") &&
                <div className={`notification ${notification.is_read ? '' : 'shadow'}`}
                    onClick={openPost}
                >
                    <div className='user-img-div'>
                        <img src={mediaurl + user.profile_img} alt="" className='user-img' />
                    </div>
                    <p>{user.username} commented on a post </p>
                </div>
            }

            {
                !user.username &&
                <div className='d-flex justify-content-center'>
                    {
                        <LineWave height={40} />
                    }
                </div>
            }
        </>
    )
}

export default NotificationComponant