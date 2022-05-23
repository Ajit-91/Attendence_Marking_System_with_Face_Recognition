import React from 'react'
import { Navigate, Route, Routes } from 'react-router'

const AdminLayout = () => {
  return (
    <div>
        <Routes>
            <Route path='/admin-panel' element={<div>Admin home page</div>} />
            <Route path='*' element={<Navigate to="/admin-panel" />} />
        </Routes>
    </div>
  )
}

export default AdminLayout