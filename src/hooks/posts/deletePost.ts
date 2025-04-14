import { useMutation, useQueryClient } from "@tanstack/react-query"
import useAxiosAuth from "../useAuth"

export const useDeletePost = () => {
    const axiosInstance = useAxiosAuth()
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['deletePost'],
        mutationFn: async (postId: string) => {
            const res = await axiosInstance.delete(`/social-media/posts/${postId}`)

            if (res.status !== 200) {
                throw new Error('Network response was not ok')
            }

            return res.data.data;
        },
        onSettled: () => {
            // 🚀 Invalidate and refetch all posts after successful upload
            queryClient.invalidateQueries({ queryKey: ['infinitePosts'] })
        },
    })
}