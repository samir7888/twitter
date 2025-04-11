import { useMutation, useQueryClient } from '@tanstack/react-query'
import useAxiosAuth from '../useAuth'

export const useUploadPost = () => {
  const axiosInstance = useAxiosAuth()
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['uploadPost'],
    mutationFn: async (formData: FormData) => {
      const res = await axiosInstance.post(`/social-media/posts`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      if (res.status !== 200) {
        throw new Error('Network response was not ok')
      }

      return res.data.data;
    },
    onSettled: () => {
        // 🚀 Invalidate and refetch all posts after successful upload
        queryClient.invalidateQueries({ queryKey: ['getAllPosts'] })
      },
  })
}
