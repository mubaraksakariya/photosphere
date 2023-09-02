import React, { useContext, useEffect, useState } from 'react'
import './ProfileSettings.css'
import { useLocation, useNavigate } from 'react-router-dom';
import AxiosContext from '../../Contexts/AxioContext';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../Store/AuthRedux';

function ProfileSettings() {
    const location = useLocation();
    const [profile, setProfile] = useState(location.state.profile)
    const axioInstance = useContext(AxiosContext)
    const isUser = useSelector(state => state.isUser)
    const navigate = useNavigate()
    const setUser = useSelector(state => state.setUser)
    const dispatch = useDispatch()
    useEffect(() => {
        if (!isUser) navigate('/login')
    }, [isUser])
    const manageChange = () => {
        setProfile(oldProfile => ({
            ...oldProfile,
            is_private: !oldProfile.is_private
        }));
    };
    const manageSubmit = (e => {
        e.preventDefault()
        axioInstance.put('profileSettings', { profile: profile }).then(response => {
            console.log(response.data.result);
        }).then(() => {
            dispatch(auth.setUser(profile))
            navigate(-1)
        })
    })
    return (
        <>
            <div className="row justify-content-center align-items-center g-2">
                <div className="col-md-3"></div>
                <div className="col-md">
                    <div className="text-center mb-3">
                        <h3 className='logo-text'>PHOTOSPHERE</h3>
                        <div className='mt-5 settings-main-div'>
                            <form action=""
                                onSubmit={manageSubmit}
                            >
                                <div className='d-flex justify-content-between'>
                                    <h6>Make Profile Private ?</h6>
                                    <div className="form-check form-switch">
                                        {profile && <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"
                                            checked={profile.is_private}
                                            onChange={manageChange}
                                        />}
                                    </div>
                                </div>
                                <div className='p-3 submit-btn-div'>
                                    <button type="button" className='btn btn-success me-2'
                                        onClick={() => navigate('/profile/')}
                                    >Cancel</button>
                                    <button type="submit" className='btn btn-danger '>Apply</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-3"></div>
            </div>
        </>
    )
}

export default ProfileSettings