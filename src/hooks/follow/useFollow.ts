import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAxiosAuth from '../useAuth'
import { FollowersResponse, FollowingResponse } from '@/types/Following';

// This hook is used to post a comment on a post
export const useFollowUser = (toBeFollowedUserId: string) => {
  const axiosInstance = useAxiosAuth()
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['followUser'],
    mutationFn: async () => {
      const res = await axiosInstance.post(`/social-media/follow/${toBeFollowedUserId}`, {}, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (res.status !== 200) {
        throw new Error('Network response was not ok')
      }

      return res.data.data;
    },
    onSettled: () => {
      // 🚀 Invalidate and refetch all posts after successful upload
      queryClient.invalidateQueries({ queryKey: ['followersList'] })
    },
  })
}



export const useGetUserFollowerList = (username: string) => {
  const axiosInstance = useAxiosAuth()
  return useQuery({
    queryKey: ['followersList'],
    queryFn: async () => {
      const res = await axiosInstance.get<FollowersResponse>(`/social-media/follow/list/followers/${username}`)
      if (res.status !== 200) {
        throw new Error('Network response was not ok')
      }
      return res.data.data
    },

  })
}


export const useGetUserFollowingList = (username: string) => {
  const axiosInstance = useAxiosAuth()
  return useQuery({
    queryKey: ['followingList'],
    queryFn: async () => {
      const res = await axiosInstance.get<FollowingResponse>(`/social-media/follow/list/following/${username}`)
      if (res.status !== 200) {
        throw new Error('Network response was not ok')
      }
      return res.data.data
    },

  })
}