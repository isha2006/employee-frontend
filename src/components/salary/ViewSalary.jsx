import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {useAuth} from '../../context/AuthContext'
import axios from 'axios';

const ViewSalary = () => {
    const [salaries, setSalaries] = useState(null)
    const [filteredSalaries, setFilteredSalaries]= useState(null)
    const {id}= useParams()
    const {user}= useAuth()
    let sno = 1

    const fetchSalaries = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/salary/${id}/${user.role}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (response.data.success) {
                setSalaries(response.data.salary)
                setFilteredSalaries(response.data.salary)
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.message)
            }
        }
    }

    useEffect(() => {
        fetchSalaries()
    }, [])

    const handleFilter = (q)=>{
        const records= salaries.filter((leave)=>
        leave.employeeId.toLocaleLowerCase().includes(q.toLocaleLowerCase()))
        setFilteredSalaries(records)
      }

    return (
        <>{filteredSalaries === null ? (<div>Loading</div>) : (
        <div className="p-6 bg-white rounded-lg shadow-md mt-4">
            <h2 className="text-2xl font-bold mb-6 text-blue-600">Salary History</h2>
            <div className="flex items-center justify-between mb-4">
                <input
                    type="text"
                    placeholder="Search By Employee Id"
                    onChange={handleFilter}
                    className="p-2 border border-gray-300 rounded"
                />
            </div>

            {filteredSalaries.length>0 ? (
                <table className='w-full text-sm text-left text-gray-500'>
                    <thead className='text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200'>
                        <tr>
                            <th className='px-6 py-3'>SNO</th>
                            <th className='px-6 py-3'>Employee Id</th>
                            <th className='px-6 py-3'>Salary</th>
                            <th className='px-6 py-3'>Allowance</th>
                            <th className='px-6 py-3'>Deduction</th>
                            <th className='px-6 py-3'>Total</th>
                            <th className='px-6 py-3'>Pay Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSalaries.map((salary)=>(
                            <tr key={salary.id} className='bg-white border dark:border-gray-700'>
                                <td className='px-6 py-3'>{sno++}</td>
                                <td className='px-6 py-3'>{salary.employeeId.employeeId}</td>
                                <td className='px-6 py-3'>{salary.basicSalary}</td>
                                <td className='px-6 py-3'>{salary.allowances}</td>
                                <td className='px-6 py-3'>{salary.deductions}</td>
                                <td className='px-6 py-3'>{salary.netSalary}</td>
                                <td className='px-6 py-3'>{new Date(salary.payDate).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ): <div>No records</div>}
            </div>
            )}
        </>
    )
}

export default ViewSalary