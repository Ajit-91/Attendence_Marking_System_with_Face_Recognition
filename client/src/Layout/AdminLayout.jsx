import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import AttendenceCode from '../views/admin/AttendenceCode'
import AttHistory from '../views/admin/AttHistory'

const AdminLayout = () => {
  return (
    <div>
        <Routes>
            <Route path='/attendence-code' element={<AttendenceCode />} />
            <Route path='/attendence-history' element={<AttHistory />} />
            <Route path='/announcement' element={<div>Admin home page</div>} />
            <Route path='*' element={<Navigate to="/attendence-code" />} />
        </Routes>
    </div>
  )
}

export default AdminLayout