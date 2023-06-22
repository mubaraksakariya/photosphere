import { configureStore, createSlice } from '@reduxjs/toolkit'
import { axiosInstance } from '../Contexts/AxioContext';


const authState = createSlice({
    name: 'authentication',
    initialState: { isUser: false, isAdmin: false },
    reducers: {
        login(state, action) {
            let token = action.payload[0]
            localStorage.setItem("token", token);
            if (action.payload[1] === 'admin') {
                console.log('Admin is logged in');
                state.isAdmin = true
                state.isUser = false
            }
            else if (action.payload[1] === 'user') {
                console.log('user is logged in');
                state.isAdmin = false
                state.isUser = true
            }
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        },
        logout(state, action) {
            state.isUser = false
            state.isAdmin = false
            localStorage.removeItem('token');
            delete axiosInstance.defaults.headers.common['Authorization'];
        },
    }

})

export const auth = authState.actions;
const store = configureStore({
    reducer: authState.reducer
})

export default store;