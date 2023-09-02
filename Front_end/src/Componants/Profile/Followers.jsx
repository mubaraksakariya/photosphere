import React, { useContext, useEffect, useState } from 'react'
import './Followers.css'
import AxiosContext from '../../Contexts/AxioContext'
import { useSelector } from 'react-redux'
import UserThumpnail from './UserThumpnail'
import { v4 as uuidv4 } from 'uuid';
function Followers({ setOverlay }) {
    const axiosInstance = useContext(AxiosContext)
    const profile = useSelector(state => state.profile)
    const [followers, setFollowers] = useState([])
    useEffect(() => {
        if (profile) {
            axiosInstance.get('followers', { params: { user: profile.id } }).then(responnse => {
                setFollowers(responnse.data.followers)
            })
        }
    }, [profile])
    return (
        <>
            <div className="row justify-content-center align-items-center g-2">
                <div className="col-md"></div>
                <div className="col notification-main-div">
                    <div className='header'>
                        <img src="./just logo.png" alt="" className='heading-logo' />
                        <h5 className='h5 pt-2'>Followers</h5>
                        <i className="bi bi-x-square-fill notification-close-button"
                            onClick={() => setOverlay(false)}
                        ></i>
                    </div>
                    <div className="notifiaction-body">
                        {
                            followers && followers.map((follower) => {
                                return (
                                    <UserThumpnail key={uuidv4()} follower={follower} />
                                )
                            })
                        }
                    </div>
                </div>
                <div className="col-md"></div>
            </div>
        </>
    )
}

export default Followers