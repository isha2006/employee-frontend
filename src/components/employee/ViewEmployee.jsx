import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const ViewEmployee = () => {
    const { id } = useParams()
    const [employee, setEmployee] = useState(null)

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`https://employee-backend-pink.vercel.app/api/employee/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                })
                if (response.data.success) {
                    setEmployee(response.data.employee)
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.message)
                }
            }
        }
        fetchEmployee()
    }, [])

    return (
        <>{employee ? (
            <div className='p-20'>
                <div className="h-96 bg-purple-50 shadow-md rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex justify-center items-center h-full">
                        <img
                            src={`https://employee-backend-pink.vercel.app/${employee.userId.profileImg}`}
                            alt=''
                            className="w-60 h-60 rounded-full border-4 border-blue-400"
                        />
                    </div>
                    <div className="flex flex-col justify-center h-full">
                        <h2 className="text-2xl font-bold text-blue-700 mb-2">{employee.userId.name}</h2>
                        <div className="mb-2">
                            <strong>Employee ID:</strong> {employee.employeeId}
                        </div>
                        <div className="mb-2">
                            <strong>Gender:</strong> {employee.gender}
                        </div>
                        <div className="mb-2">
                            <strong>Designation:</strong> {employee.designation}
                        </div>
                        <div className="mb-2">
                            <strong>Email:</strong> {employee.userId.email}
                        </div>
                        <div className="mb-2">
                            <strong>Date of Birth:</strong> {new Date(employee.dob).toLocaleDateString()}
                        </div>
                        <div className="mb-2">
                            <strong>Marital Status:</strong> {employee.maritalStatus}
                        </div>
                        <div className="mb-2">
                            <strong>Department:</strong> {employee.department.dep_name}
                        </div>
                    </div>
                </div>
            </div>
        ) :
            <div>Fetching...</div>}</>
    );
}

export default ViewEmployee