import React, { useContext, useEffect, useState } from 'react'
import './ProfilePosts.css'
import AxiosContext from '../../Contexts/AxioContext';
import { useSelector } from 'react-redux';

function ProfilePost({ post }) {
    const axiosInstance = useContext(AxiosContext)
    const [mediaList, setMediaList] = useState([])
    const mediaUrl = useSelector((state) => state.mediaurl)
    useEffect(() => {
        let params = {
            post_id: post.id
        }
        axiosInstance.get('post/getmedia', { params }).then((response) => {
            if (response.data.result) {
                let media = response.data.media
                setMediaList(media)
            }
        })
    }, [])
    return (
        <div className="card d-flex justify-content-center align-items-center bg-light-subtle" style={{ minHeight: '250px', minWidth: '250px', maxWidth: '250px', maxHeight: '250px', overflow: 'hidden' }}>
            <img className="" src={mediaUrl + mediaList[0]} alt="Card image"
                style={{ width: 'auto', height: '100%', position: 'absolute' }}
            />
            <div className="card-img-overlay d-flex flex-column justify-content-center align-items-center"
                style={{ opacity: 0 }}
                onPointerEnter={(event) => {
                    event.target.style.backgroundColor = 'rgba(0, 0, 0, 0.2)'
                    event.target.style.opacity = 0.7
                    event.target.style.color = 'white'
                }}
                onMouseLeave={(event) => {
                    event.target.style.backgroundColor = 'transparent'
                    event.target.style.opacity = 0
                }}
            >
                <i className="bi bi-heart px-2">{post.total_likes}</i>
                <i className="bi bi-chat px-2">{post.total_comments}</i>
            </div>
        </div >
    )
}

export default ProfilePost