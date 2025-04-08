type UserProfile = {
    bio: string
    countryCode: string
    dob: string // or Date if you plan to parse it
    firstName: string
    lastName: string
    location: string
    phoneNumber: string
  }
  

import { useMutation } from '@tanstack/react-query'
import useAxiosAuth from './useAuth';
import { BASEURL } from '@/lib/constant';
import { UserProfileApiResponse } from '@/types/userProfile';


export const useGetMyProfile = ({params}:{params : UserProfile}) => {
    const axiosInstance = useAxiosAuth();
    return useMutation({
        mutationKey: ['myProfile'],
        mutationFn: async () => {
            const res = await axiosInstance.patch<UserProfileApiResponse>(`${BASEURL}/social-media/profile`,{params});
            if (res.status !== 200) {
                throw new Error('Network response was not ok');
            }
            console.log(res.data)
            return res.data.data;
        }
    })
}
