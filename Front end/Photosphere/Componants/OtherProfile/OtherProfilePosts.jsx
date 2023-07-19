import React, { useContext, useEffect, useState } from 'react'
import './OtherProfilePosts.css'
import AxiosContext from '../../Contexts/AxioContext'
import { v4 as uuidv4 } from 'uuid';
import ProfilePost from '../Profile/ProfilePost';

function OtherProfilePosts({ user }) {
    const [posts, setPosts] = useState([])
    const axiosInstance = useContext(AxiosContext)
    useEffect(() => {
        if (user) {
            axiosInstance.get('post/profileposts', { params: { user: user.id } }).then((response) => {
                if (response.data.result) {
                    let posts = response.data.allPosts
                    setPosts(posts)
                }
            })
        }
    }, [user])

    return (
        <div className="row justify-content-center align-items-center g-2">
            {posts.length < 1 ?
                <div className="col-12 d-flex justify-content-center align-items-center" style={{ height: '10vw' }}>
                    <span>This user has no posts yet</span>
                </div>
                : <>
                    {posts.map((post) => {
                        return (
                            <div className="col-md-4 d-flex justify-content-center align-items-center" key={uuidv4()}>
                                <ProfilePost post={post} />
                            </div>
                        )
                    })}

                </>
            }
        </div>
    )
}

export default OtherProfilePosts