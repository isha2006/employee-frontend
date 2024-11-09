import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const LeaveDetail = () => {
    const { id } = useParams()
    const [leave, setLeave] = useState(null)
    const navigate= useNavigate()

    const fetchLeave= async()=>{
        try {
            const response = await axios.get(`https://employee-backend-pink.vercel.app/api/leave/detail/${id}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (response.data.success) {
                setLeave(response.data.leave)
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.message)
            }
        }
    }

    useEffect(() => {
        fetchLeave()
    }, [])

    const changeStatus= async(id, status)=>{
        try {
            const response = await axios.put(`https://employee-backend-pink.vercel.app/api/leave/${id}`, {status}, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (response.data.success) {
                navigate('/admin-dashboard/leaves')
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.message)
            }
        }
    }

  return (
    <>{leave ? (
        <div className='p-20'>
            <div className="h-96 bg-purple-50 shadow-md rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex justify-center items-center h-full">
                    <img
                        src={`https://employee-backend-pink.vercel.app/${leave.employeeId.userId.profileImg}`}
                        alt=''
                        className="w-60 h-60 rounded-full border-4 border-blue-400"
                    />
                </div>
                <div className="flex flex-col justify-center h-full">
                    <h2 className="text-2xl font-bold text-blue-700 mb-2">{leave.employeeId.userId.name}</h2>
                    <div className="mb-2">
                        <strong>Employee ID:</strong> {leave.employeeId.employeeId}
                    </div>
                    <div className="mb-2">
                        <strong>Leave Type:</strong> {leave.leaveType}
                    </div>
                    <div className="mb-2">
                        <strong>Description:</strong> {leave.description}
                    </div>
                    <div className="mb-2">
                        <strong>Department:</strong> {leave.employeeId.department.dep_name}
                    </div>
                    <div className="mb-2">
                        <strong>From Date:</strong> {new Date(leave.fromDate).toLocaleDateString()}
                    </div>
                    <div className="mb-2">
                        <strong>To Date:</strong> {new Date(leave.toDate).toLocaleDateString()}
                    </div>
                    <div className="mb-2 flex gap-2">
                        <strong>{leave.status==="pending"? "Action" : "Status"}</strong> {leave.status==="pending" ? (<div className='flex space-x-2'>
                            <button className='px-4 py-1 rounded-lg font-medium text-white bg-blue-500 hover:bg-blue-600'
                            onClick={()=> changeStatus(leave._id, "approved")}
                            >Approve</button>
                            <button className='px-4 py-1 rounded-lg font-medium text-white bg-red-500 hover:bg-red-600'
                            onClick={()=> changeStatus(leave._id, "rejected")}
                            >Reject</button>
                        </div>) : <>{leave.status}</>}
                    </div>
                </div>
            </div>
        </div>
    ) :
        <div>Fetching...</div>}</>
  )
}

export default LeaveDetail