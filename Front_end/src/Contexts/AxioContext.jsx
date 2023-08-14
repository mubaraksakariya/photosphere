import axios from 'axios';
import React from 'react';


export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add an interceptor to include or remove the token from the headers
// axiosInstance.interceptors.request.use(config => {
const token = localStorage.getItem('jwtToken');
if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
} else {
    delete axiosInstance.defaults.headers.common['Authorization'];
}
//     return config;
// }, error => {
//     return Promise.reject(error);
// });


const AxiosContext = React.createContext(axiosInstance);
export default AxiosContext;
