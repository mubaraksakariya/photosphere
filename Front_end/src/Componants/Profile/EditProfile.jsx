import React, { useContext, useEffect, useState, useRef } from 'react'
import AxiosContext from '../../Contexts/AxioContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './EditProfile.css'
import { auth } from '../../Store/AuthRedux';
function EditProfile() {
    const ErrorRef = useRef()
    const [Error, setError] = useState("")
    const axiosInstance = useContext(AxiosContext)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const isUser = useSelector((state) => state.isUser)
    const profile = useSelector((state) => state.profile)
    const fileInput = useRef(null);
    const [email, setEmail] = useState('')
    const [first_name, setFirst_name] = useState('')
    const [last_name, setLastname] = useState('')
    const [username, setUsername] = useState('')
    const [profilepic, setProfilePic] = useState(null)
    const [displayimage, setDisplayImage] = useState(null)
    const [bio, setBio] = useState('')
    const mediaurl = useSelector((state) => state.mediaurl)
    useEffect(() => {
        if (!isUser) navigate('/login')
        else localStorage.setItem('current_path', location.pathname)
        setEmail(profile?.email)
        setFirst_name(profile?.first_name)
        setLastname(profile?.last_name)
        setUsername(profile?.username)
        setBio(profile.bio)
        setProfilePic(mediaurl + profile?.profile_img)
    }, [profile])

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = new FormData();
        data.append('email', email);
        data.append('username', username);
        data.append('first_name', first_name);
        data.append('last_name', last_name);
        data.append('bio', bio);
        data.append('profilepic', profilepic);

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axiosInstance.post('updateProfile', data, config).then((response) => {
            if (response.data.result) {
                dispatch(auth.setUser(response.data.user))
                navigate('/profile')
            }
        }).catch(() => {
            setError("Something went Wrong")
        })
    }
    return (
        <div>
            <div className="row justify-content-center align-items-center g-2">
                <div className="col-1"></div>
                <div className="col">
                    <div className='container py-4'>
                        <div className="row justify-content-center align-items-center g-2">
                            <div className="col"></div>
                            <div className="col">
                                <div className="row d-flex align-items-center justify-content-center">
                                    <div className='box'>
                                        <form action="#" className="bg-white  py-2 px-3" method="get"
                                            onSubmit={handleSubmit}
                                        >
                                            <div className="text-center mb-3">
                                                <h3 className='logo-text'>PHOTOSPHERE</h3>
                                                <p className="text-muted fw-bold">
                                                    Edit your Profile
                                                </p>

                                            </div>
                                            <div className="form-floating mb-3">
                                                <input className="form-control" name="email" placeholder="Email" required="" type="text" readOnly
                                                    value={email}
                                                // onChange={(e) => setEmail(e.target.value)}
                                                /><label>Mobile Number or Email</label>
                                                <span ></span>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input className="form-control" name="firstname" placeholder="Full Name" required="" type="text"
                                                    value={first_name}
                                                    onChange={(e) => {
                                                        setFirst_name(e.target.value)
                                                        setError('')
                                                    }}
                                                /><label>First Name</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input className="form-control" name="lastname" placeholder="Full Name" required="" type="text"
                                                    value={last_name}
                                                    onChange={(e) => {
                                                        setLastname(e.target.value)
                                                        setError('')
                                                    }}
                                                /><label>Last Name</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input className="form-control" name="username" placeholder="Username" required="" type="text"
                                                    value={username}
                                                    onChange={(e) => {
                                                        setUsername(e.target.value)
                                                        setError('')
                                                    }}
                                                /><label>Username</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input className="form-control" name="bio" placeholder="bio" required="" type="text"
                                                    value={bio}
                                                    onChange={(e) => {
                                                        setBio(e.target.value)
                                                        setError('')
                                                    }}
                                                /><label>Bio</label>
                                            </div>
                                            <div className="form-floating mb-3 d-flex justify-content-center">
                                                <span ref={ErrorRef}>{Error}</span>
                                            </div>
                                            <div className="form-floating mb-3 d-flex justify-content-center">
                                                <input type="file" name="" id="" style={{ display: 'none' }}
                                                    ref={fileInput}
                                                    onChange={(e) => {
                                                        setProfilePic(e.target.files[0])
                                                        setDisplayImage(e.target.files[0])
                                                    }}
                                                />
                                                <img className='img img-thumbnail w-50' src={displayimage ? URL.createObjectURL(displayimage) : profilepic} alt="Profile image"
                                                    onClick={(e) => {
                                                        fileInput.current.click();
                                                    }}
                                                />

                                            </div>
                                            <div className="mb-2 d-flex justify-content-around">
                                                <div className="mb-2">
                                                    <button className="btn btn-danger fw-bold w-100 bg-gradient" href="#" type="submit">Apply</button>
                                                </div>
                                                <div className="mb-2">
                                                    <button className="btn btn-success fw-bold w-100 bg-gradient" href="#" type="button"
                                                        onClick={() => navigate('/profile')}
                                                    >Cancel</button>
                                                </div>
                                            </div>

                                        </form>

                                    </div>
                                </div>
                            </div>
                            <div className="col"></div>
                        </div>
                    </div >
                </div >
                <div className="col-1"></div>
            </div>
        </div>
    )
}

export default EditProfile