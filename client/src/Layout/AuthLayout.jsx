import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import Register from '../views/auth/Register'
import Login from '../views/auth/Login'

const AuthLayout = () => {
  return (
    <div>
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            {/* Default Route  */}
            <Route path='*' element={<Navigate to="/login" />} />
        </Routes>
    </div>
  )
}

export default AuthLayout