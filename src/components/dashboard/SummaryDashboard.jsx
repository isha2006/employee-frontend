import React, { useEffect, useState } from 'react';
import { FaUsers, FaBuilding, FaDollarSign, FaClipboardCheck, FaClipboardList, FaClock, FaBan } from 'react-icons/fa';
import axios from 'axios'
import SummaryCard from './SummaryCard';

const SummaryDashboard = () => {
  const [summary, setSummary] = useState(null)

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get("https://employee-backend-pink.vercel.app/api/dashboard/summary", {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        })
        if (response.data.success) {
          setSummary(response.data)
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.message)
        }
      }
    }
    fetchSummary()
  }, [])

  if(!summary){
    return <div>Loading...</div>
  }

  return (
    <div className="p-8 bg-white h-screen shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">Dashboard Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <SummaryCard
          icon={<FaUsers />}
          title="Total Employees"
          value={summary.totalEmployees}
          gradientClass="bg-gradient-to-r from-blue-400 to-blue-600"
        />
        <SummaryCard
          icon={<FaBuilding />}
          title="Total Departments"
          value={summary.totalDepartments}
          gradientClass="bg-gradient-to-r from-purple-400 to-purple-600"
        />
        <SummaryCard
          icon={<FaDollarSign />}
          title="Monthly Pay"
          value={summary.totalSalary}
          gradientClass="bg-gradient-to-r from-green-400 to-green-600"
        />
      </div>

      <h2 className="text-2xl font-bold mb-6 text-blue-600">Leave Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <SummaryCard
          icon={<FaClipboardList />}
          title="Leave Applied"
          value={summary.leaveSummary.appliedFor}
          gradientClass="bg-gradient-to-r from-yellow-400 to-yellow-600"
        />
        <SummaryCard
          icon={<FaClipboardCheck />}
          title="Leave Approved"
          value={summary.leaveSummary.approved}
          gradientClass="bg-gradient-to-r from-teal-400 to-teal-600"
        />
        <SummaryCard
          icon={<FaClock />}
          title="Leave Pending"
          value={summary.leaveSummary.pending}
          gradientClass="bg-gradient-to-r from-orange-400 to-orange-600"
        />
        <SummaryCard
          icon={<FaBan />}
          title="Leave Rejected"
          value={summary.leaveSummary.rejected}
          gradientClass="bg-gradient-to-r from-red-400 to-red-600"
        />
      </div>
    </div>
  );
};

export default SummaryDashboard;
