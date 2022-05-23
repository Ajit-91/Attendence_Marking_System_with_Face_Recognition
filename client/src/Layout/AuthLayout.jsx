import React from 'react'
import { Navigate, Route, Routes } from 'react-router'

const AuthLayout = () => {
  return (
    <div>
        <Routes>
            <Route path='/login' element={<div>Login</div>} />
            <Route path='*' element={<Navigate to="/login" />} />
        </Routes>
    </div>
  )
}

export default AuthLayout