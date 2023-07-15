import React, { useContext, useEffect, useState } from 'react'
import './Signup.css'
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import AxiosContext from '../../Contexts/AxioContext';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../Store/AuthRedux';
import Swal from 'sweetalert2';

function Signup() {

    const axiosInstance = useContext(AxiosContext)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isUser = useSelector((state) => state.isUser)

    const [email, setEmail] = useState('')
    const [first_name, setFirst_name] = useState('')
    const [last_name, setLastname] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        if (isUser) navigate('/')
    }, [isUser])


    const handleGoogleSignup = (credentialResponse) => {
        const jwt_token = jwt_decode(credentialResponse.credential)

        const data = {
            token: jwt_token,
        }
        axiosInstance.post('googleSignup', data).then((response) => {
            let token = response.data.token
            if (response.data.result) {
                dispatch(auth.login([token, 'user']))
                navigate('/')
            }
            else {
                console.log("Error logging in");
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let phone_regex = /^(\+91|0|91)?\d{10}$/;

        if (!email_regex.test(email) && !phone_regex.test(email)) {
            console.log("email/ phone error");
            alert("Email or Phone error")
            return false
        }
        const data = {
            email,
            first_name,
            last_name,
            username,
            password
        }
        axiosInstance.post('signup', data).then((response) => {
            if (response.data.result) {
                const data = {
                    user: response.data.user,
                };
                navigate('/verify', { state: data })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'This user already exists',
                    text: 'Something went wrong!',
                })
            }
        })
    }
    return (
        <div className='container-fluid '>
            <div className='container py-4'>
                <div className="row justify-content-center align-items-center g-2">
                    <div className="col"></div>
                    <div className="col">
                        <div className="row d-flex align-items-center justify-content-center">
                            <div className='box'>
                                <form action="#" className="bg-white  py-4 px-5" method="get"
                                    onSubmit={handleSubmit}
                                >
                                    <div className="text-center mb-3">
                                        <h3 className='logo-text'>PHOTOSPHERE</h3>
                                        <p className="text-muted fw-bold">
                                            Sign up to see photos and videos from your friends.
                                        </p>

                                    </div>
                                    <div className="mb-3">
                                        <div className='d-flex justify-content-center'>
                                            <GoogleLogin
                                                onSuccess={credentialResponse => {
                                                    handleGoogleSignup(credentialResponse)
                                                }}
                                                onError={() => {
                                                    console.log('Login Failed');
                                                }}

                                            />
                                        </div>
                                        <p className="my-3 text-center or">
                                            OR
                                        </p>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input className="form-control" name="email" placeholder="Mobile Number or Email" required="" type="text"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        /><label>Mobile Number or Email</label>
                                        <span ></span>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input className="form-control" name="firstname" placeholder="Full Name" required="" type="text"
                                            value={first_name}
                                            onChange={(e) => setFirst_name(e.target.value)}
                                        /><label>First Name</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input className="form-control" name="lastname" placeholder="Full Name" required="" type="text"
                                            value={last_name}
                                            onChange={(e) => setLastname(e.target.value)}
                                        /><label>Last Name</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input className="form-control" name="username" placeholder="Username" required="" type="text"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        /><label>Username</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input className="form-control" name="password" placeholder="Password" required="" type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        /><label>Password</label>
                                    </div>
                                    <div className="mb-2">
                                        <button className="btn btn-primary fw-bold w-100 bg-gradient" href="#" type="submit">Sign Up</button>
                                    </div>
                                    <div className="small text-center">
                                        By signing up, you agree to our Terms , Data Policy and Cookies Policy.
                                    </div>
                                </form>
                                <div className="bg-white py-4 px-5 text-center  mt-4">
                                    <p className="m-0">
                                        Have an account? <a href="#"
                                            onClick={() => navigate('/login')}
                                        >Log In</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col"></div>
                </div>
            </div >
        </div >
    )
}

export default Signup