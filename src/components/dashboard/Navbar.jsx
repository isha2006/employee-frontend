import React from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const {user, logout}= useAuth()

  return (
    <div className="flex items-center justify-between h-16 bg-gradient-to-r from-blue-500 to-purple-500 p-4 shadow-lg text-white">
      <div className="text-2xl font-extrabold">
        Welcome, {user.name}!
      </div>
      <button
        className="flex items-center p-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition duration-300"
      >
        <FaSignOutAlt className="w-5 h-5 mr-2" onClick={logout}/>
        Logout
      </button>
    </div>
  );
};

export default Navbar;
