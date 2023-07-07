import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import './VerifyEmail.css'
import AxiosContext from '../../Contexts/AxioContext'
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../Store/AuthRedux';

function VerifyEmail() {
    const [otp, setOtp] = useState('')
    const [error, setError] = useState('')
    const axiosInstance = useContext(AxiosContext)
    const location = useLocation();
    const data = location.state
    const [user, setUser] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isUser = useSelector(state => state.isUser)

    useEffect(() => {
        if (isUser) navigate('/')
        console.log(data.user);
        setUser(data.user)
        console.log(user);
    }, [isUser])
    const manageSubmit = (event) => {
        event.preventDefault()
        setError("")
        const data = {
            otp: otp,
            user: user,
        }
        console.log(data);
        axiosInstance.post('verifyOtp', data).then((response) => {
            if (response.data.result) {
                // Swal.fire(
                //     'Congradulations',
                //     'Verification success',
                //     'success'
                // )
                let token = response.data.token
                console.log(token);
                dispatch(auth.login([token, 'user']))
                // navigate('/')
            } else {
                setError("Otp do not match")
            }
        })
    }

    const manageResend = (e) => {
        e.preventDefault()
        let data = {
            user: user
        }
        axiosInstance.get('resendOtp', { params: data, }).then((response) => {
            console.log(response.data.result);
        })
    }
    return (
        <div className="row justify-content-center align-items-center g-2">
            <div className="col"></div>
            <div className="col ">
                <div className='half-height-div'>
                </div>
                <form action="" className='d-flex justify-content-center align-items-center'
                    onSubmit={manageSubmit}
                >
                    <div className="form-floating ">
                        <input className="form-control" name="otp" placeholder="Enter OTP" required="" type="text"
                            value={otp}
                            onChange={(e) => { setOtp(e.target.value) }}
                        /><label>Eneter OTP</label>

                    </div>
                    <div className="mx-3">
                        <button className="btn btn-primary fw-bold bg-gradient" href="#" type="submit">Verify</button>
                    </div>
                </form>
                <div className='d-flex justify-content-center align-items-center'>
                    <span className='text-danger'>{error}</span>
                </div>
                <div className='d-flex justify-content-center align-items-center'>
                    <a href=""
                        onClick={manageResend}
                    >Resend otp</a>
                </div>
                <div className='half-height-div'>
                </div>
            </div>
            <div className="col"></div>
        </div>
    )
}

export default VerifyEmail