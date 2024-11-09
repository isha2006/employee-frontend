import React from 'react';
import { FaUsers } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const Summary = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center mt-6 justify-center p-6 bg-gradient-to-r from-purple-400 to-blue-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="w-12 h-12 mb-3 flex items-center justify-center bg-blue-600 rounded-full shadow-md">
        <FaUsers className="text-2xl" />
      </div>
      <h3 className="text-xl font-semibold mb-1">Welcome Back,</h3>
      <p className="text-4xl font-extrabold">{user.name}</p>
    </div>
  );
};

export default Summary;
