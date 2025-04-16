import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAxiosAuth from '../useAuth'
import { FollowersResponse, FollowingResponse } from '@/types/Following';

/// useFollowUser.ts
export const useFollowUser = () => {
  const axiosInstance = useAxiosAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['followUser'],
    mutationFn: async (userId: string) => {
      const res = await axiosInstance.post(
        `/social-media/follow/${userId}`,
        {},
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (res.status !== 200) {
        throw new Error('Network response was not ok');
      }

      return res.data.data;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['followersList'] });
      queryClient.invalidateQueries({ queryKey: ['myProfile'] });
    },
  });
};



export const useGetUserFollowerList = (username: string) => {
  const axiosInstance = useAxiosAuth()
  return useQuery({
    queryKey: ['followersList'],
    queryFn: async () => {
      const res = await axiosInstance.get<FollowersResponse>(`/social-media/follow/list/followers/${username}`)
      if (res.status !== 200) {
        throw new Error('Network response was not ok')
      }
      return res.data.data.followers;
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
      return res.data.data.following;
    },

  })
}