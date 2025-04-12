import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import useAxiosAuth from '../useAuth'
import { useParams } from 'react-router-dom'
import { CommentResponse } from '@/types/comment'

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
        queryClient.invalidateQueries({ queryKey: ['postComment'] })
      },
  })
}



// This hook is used to get the comments of a post
export const useGetPostComment = () => {
  const axiosInstance = useAxiosAuth()
  const {postId} = useParams();
  return useQuery({
    queryKey: ['getComment'],
    queryFn: async () => {
      const res = await axiosInstance.get<CommentResponse>(`/social-media/comments/post/${postId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (res.status !== 200) {
        throw new Error('Network response was not ok')
      }

      return res.data.data;
    },
   
  })
}

//to like and unlike a comment
export const useLikeComment = () => {
  const axiosInstance = useAxiosAuth()
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['getComment'],
    mutationFn: async ({commentId}:{commentId:string}) => {
      const res = await axiosInstance.post(`/social-media/like/comment/${commentId}`,{}, {
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