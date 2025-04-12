import { useMutation, useQueryClient } from '@tanstack/react-query'
import useAxiosAuth from '../useAuth'

export const useLikePost
    = () => {
        const axiosInstance = useAxiosAuth()
        const queryClient = useQueryClient()
        return useMutation({
            mutationKey: ['commentPost'],
            mutationFn: async ({ postId }: { postId: string }) => {
                const res = await axiosInstance.post(`/social-media/like/post/${postId}`,{},{
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
                queryClient.invalidateQueries({ queryKey: ['getAllPosts'] })
            },
            
        })
    }
