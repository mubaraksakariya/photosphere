import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import './ProfilePosts.css'
import ProfilePost from './ProfilePost'
import AxiosContext from '../../Contexts/AxioContext'
function ProfilePosts() {
    const axiosInstance = useContext(AxiosContext)
    const [posts, setPosts] = useState([])
    const [isPost, setIsPost] = useState(false)
    useEffect(() => {
        axiosInstance.get('post/profileposts').then((response) => {
            if (response.data.result) {
                let posts = response.data.allPosts
                setPosts(posts)
            }
        })
    }, [])
    useLayoutEffect(() => {
        if (posts.length > 0) setIsPost(true)
    }, [posts])
    return (
        <div className="row justify-content-center align-items-center g-2">
            {!isPost ?
                <div className="col-12 d-flex justify-content-center align-items-center" style={{ height: '10vw' }}>
                    <span>You have no posts yet</span>
                </div>
                : <>
                    {posts.map((post) => {
                        return (
                            <div className="col-md-4 d-flex justify-content-center align-items-center" key={post.id}>
                                <ProfilePost post={post} />
                            </div>
                        )
                    })}

                </>
            }
        </div>
    )
}

export default ProfilePosts