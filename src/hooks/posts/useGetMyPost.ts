import { useQuery } from "@tanstack/react-query"
import useAxiosAuth from '../useAuth';

export const useGetMyPost = () => {
    const axiosInstance = useAxiosAuth()
    return useQuery({

        queryKey: ['myPosts'],
        queryFn: async () => {
            const res = await axiosInstance.get(`social-media/posts/get/my`)
            if (res.status !== 200) {
                throw new Error('Network response was not ok')
            }
            return res.data.data;
        },

    }
    )
}