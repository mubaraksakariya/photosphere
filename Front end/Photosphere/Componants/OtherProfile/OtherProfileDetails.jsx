import React, { useContext, useEffect, useState } from 'react'
import './OtherProfileDetails.css'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AxiosContext from '../../Contexts/AxioContext'

function OtherProfileDetails({ user }) {
    const navigate = useNavigate()
    const mediaurl = useSelector((state) => state.mediaurl)
    const [thisUser, setThisuUser] = useState(null)
    const axiosInstance = useContext(AxiosContext)

    const manageFollow = () => {
        axiosInstance.get('follow', { params: { user: thisUser.id } }).then(response => {
            if (response.data.result) {
                setThisuUser(oldUser => ({
                    ...oldUser,
                    ...response.data.user
                }));
            }
        })
    }

    useEffect(() => {
        setThisuUser(user)
    }, [user])
    return (
        <div className="d-flex justify-content-around pt-3 pb-3">
            <div className='me-5 other-profile-img-div'
                onClick={() => navigate('/')}
                style={{ cursor: 'pointer' }}
            >
                {thisUser ?
                    <img src={mediaurl + thisUser.profile_img} alt="Profile image" className='profile-img' /> :
                    <img src='/no-profile-picture.jpg' alt="Profile image" className='profile-img' />
                }
            </div>
            <div className='ms-5'>
                <div className='d-flex justify-content-between pt-3 '>
                    <div >
                        <span className='h3'>{thisUser && thisUser.username}</span>
                    </div>
                    {/* <div className='d-flex flex-column justify-content-center mx-3'>
                        <button className=''
                            onClick={() => navigate('/editprofile')}
                        >Edit Profile</button>
                    </div> */}
                    <div className='d-flex flex-column justify-content-center'>
                        <i className="bi bi-gear"></i>
                    </div>
                </div>
                <div className='pt-3'>
                    <ul className="d-flex p-0 m-0">
                        <li className="list-group-item pe-4">Posts {thisUser && thisUser.number_of_posts}</li>
                        <li className="list-group-item pe-4">Followers {thisUser && thisUser.followersCount}</li>
                        <li className="list-group-item">Following {thisUser && thisUser.followiigCount}</li>

                    </ul>
                </div>
                <div className='pt-3'>
                    <span>{thisUser && thisUser.bio}</span>
                </div>
                <div className='pt-3'>
                    <div>
                        {thisUser && !thisUser.is_following ?
                            <button className='btn btn-sm btn-success' onClick={manageFollow}>follow</button> :
                            <button className='btn btn-sm btn-danger' onClick={manageFollow}>Unfollow</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default OtherProfileDetails