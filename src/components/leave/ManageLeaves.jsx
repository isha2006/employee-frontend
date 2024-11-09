import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { columns, LeaveButtons } from '../../utils/LeaveHelper';
import axios from 'axios';

const ManageLeaves = () => {
    const [leaves, setLeaves] = useState(null)
    const [filteredLeaves, setFilteredLeaves] = useState(null)

    const fetchLeaves= async()=>{
        try {
            const response = await axios.get("http://localhost:8080/api/leave", {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (response.data.success) {
                let sno = 1
                const data = await response.data.leaves.map((leave) => ({
                    _id: leave._id,
                    sno: sno++,
                    employeeId: leave.employeeId.employeeId,
                    name: leave.employeeId.userId.name,
                    leaveType: leave.leaveType,
                    department: leave.employeeId.department.dep_name,
                    days: 
                    new Date(leave.toDate).getDate() - new Date(leave.fromDate).getDate(),
                    status: leave.status,
                    action: <LeaveButtons id={leave._id} />
                }))
                setLeaves(data)
                setFilteredLeaves(data)
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

    const filterByInput= (e)=>{
        const data= leaves.filter((leave)=> leave.employeeId.employeeId.includes(e.target.value))
        setFilteredLeaves(data)
    }

    const filterByButton= (status)=>{
        const data= leaves.filter((leave)=> leave.status.toLowerCase().includes(status.toLowerCase()))
        setFilteredLeaves(data)
    }
    

    return (
        <>
        {filteredLeaves ? (
        <div className="p-6 bg-white rounded-lg shadow-md mt-4">
            <div className='text-center'>
                <h2 className="text-2xl font-bold mb-6 text-blue-600">Manage Leaves</h2>
            </div>
            <div className="flex items-center justify-between">
                <input
                    type="text"
                    placeholder="Search By EmployeeId"
                    onChange={filterByInput}
                    className="px-4 py-2 w-1/3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div className="flex space-x-4">
                    <button
                        className="px-6 py-2 rounded-lg font-semibold text-white bg-blue-500 hover:bg-blue-600"
                        onClick={()=> filterByButton("approved")}
                    >
                        Approved
                    </button>
                    <button
                        className="px-6 py-2 rounded-lg font-semibold text-white bg-purple-500 hover:bg-purple-600"
                        onClick={()=> filterByButton("pending")}
                    >
                        Pending
                    </button>
                    <button
                        className="px-6 py-2 rounded-lg font-semibold text-white bg-red-500 hover:bg-red-600"
                        onClick={()=> filterByButton("rejected")}
                    >
                        Rejected
                    </button>
                </div>
            </div>
            <div className='mt-3'>
            <DataTable columns={columns} data={filteredLeaves} pagination/>
            </div>
        </div>
    ) : 
    <div>Loading...</div>}
    </>
    );
};

export default ManageLeaves;
