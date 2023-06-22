import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import './Login.css'
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import AxiosContext from '../../Contexts/AxioContext';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../Store/AuthRedux';

function Login() {
    const navigate = useNavigate()
    const axiosInstance = useContext(AxiosContext)
    const dispatch = useDispatch()
    const isUser = useSelector((state) => state.isUser)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    useEffect(() => {
        console.log('isUser is ' + isUser);
        if (isUser) navigate('/')
    }, [isUser])

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            email,
            password
        }
        axiosInstance.post('signin', data).then((response) => {
            if (response.data.result) {
                let token = response.data.token
                dispatch(auth.login([token, 'user']))
                navigate('/')
            }
            else {
                alert("login failed")
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
                            <div className='box  py-4 px-5'>
                                <form action="#" className="bg-white " method="get"
                                    onSubmit={handleSubmit}
                                >
                                    <div className="text-center mb-3">
                                        <h3 className='logo-text'>PHOTOSPHERE</h3>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input className="form-control" name="email" placeholder="Mobile Number or Email" required="" type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        /><label>Mobile Number or Email</label>
                                    </div>

                                    <div className="form-floating mb-3">
                                        <input className="form-control" name="password" placeholder="Password" required="" type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        /><label>Password</label>
                                    </div>
                                    <div className="mb-2">
                                        <button className="btn btn-primary fw-bold w-100 bg-gradient" href="#" type="submit">Sign In</button>
                                    </div>
                                </form>
                                <div className="p-4">
                                    <GoogleLogin
                                        onSuccess={credentialResponse => {
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
                                        }}

                                        onError={() => {
                                            console.log('Login Failed');
                                        }}

                                    />
                                </div>
                            </div>
                            <div className="bg-white py-4 px-5 text-center  mt-4">
                                <p className="m-0">
                                    Don't Have an account? <a href="#"
                                        onClick={() => navigate('/signup')}
                                    > Sign Up</a>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col"></div>
                </div>
            </div >
        </div >
    )
}

export default Login;