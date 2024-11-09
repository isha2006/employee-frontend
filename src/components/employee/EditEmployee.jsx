import { useEffect, useState } from 'react';
import { fetchDepartments } from '../../utils/EmployeeHelper';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditEmployee = () => {
  const [employee, setEmployee] = useState({
    name: '',
    maritalStatus: '',
    designation: '',
    salary: 0,
    department: ''
  })
  const [departments, setDepartments] = useState(null)
  const {id} = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments()
      setDepartments(departments)
    }
    getDepartments()
  }, [])

  useEffect(() => {
    const fetchEmployee = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/employee/${id}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (response.data.success) {
                const employee= response.data.employee
                setEmployee((prev)=> ({...prev, name: employee.userId.name, maritalStatus: employee.maritalStatus, designation: employee.designation, 
                    salary: employee.salary, department: employee.department}))
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.message)
            }
        }
    }
    fetchEmployee()
  }, [])

  const handleChange = (e) => {
    const { name, value} = e.target;
    setEmployee((prevData) => ({...prevData, [name]: value,}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.put(`http://localhost:8080/api/employee/${id}`, employee, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })
      if (response.data.success) {
        navigate('/admin-dashboard/employees')
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.message)
      }
    }
  };

  return (
    <>{departments && employee ? (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-4 bg-white rounded-lg mb-20 shadow-md">
        <h2 className="text-2xl mb-4 font-bold text-blue-600 text-center">Edit Employee</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 p-2 gap-4">
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name='name'
                value={employee.name}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="designation" className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
              <input
                type="text"
                name='designation'
                value={employee.designation}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
              <input
                type="number"
                name='salary'
                value={employee.salary}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="maritalStatus" className="block text-sm font-medium text-gray-700 mb-1">Marital Status</label>
              <select
                name='maritalStatus'
                value={employee.maritalStatus}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select Status</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <select
                name='department'
                value={employee.department}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select Department</option>
                {departments.map(dep => (
                  <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                ))}
              </select>
            </div>
            <div className="col-span-1 md:col-span-2">
              <button
                type="submit"
                className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Edit Employee
              </button>
            </div>
          </form>
      </div>
    </div>
    ) : <div>Fetching...</div>}</>
  );
};

export default EditEmployee;
