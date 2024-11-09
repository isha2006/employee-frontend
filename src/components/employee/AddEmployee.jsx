import { useEffect, useState } from 'react';
import { fetchDepartments } from '../../utils/EmployeeHelper';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
  const [departments, setDepartments] = useState([])
  const [formData, setFormData] = useState({});

  const navigate = useNavigate()

  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments()
      setDepartments(departments)
    }
    getDepartments()
  }, [])

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData()
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key])
    })
    
    try {
      const response = await axios.post("http://localhost:8080/api/employee/add", formDataObj, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })
      if (response.data.success) {
        navigate("/admin-dashboard/employees")
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.message)
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-4 bg-white rounded-lg mb-20 shadow-md">
        <h2 className="text-2xl mb-4 font-bold text-blue-600 text-center">Add Employee</h2>
        <div className="max-h-96 overflow-y-auto">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 p-2 gap-4">
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name='name'
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
              <input
                type="text"
                name='employeeId'
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select
                name='gender'
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="designation" className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
              <input
                type="text"
                name='designation'
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
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <input
                type="text"
                name='role'
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name='email'
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
              <input
                type="date"
                name='dob'
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="maritalStatus" className="block text-sm font-medium text-gray-700 mb-1">Marital Status</label>
              <select
                name='maritalStatus'
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
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                name='password'
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
              <input
                type="file"
                name='image'
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="col-span-1 md:col-span-2">
              <button
                type="submit"
                className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Add Employee
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
