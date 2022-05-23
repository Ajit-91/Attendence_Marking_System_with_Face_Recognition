import React from 'react'
import { Navigate, Route, Routes } from 'react-router'

const StudentLayout = () => {
  return (
    <div>
        <Routes>
            <Route path='/home' element={<div>Student Home</div>} />
            <Route path='*' element={<Navigate to="/home" />} />
        </Routes>
    </div>
  )
}

export default StudentLayout