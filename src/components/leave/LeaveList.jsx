import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FaPlus } from 'react-icons/fa'
import {useAuth} from '../../context/AuthContext'

const LeaveList = () => {
    const [leaves, setLeaves] = useState([])
    const {id}= useParams()
    const {user}= useAuth()
    let sno = 1

    const fetchLeaves = async () => {
        try {
            const response = await axios.get(`https://employee-backend-pink.vercel.app/api/leave/${id}/${user.role}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (response.data.success) {
                setLeaves(response.data.leave)
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.message)
            }
        }
    }

    useEffect(() => {
        fetchLeaves()
    }, [])

    if(!leaves){
        return <div>Loading...</div>
    }

    return (
        <div className="p-6 bg-white rounded-lg shadow-md mt-4">
            <h2 className="text-2xl font-bold mb-6 text-blue-600">Manage Leaves</h2>
            <div className="flex items-center justify-between mb-4">
                {user.role==="employee" && (
                <Link
                    to="/employee-dashboard/add-leave"
                    className="flex items-center p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                >
                    <FaPlus className="mr-2" />
                    Add New Leave
                </Link>
            )}
                <input
                    type="text"
                    placeholder="Search Leaves"
                    className="p-2 border border-gray-300 rounded"
                />
            </div>
            <table className='w-full text-sm text-left text-gray-500'>
                    <thead className='text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200'>
                        <tr>
                            <th className='px-6 py-3'>SNO</th>
                            <th className='px-6 py-3'>Leave Type</th>
                            <th className='px-6 py-3'>From</th>
                            <th className='px-6 py-3'>To</th>
                            <th className='px-6 py-3'>Description</th>
                            <th className='px-6 py-3'>Applied Date</th>
                            <th className='px-6 py-3'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaves.map((leave)=>(
                            <tr key={leave._id} className='bg-white border dark:border-gray-700'>
                                <td className='px-6 py-3'>{sno++}</td>
                                <td className='px-6 py-3'>{leave.leaveType}</td>
                                <td className='px-6 py-3'>{new Date(leave.fromDate).toLocaleDateString()}</td>
                                <td className='px-6 py-3'>{new Date(leave.toDate).toLocaleDateString()}</td>
                                <td className='px-6 py-3'>{leave.description}</td>
                                <td className='px-6 py-3'>{new Date(leave.appliedAt).toLocaleDateString()}</td>
                                <td className='px-6 py-3'>{leave.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
        </div>
    )
}

export default LeaveList