import axios from "axios"
import { useNavigate } from "react-router-dom"

export const columns= [
    {
        name: "Sno",
        selector: (row)=> row.sno
    },
    {
        name: "Department Name",
        selector: (row)=> row.dep_name,
        sortable: true
    },
    {
        name: "Action",
        selector: (row)=> row.action
    }
]

export const DepartmentButtons= ({id, onDepartmentDelete})=>{
    const navigate =useNavigate()

    const handleDelete= async(Id)=>{
        const confirm= window.confirm("Do you want to delete this?")
        if(confirm){
        try{
            const response= await axios.delete(`https://employee-backend-pink.vercel.app/api/department/${Id}`, {
              headers:{
                "Authorization" : `Bearer ${localStorage.getItem("token")}`
              }
            })
            if(response.data.success){
                onDepartmentDelete()
            }
        }catch(error){
            if(error.response && !error.response.data.success){
              alert(error.response.data.message)
            }
        }
    }
    }

    return(
        <div className="flex space-x-4">
            <button className="bg-teal-500 text-white font-semibold py-2 px-4 rounded hover:bg-teal-600 transition"
            onClick={()=>navigate(`/admin-dashboard/department/${id}`)}>Edit</button>
            <button className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded hover:bg-indigo-700 transition"
            onClick={()=>handleDelete(id)}>Delete</button>
        </div>
    )
}