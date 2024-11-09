import axios from 'axios'
import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [error, setError] = useState(null)
const {login}= useAuth()
const navigate= useNavigate()

const handleSubmit= async(e)=>{
  e.preventDefault()
  try{
    const response= await axios.post("http://localhost:8080/api/auth/login", {email, password})
    if(response.data.success){
      login(response.data.user)
      localStorage.setItem("token", response.data.token)
      if(response.data.user.role === "admin"){
        navigate("/admin-dashboard")
      }else{
        navigate("/employee-dashboard")
      }
    }
  }catch(error){
    if(error.response && !error.response.data.success){
      setError(error.response.data.message)
    }else{
      setError("Server Error")
    }
  }
}

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="bg-white p-10 rounded-lg shadow-lg w-96">
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-8 text-center relative">
                    Employee Management System
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-300 to-purple-300 opacity-20 blur-md rounded-lg"></span>
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="email" className="block text-gray-700 mb-2 font-semibold">Email</label>
                        <input
                            type="email"
                            placeholder='Enter Email'
                            onChange={(e)=>{setEmail(e.target.value)}}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 mb-2 font-semibold">Password</label>
                        <input
                            type="password"
                            placeholder='Enter Password'
                            onChange={(e)=>{setPassword(e.target.value)}}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        />
                    </div>
                    {error && <p className='text-red-500 text-sm mb-3'>{error}</p>}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300 transform hover:scale-105 shadow-md"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-4 text-center text-gray-600">
                    <a href="#" className="text-blue-600 hover:underline">Forgot Password?</a>
                </p>
            </div>
        </div>
  )
}

export default Login