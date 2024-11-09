import axios from "axios"
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddDepartment = () => {
  const [department, setDepartment] = useState({
    dep_name:"",
    description:""
  });

  const navigate= useNavigate()

  const handleChange= (e)=>{
    const {name, value}= e.target
    setDepartment({...department, [name]:value})
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const response= await axios.post("http://localhost:8080/api/department/add", department, {
        headers:{
          "Authorization" : `Bearer ${localStorage.getItem("token")}`
        }
      })
      if(response.data.success){
        navigate("/admin-dashboard/departments")
      }
    }catch(error){
      if(error.response && !error.response.data.success){
        alert(error.response.data.message)
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg mb-20 shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-blue-600 text-center">Add Department</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="dep_name" className="block text-sm font-medium text-gray-700 mb-1">Department Name</label>
            <input
              type="text"
              name='dep_name'
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name='description'
              onChange={handleChange}
              rows="4"
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="ml-32 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Add Department
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDepartment;
