import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaBuilding, FaRegCalendarAlt, FaMoneyBillWave, FaCog } from 'react-icons/fa';

const AdminSidebar = () => {
  return (
    <div className="flex flex-col min-h-screen w-64 bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg">
      <div className="flex items-center justify-center p-3 mt-3 h-16 text-white text-3xl font-extrabold">
        Employee Management
      </div>
      <nav className="flex-1 px-2 mt-10">
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/admin-dashboard"
              className={({ isActive }) => `flex items-center p-2 text-white rounded-lg ${isActive ? 'bg-purple-600' : 'hover:bg-purple-600'}`} end
            >
              <FaTachometerAlt className="w-6 h-6 mr-3" />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin-dashboard/employees"
              className={({ isActive }) => `flex items-center p-2 text-white rounded-lg ${isActive ? 'bg-purple-600' : 'hover:bg-purple-600'}`}
            >
              <FaUsers className="w-6 h-6 mr-3" />
              Employees
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin-dashboard/departments"
              className={({ isActive }) => `flex items-center p-2 text-white rounded-lg ${isActive ? 'bg-purple-600' : 'hover:bg-purple-600'}`}
            >
              <FaBuilding className="w-6 h-6 mr-3" />
              Departments
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin-dashboard/leaves"
              className={({ isActive }) => `flex items-center p-2 text-white rounded-lg ${isActive ? 'bg-purple-600' : 'hover:bg-purple-600'}`}
            >
              <FaRegCalendarAlt className="w-6 h-6 mr-3" />
              Leaves
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin-dashboard/salary"
              className={({ isActive }) => `flex items-center p-2 text-white rounded-lg ${isActive ? 'bg-purple-600' : 'hover:bg-purple-600'}`}
            >
              <FaMoneyBillWave className="w-6 h-6 mr-3" />
              Salary
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin-dashboard/settings"
              className={({ isActive }) => `flex items-center p-2 text-white rounded-lg ${isActive ? 'bg-purple-600' : 'hover:bg-purple-600'}`}
            >
              <FaCog className="w-6 h-6 mr-3" />
              Settings
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;
