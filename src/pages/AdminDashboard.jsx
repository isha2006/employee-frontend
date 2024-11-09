import React from 'react'
import AdminSidebar from '../components/dashboard/AdminSidebar'
import Navbar from '../components/dashboard/Navbar'
import { Outlet } from 'react-router-dom'

const AdminDashboard = () => {

  return (
    <div className='flex h-full overflow-hidden'>
      <AdminSidebar />
      <div className='flex-1 p-3 bg-gray-100'>
        <Navbar />
        <Outlet />
      </div>
    </div>
  )
}

export default AdminDashboard