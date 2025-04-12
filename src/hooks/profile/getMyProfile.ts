
import {  useQuery } from '@tanstack/react-query'
import { UserProfileApiResponse } from '@/types/userProfile';
import useAxiosAuth from '../useAuth';


export  const useGetMyProfile = () => {
    const axiosInstance = useAxiosAuth();
  return useQuery({
    queryKey: ['myProfile'],
    queryFn: async () => {
      const res = await axiosInstance.get<UserProfileApiResponse>(`/social-media/profile`);
        if (res.status !== 200) {
            throw new Error('Network response was not ok');
        }
        console.log(res.data)
        return res.data.data;
    }
  })
}

