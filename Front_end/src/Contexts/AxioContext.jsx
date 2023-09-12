import axios from 'axios';
import React from 'react';


export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const token = localStorage.getItem('jwtToken');
if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
} else {
    delete axiosInstance.defaults.headers.common['Authorization'];
}



const AxiosContext = React.createContext(axiosInstance);
export default AxiosContext;
