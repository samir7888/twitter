
import { useQuery } from '@tanstack/react-query'
import useAxiosAuth from './useAuth';
// import { BASEURL } from '@/lib/constant';
import { UserProfileApiResponse } from '@/types/userProfile';


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

