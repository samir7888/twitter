import { useAuth } from '@/context/AuthProvider'
import useAxiosAuth from '@/hooks/useAuth';
import React, {  useEffect, useState } from 'react'

const Persist = ({children}:{children:React.ReactNode}) => {
    const axiosInstance = useAxiosAuth();
    const [loading,setLoading] = useState(false);
    const {accessToken,setAccessToken}= useAuth();
    useEffect(() => {
        const refreshAuth= async()=>{

            try {
                setLoading(true);
                const res = await axiosInstance.post('/users/refresh', {}, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                setAccessToken(res.data.accessToken);
            } catch (error) {
                console.log(error);

            }finally{
                setLoading(false);
            }
        }
        if (!accessToken) {
            
            refreshAuth();
        }
    },[])
    if (loading) {
        return <div>loading...</div>
    }
  return children;
}

export default Persist