/* eslint-disable */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const ProtectedRoute = async () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users')
        console.log(response.data.user.role)

        if (response.data.user.role && response.data.user.role !== 'admin') {
          navigate('/login')
        }
      } catch (error) {
        console.error(error)
        navigate('/login')
        toast.error('User not access this Routes', {
          // position: toast.POSITION.TOP_CENTER,
        })
      }
    }

    fetchData()
  }, [navigate])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return <Outlet />
}

export default ProtectedRoute
