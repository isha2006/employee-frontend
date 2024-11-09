import { useNavigate } from "react-router-dom"

export const columns= [
    {
        name: "Sno",
        selector: (row)=> row.sno,
        width: '70px'
    },
    {
        name: "Emp Id",
        selector: (row)=> row.employeeId,
        sortable: true,
        width: '120px'
    },
    {
      name: "Name",
      selector: (row)=> row.name,
      width: '120px'
    },
    {
      name: "Leave Type",
      selector: (row)=> row.leaveType,
      width: '140px'
    },
    {
      name: "Department",
      selector: (row)=> row.department,
      width: '170px'
    },
    {
        name: "Days",
        selector: (row)=> row.days,
        width: '80px'
    },
    {
        name: "Status",
        selector: (row)=> row.status,
        width: '120px'
    },
    {
      name: "Action",
      selector: (row)=> row.action,
      center: 'true'
    }
]

export const LeaveButtons= ({id})=>{
    const navigate= useNavigate()
    return(
        <div className="flex space-x-4">
            <button className="bg-teal-500 text-white font-semibold py-2 px-4 rounded hover:bg-teal-600 transition"
            onClick={()=> navigate(`/admin-dashboard/leave/${id}`)}
            >View</button>
        </div>
    )
}