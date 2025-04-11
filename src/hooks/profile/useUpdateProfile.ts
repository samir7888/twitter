type UserProfile = {
  bio?: string
  countryCode?: string
  dob?: string // or Date if you plan to parse it
  firstName: string
  lastName: string
  location?: string
  phoneNumber?: string
}


import { useMutation, useQueryClient } from '@tanstack/react-query'
import { UserProfileApiResponse } from '@/types/userProfile';
import useAxiosAuth from '../useAuth'


export const useUpdateMyProfile = () => {

  const queryClient = useQueryClient()
  const axiosInstance = useAxiosAuth();
  return useMutation({
    mutationKey: ['myProfile'],
    mutationFn: async ({ params }: { params: UserProfile }) => {
      const res = await axiosInstance.patch<UserProfileApiResponse>(`/social-media/profile`, { params });
      if (res.status !== 200) {
        throw new Error('Network response was not ok');
      }
      console.log(res.data)
      return res.data.data;
    },
    onSettled: () => {
      // 🚀 Invalidate and refetch all posts after successful upload
      queryClient.invalidateQueries({ queryKey: ['myProfile'] })
    },
  },

  )

}
