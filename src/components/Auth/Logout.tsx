import useAxiosAuth from '@/hooks/useAuth';
import React from 'react'
import { Button } from '../ui/button';

const Logout = () => {
  const axiosInstance = useAxiosAuth();
    return (
    <Button className='bg-red-700' onClick={async()=>{
        const res = await axiosInstance.post('/users/logout');
        if (res.status === 200) {
       localStorage.clear()
            window.location.href = '/login'

        } else {
            console.log('Logout failed')
        }
    }}>Logout</Button>
  )
}

export default Logout