import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import DataTable from 'react-data-table-component'
import { columns, DepartmentButtons } from '../../utils/DepartmentHelper';
import axios from 'axios';

const DepartmentList = () => {
  const [departments, setDepartments] = useState([])
  const [filteredDepartments, setFilteredDepartments]= useState([])

  const onDepartmentDelete= ()=>{
    fetchDepartments()
  }

  const filterDepartments = async(e)=>{
    const records= departments.filter((dep)=>
    dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase()))
    setFilteredDepartments(records)
  }

  const fetchDepartments= async()=>{
    try{
      const response= await axios.get("http://localhost:8080/api/department", {
        headers:{
          "Authorization" : `Bearer ${localStorage.getItem("token")}`
        }
      })
      if(response.data.success){
        let sno=1
        const data= await response.data.departments.map((dep)=>({
          _id:dep._id,
          sno: sno++,
          dep_name: dep.dep_name,
          action: <DepartmentButtons id={dep._id} onDepartmentDelete={onDepartmentDelete}/>
        }))
        setDepartments(data)
        setFilteredDepartments(data)
      }
    }catch(error){
      if(error.response && !error.response.data.success){
        alert(error.response.data.message)
      }
    }
  }

  useEffect(() => {
    fetchDepartments()
  }, [])
  

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mt-4">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">Manage Departments</h2>
      <div className="flex items-center justify-between mb-4">
        <Link 
          to="/admin-dashboard/add-department" 
          className="flex items-center p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
        >
          <FaPlus className="mr-2" />
          Add New Department
        </Link>
        <input
          type="text"
          placeholder="Search Department"
          onChange={filterDepartments}
          className="p-2 border border-gray-300 rounded"
        />
      </div>
      <div>
        <DataTable columns={columns} data={filteredDepartments} pagination/>
      </div>
    </div>
  );
};

export default DepartmentList;
