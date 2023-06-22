import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '../Pages/UserSide/Home';
import Login from '../Pages/UserSide/Login';
import Dashboard from '../Pages/AdminSide/Dashboard';
import AdminLogin from '../Pages/AdminSide/AdminLogin';
import Signup from '../Pages/UserSide/Signup';
import Profile from '../Pages/UserSide/Profile';


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
    <Routes>
      <Route path='' element={<Home />} />
      <Route path='login' element={<Login />} />
      <Route path='signup' element={<Signup />} />
      <Route path='profile' element={<Profile />} />
    </Routes>
  )
}



// Admin side routing

function Admin() {
  return (
    <Routes>
      <Route path='dashboard' element={<Dashboard />} />
      <Route path='login' element={<AdminLogin />} />
    </Routes>
  )
}



export default App
