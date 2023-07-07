import React, { useContext, useEffect, useLayoutEffect } from 'react';
import { auth } from '../Store/AuthRedux';
import { useDispatch, useSelector } from 'react-redux';
import AxiosContext, { axiosInstance } from './AxioContext';

function AuthContext({ children }) {
    const dispatch = useDispatch()
    const axios = useContext(AxiosContext)
    const token = localStorage.getItem('token')
    const profile = useSelector((state) => state.profile)
    useLayoutEffect(() => {
        if (token != null) {
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            axios.get('usertype').then((response) => {
                let user = response.data.user
                dispatch(auth.login([token, user]))
                // console.log("auth context being run");
            }).then(() => {
                axiosInstance.get('getuser').then((response) => {
                    dispatch(auth.setUser(response.data.user))
                })
            })
        }
        else {
            // console.log("token not accesible or no token")
            dispatch(auth.logout())
        }
    }, [])
    return <>{children}</>;
}

export default AuthContext