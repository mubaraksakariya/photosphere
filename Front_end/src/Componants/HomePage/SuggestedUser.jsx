import React, { useContext, useState } from 'react'
import { useSelector } from 'react-redux'
import AxiosContext from '../../Contexts/AxioContext'

function SuggestedUser({ user }) {
    const mediaurl = useSelector((state) => state.mediaurl)
    const [suggestedUser, setSuggestedUser] = useState(user)
    const axiosInstance = useContext(AxiosContext)
    const manageFollow = (e) => {
        axiosInstance.put('follow', { user: e.target.id }).then(response => {
            setSuggestedUser(response.data.user)
        })
    }
    return (suggestedUser &&
        <div className='d-flex justify-content-between'>
            <div className="d-flex pe-5">
                <div>
                    <img className="rounded-circle img-thumbnail suggested-profile-image" alt="avatar1" src={mediaurl + suggestedUser.profile_img} />
                </div>
                <div className='d-flex flex-column justify-content-center'>
                    <h6 className='p-0 m-0'>{suggestedUser.username}</h6>
                </div>
            </div>
            <div className='ps-5 pt-2'>
                <span
                    id={suggestedUser.id}
                    style={{ cursor: 'pointer' }}
                    onClick={manageFollow}
                >{suggestedUser.is_following ? 'unfollow' : 'follow'}</span>
            </div>
        </div>
    )
}

export default SuggestedUser