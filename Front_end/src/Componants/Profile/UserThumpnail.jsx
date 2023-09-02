import React, { useContext, useEffect, useState } from 'react'
import './UserThumpnail.css'
import { useSelector } from 'react-redux'
import AxiosContext from '../../Contexts/AxioContext'

function UserThumpnail({ follower }) {
    const mediaurl = useSelector(state => state.mediaurl)
    const axiosInstance = useContext(AxiosContext)
    const [user, setUser] = useState(follower)
    const manageUnfollow = () => {
        axiosInstance.put('follow', { user: follower.id }).then(response => {
            if (response.data.result) {
                setUser(response.data.user)
            }
        })
    }
    useEffect(() => {
        console.log(user);
    }, [user])

    return (
        <>
            {
                follower &&
                <div className='user-thumpnail-main-div'>
                    <div className='follower-img-div'>
                        <img src={mediaurl + user.profile_img} alt="" />
                    </div>
                    <div className='username-div'>
                        <h6 className='ps-1 m-0'>{user.username}</h6>
                    </div>
                    <div className='unfollow-btn-div'>
                        <button className='unfollow-btn btn btn-primary btn-sm'
                            onClick={manageUnfollow}
                        > {user.is_following ? (user.is_accepted ? 'Unfollow' : 'Cancel follow') : "Follow"}</button>
                    </div>
                </div>

            }
        </>
    )
}

export default UserThumpnail