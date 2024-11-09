import React from 'react'
import Navbar from '../components/dashboard/Navbar'
import { Outlet } from 'react-router-dom'
import EmployeeSidebar from '../components/employeeDashboard/EmployeeSidebar'

const EmployeeDashboard = () => {

  return (
    <div className='flex h-full overflow-hidden'>
      <EmployeeSidebar />
      <div className='flex-1 p-3 bg-gray-100'>
        <Navbar />
        <Outlet />
      </div>
    </div>
  )
}

export default EmployeeDashboard