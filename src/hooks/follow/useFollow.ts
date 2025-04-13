import { useMutation, useQueryClient } from '@tanstack/react-query'
import useAxiosAuth from '../useAuth'
import { useParams } from 'react-router-dom'

// This hook is used to post a comment on a post
export const useCommentPost = () => {
  const axiosInstance = useAxiosAuth()
  const queryClient = useQueryClient()
  const {postId} = useParams();
  return useMutation({
    mutationKey: ['commentPost'],
    mutationFn: async ({comment}:{comment:string}) => {
      const res = await axiosInstance.post(`/social-media/comments/post/${postId}`,{content:comment}, {
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
        queryClient.invalidateQueries({ queryKey: ['getComment'] })
      },
  })
}
