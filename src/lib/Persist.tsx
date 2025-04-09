import { useAuth } from '@/context/AuthProvider'
import useAxiosAuth from '@/hooks/useAuth'
import React, { useEffect, useState } from 'react'

interface Props {
  children: React.ReactNode
}

const Persist: React.FC<Props> = ({ children }) => {
  const axiosInstance = useAxiosAuth()
  const [loading, setLoading] = useState(true) // default true so we wait for token check
  const { accessToken, setAccessToken, refreshToken } = useAuth()
const rememberMe = localStorage.getItem('rememberMe') === 'true' || false; 

  useEffect(() => {

    const refreshAuth = async () => {
      try {
        const res = await axiosInstance.post(
          '/users/refresh',
          {},
          {
            withCredentials: true,
          }
        )

        setAccessToken(res.data.accessToken)
      } catch (error) {
        console.error('Error refreshing token:', error)
      } finally {
        setLoading(false)
      }
    }

    if (rememberMe && !accessToken && refreshToken) {
      refreshAuth()
    } else {
      setLoading(false) // no refresh needed
   
    }
  }, [accessToken, refreshToken, setAccessToken, axiosInstance,rememberMe])

  if (loading) {
    return <div>Loading...</div>
  }

  return <>{children}</>
}

export default Persist
