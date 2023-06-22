import React, { useEffect, useState } from 'react'
import './ProfileDetails.css'
import { axiosInstance } from '../../Contexts/AxioContext'

function ProfileDetails() {
    const [userName, setUsername] = useState('No user')
    const [postCount, serPostCount] = useState(0)
    const [followersCount, setFollowersCount] = useState(0)
    const [followiigCount, setFollowingCount] = useState(0)
    const [bio, setBio] = useState('No bio')

    const data = {
        1: 'username',
        2: 'bio',
        3: 'postCount',
        4: 'followersCount',
        5: 'followiigCount'
    }

    useEffect(() => {
        axiosInstance.get('userdetails', { params: data }).then((response) => {
            let user_data = response.data
            console.log(user_data);
            setUsername(user_data.username)
            setBio(user_data.bi)
        })
    })

    return (
        <div className="d-flex justify-content-around pt-3">
            <div className='me-5'>
                <img src="https://images.unsplash.com/photo-1513721032312-6a18a42c8763?w=152&h=152&fit=crop&crop=faces" alt=""
                    className='rounded-circle img-thumbnail'
                />
            </div>
            <div className='ms-5'>
                <div className='d-flex pt-3 '>
                    <div >
                        <h1>{userName}</h1>
                    </div>
                    <div className='d-flex flex-column justify-content-center mx-3'>
                        <button className=''>Edit Profile</button>
                    </div>
                    <div className='d-flex flex-column justify-content-center'>
                        <i className="bi bi-gear"></i>
                    </div>
                </div>
                <div className='pt-3'>
                    <ul className="d-flex p-0 m-0">
                        <li className="list-group-item pe-4">Posts {postCount}</li>
                        <li className="list-group-item pe-4">Followers {followersCount}</li>
                        <li className="list-group-item">Following {followiigCount}</li>

                    </ul>
                </div>
                <div className='pt-3'>
                    <span>bio</span>
                </div>
            </div>
        </div>
    )
}

export default ProfileDetails