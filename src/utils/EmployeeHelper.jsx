import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const fetchDepartments= async()=>{
    let departments
    try{
      const response= await axios.get("https://employee-backend-pink.vercel.app/api/department", {
        headers:{
          "Authorization" : `Bearer ${localStorage.getItem("token")}`
        }
      })
      if(response.data.success){
        departments= response.data.departments
        }
    }catch(error){
      if(error.response && !error.response.data.success){
        alert(error.response.data.message)
        }
    }
    return departments
}

export const fetchEmployees = async (id) => {
  let employees
  try {
      const response = await axios.get(`https://employee-backend-pink.vercel.app/api/employee/department/${id}`, {
          headers: {
              "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
      })
      if (response.data.success) {
        employees= response.data.employees
      }
  } catch (error) {
      if (error.response && !error.response.data.success) {
          alert(error.response.data.message)
      }
  }
  return employees
}

export const columns= [
    {
        name: "Sno",
        selector: (row)=> row.sno,
        width: '90px'
    },
    {
        name: "Name",
        selector: (row)=> row.name,
        sortable: true,
        width: '130px'
    },
    {
      name: "Department",
      selector: (row)=> row.dep_name,
      width: '130px'
    },
    {
      name: "Image",
      selector: (row)=> row.profileImg,
      width: '120px'
    },
    {
      name: "DOB",
      selector: (row)=> row.dob,
      sortable: true,
      width: '130px'
    },
    {
      name: "Action",
      selector: (row)=> row.action,
      center: 'true'
    }
]

export const EmployeeButtons= ({id})=>{
  const navigate= useNavigate()
    return(
        <div className="flex space-x-4">
            <button className="bg-teal-500 text-white font-semibold py-2 px-4 rounded hover:bg-teal-600 transition"
            onClick={()=> navigate(`/admin-dashboard/employee/${id}`)}
            >View</button>
            <button className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded hover:bg-indigo-700 transition"
            onClick={()=> navigate(`/admin-dashboard/employee/edit/${id}`)}
            >Edit</button>
            <button className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600 transition"
            onClick={()=> navigate(`/admin-dashboard/employee/salary/${id}`)}
            >Salary</button>
            <button className="bg-yellow-600 text-white font-semibold py-2 px-4 rounded hover:bg-yellow-700 transition"
            onClick={()=> navigate(`/admin-dashboard/employee/leave/${id}`)}
            >Leaves</button>
        </div>
    )
}