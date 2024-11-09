import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddLeave = () => {
    const { user } = useAuth()
    const [leave, setLeave] = useState({
        userId: user._id,
    });
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLeave((prevData) => ({ ...prevData, [name]: value, }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(`http://localhost:8080/api/leave/add`, leave, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (response.data.success) {
                navigate(`/employee-dashboard/leaves/${user._id}`)
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.message)
            }
        }
    }

    return (
        <div className="mt-20 min-h-screen bg-gray-100">
            <div className="w-full max-w-4xl  mx-auto p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-purple-600 mb-4">Request for Leave</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="leaveType" className="block text-gray-700 mb-2">Leave Type:</label>
                            <select
                                name="leaveType"
                                onChange={handleChange}
                                required
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                <option value="">Select Leave Type</option>
                                <option value="sick">Sick Leave</option>
                                <option value="casual">Casual Leave</option>
                                <option value="annual">Annual Leave</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="fromDate" className="block text-gray-700 mb-2">From Date:</label>
                            <input
                                type="date"
                                name="fromDate"
                                onChange={handleChange}
                                required
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="toDate" className="block text-gray-700 mb-2">To Date:</label>
                            <input
                                type="date"
                                name="toDate"
                                onChange={handleChange}
                                required
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-gray-700 mb-2">Description:</label>
                            <textarea
                                name="description"
                                placeholder="Add reason"
                                onChange={handleChange}
                                required
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                rows="4"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-purple-600 text-white font-semibold py-2 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        Add Leave
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddLeave