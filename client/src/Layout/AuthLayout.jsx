import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import Register from '../views/auth/Register'

const AuthLayout = () => {
  return (
    <div>
        <Routes>
            <Route path='/login' element={<div>Login</div>} />
            <Route path='/register' element={<Register />} />
            <Route path='*' element={<Navigate to="/register" />} />
        </Routes>
    </div>
  )
}

export default AuthLayout