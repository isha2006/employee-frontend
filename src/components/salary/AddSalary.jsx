import { useEffect, useState } from 'react';
import { fetchDepartments, fetchEmployees} from '../../utils/EmployeeHelper';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddSalary = () => {
  const [salary, setSalary] = useState({
    employeeId: null,
    basicSalary: 0,
    allowances: 0,
    deductions: 0,
    payDate: null
  })
  const [departments, setDepartments] = useState(null)
  const [employees, setEmployees] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments()
      setDepartments(departments)
    }
    getDepartments()
  }, [])

  const handleChange = (e) => {
    const { name, value} = e.target;
    setSalary((prevData) => ({...prevData, [name]: value,}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(`https://employee-backend-pink.vercel.app/api/salary/add`, salary, {
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

  const handleDepartment= async(e)=>{
    const emps= await fetchEmployees(e.target.value)
    setEmployees(emps)
  }

  return (
    <>{departments ? (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-4 bg-white rounded-lg mb-20 shadow-md">
        <h2 className="text-2xl mb-4 font-bold text-blue-600 text-center">Add Salary</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 p-2 gap-4">
          <div className="mb-4">
              <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <select
                name='department'
                onChange={handleDepartment}
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
              <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700 mb-1">Employee Id</label>
              <select
                name='employeeId'
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select Employee Id</option>
                {employees.map(emp => (
                  <option key={emp._id} value={emp._id}>{emp.employeeId}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="allowances" className="block text-sm font-medium text-gray-700 mb-1">Allowances</label>
              <input
                type="number"
                name='allowances'
                placeholder='Monthly Allowances'
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="basicSalary" className="block text-sm font-medium text-gray-700 mb-1">Basic Salary</label>
              <input
                type="number"
                name='basicSalary'
                placeholder='Inser Salary'
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="deductions" className="block text-sm font-medium text-gray-700 mb-1">Deductions</label>
              <input
                type="number"
                name='deductions'
                placeholder='Monthly Deductions'
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="payDate" className="block text-sm font-medium text-gray-700 mb-1">Pay Date</label>
              <input
                type="date"
                name='payDate'
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="col-span-1 md:col-span-2">
              <button
                type="submit"
                className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Add Salary
              </button>
            </div>
          </form>
      </div>
    </div>
    ) : <div>Fetching...</div>}</>
  );
};

export default AddSalary;
