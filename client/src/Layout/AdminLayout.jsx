import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import Announcements from '../views/admin/Announcements'
import AttendenceCode from '../views/admin/AttendenceCode'
import AttHistory from '../views/admin/AttHistory'

const AdminLayout = () => {
  return (
    <div>
        <Routes>
            <Route path='/attendence-code' element={<AttendenceCode />} />
            <Route path='/attendence-history' element={<AttHistory />} />
            <Route path='/announcements' element={<Announcements />} />
            <Route path='*' element={<Navigate to="/announcements" />} /> 
            {/* <Route path='*' element={<Navigate to="/attendence-code" />} />  */}
        </Routes>
    </div>
  )
}

export default AdminLayout
