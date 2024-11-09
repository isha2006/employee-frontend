import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Setting = () => {
    const { user } = useAuth()
    const [setting, setSetting] = useState({
        userId: user._id,
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    
    const [error, setError] = useState('');
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSetting({ ...setting, [name]: value, });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const { oldPassword, newPassword, confirmPassword } = setting;

        if (!oldPassword || !newPassword || !confirmPassword) {
            setError('All fields are required.');
            return;
        }
        if (newPassword !== confirmPassword) {
            setError('New password and confirm password do not match.');
            return;
        } else {
            try {
                const response = await axios.put("https://employee-backend-pink.vercel.app/api/setting/change-password", setting, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                })
                if (response.data.success) {
                    navigate("/admin-dashboard/employees")
                    setError("")
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    setError(error.response.data.message)
                } else {
                    setError("Server Error")
                }
            }
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center ">
            <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg mb-20">
                <h2 className="text-2xl font-semibold text-center text-purple-700 mb-6">Change Your Password</h2>

                <form onSubmit={handleSubmit}>
                    {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

                    <div className="mb-4">
                        <label htmlFor="oldPassword" className="block text-lg font-medium text-blue-800">Old Password</label>
                        <input
                            type="password"
                            name="oldPassword"
                            onChange={handleChange}
                            className="mt-2 w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter your old password"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="newPassword" className="block text-lg font-medium text-blue-800">New Password</label>
                        <input
                            type="password"
                            name="newPassword"
                            onChange={handleChange}
                            className="mt-2 w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter your new password"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-lg font-medium text-blue-800">Confirm New Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            onChange={handleChange}
                            className="mt-2 w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Confirm your new password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-lg hover:from-blue-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                    >
                        Change Password
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Setting