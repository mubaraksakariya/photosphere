import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/UserSide/Home';
import Login from './Pages/UserSide/Login';
import Dashboard from './Pages/AdminSide/Dashboard';
import AdminLogin from './Pages/AdminSide/AdminLogin';
import Signup from './Pages/UserSide/Signup';
import Profile from './Pages/UserSide/Profile';
import VerifyEmail from './Componants/Others/VerifyEmail';
import Users from './Pages/AdminSide/Users';
import EditProfile from './Componants/Profile/EditProfile';
import { HomeProvider } from './Contexts/HomeContext';
import UserProfile from './Pages/UserSide/UserProfile';
import ChatFullpage from './Pages/UserSide/ChatFullpage';
import PostList from './Pages/AdminSide/PostList';
import Notifications from './Componants/Notification/Notifications';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<User />} />
          <Route exact path='/admin/*' element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}


// User side Routing

function User() {
  return (
    <HomeProvider>
      <Routes>
        <Route path='' element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
        <Route path='profile' element={<Profile />} />
        <Route path='verify' element={<VerifyEmail />} />
        <Route path='editprofile' element={<EditProfile />} />
        <Route path='userprofile' element={<UserProfile />} />
        <Route path='chat' element={<ChatFullpage />} />
      </Routes>
    </HomeProvider>
  )
}



// Admin side routing

function Admin() {
  return (
    <Routes>
      <Route path='' element={<Dashboard />} />
      <Route path='dashboard' element={<Dashboard />} />
      <Route path='login' element={<AdminLogin />} />
      <Route path='users' element={<Users />} />
      <Route path='postlist' element={<PostList />} />
    </Routes>
  )
}



export default App
