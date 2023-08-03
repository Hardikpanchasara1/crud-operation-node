import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import React from 'react'

const useAuthenticatedUser = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const token = localStorage.getItem('token') // Get the token from local storage or a cookie
        console.log(token, 'from local')

        const isAuthenticated = token ? true : false // Check if token exists

        if (!isAuthenticated) {
          navigate('/login')
          console.log('User not logged in')
          toast.error('Please Login to access this resource')
        } else {
          console.log('User authenticated')
        }
      } catch (error) {
        console.error(error)
        navigate('/login')
      }
    }

    checkAuthentication()
  }, [navigate])

  return <Outlet />
}

export default useAuthenticatedUser
