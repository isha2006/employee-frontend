import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaPlus } from 'react-icons/fa';
import DataTable from 'react-data-table-component'
import axios from 'axios';
import { columns, EmployeeButtons } from '../../utils/EmployeeHelper';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([])
    const [filteredEmployees, setFilteredEmployees]= useState([])

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get("https://employee-backend-pink.vercel.app/api/employee", {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                })
                if (response.data.success) {
                    let sno = 1
                    const data = await response.data.employees.map((emp) => ({
                        _id: emp._id,
                        sno: sno++,
                        dep_name: emp.department.dep_name,
                        name: emp.userId.name,
                        dob: new Date(emp.dob).toLocaleDateString(),
                        profileImg: <img width={60} className='rounded-full' src={`https://employee-backend-pink.vercel.app/${emp.userId.profileImg}`}/>,
                        action: <EmployeeButtons id={emp._id} />
                    }))
                    setEmployees(data)
                    setFilteredEmployees(data)
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.message)
                }
            }
        }
        fetchEmployees()
    }, [])

    const handleFilter = async(e)=>{
        const records= employees.filter((emp)=>
        emp.name.toLowerCase().includes(e.target.value.toLowerCase()))
        setFilteredEmployees(records)
      }

    return (
        <div className="p-6 bg-white rounded-lg shadow-md mt-4">
            <h2 className="text-2xl font-bold mb-6 text-blue-600">Manage Employees</h2>
            <div className="flex items-center justify-between mb-4">
                <Link
                    to="/admin-dashboard/add-employee"
                    className="flex items-center p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                >
                    <FaPlus className="mr-2" />
                    Add New Employee
                </Link>
                <input
                    type="text"
                    placeholder="Search Employee"
                    onChange={handleFilter}
                    className="p-2 border border-gray-300 rounded"
                />
            </div>
            <div>
                <DataTable columns={columns} data={filteredEmployees} pagination/>
            </div>
        </div>
    )
}

export default EmployeeList