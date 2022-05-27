import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import Attendence from '../views/student/Attendence'
import Home from '../views/student/Home'
import MyAttHistory from '../views/student/MyAttHisrory'

const StudentLayout = () => {
  return (
    <div>
        <Routes>
            <Route path='/home' element={<Home />} />
            <Route path='/attendence' element={<Attendence />} />
            <Route path='/my-attendence' element={<MyAttHistory />} />
            <Route path='*' element={<Navigate to="/home" />} />
        </Routes>
    </div>
  )
}

export default StudentLayout