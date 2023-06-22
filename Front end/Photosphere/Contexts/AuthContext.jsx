import React, { useContext, useEffect } from 'react';
import { auth } from '../Store/AuthRedux';
import { useDispatch } from 'react-redux';
import AxiosContext from './AxioContext';


function AuthContext({ children }) {
    const dispatch = useDispatch()
    const axios = useContext(AxiosContext)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token != null) {
            axios.get('usertype').then((response) => {
                let user = response.data.user
                dispatch(auth.login([token, user]))
                console.log("auth context being run");
            })
        }
        else {
            console.log("token not accesible or no token")
            dispatch(auth.logout())
        }
    }, [])
    return <>{children}</>;
}

export default AuthContext