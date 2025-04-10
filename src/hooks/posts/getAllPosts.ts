
import { useQuery } from '@tanstack/react-query'
import useAxiosAuth from '../useAuth';
import { IPostsApiResponse } from '@/types/post';


export const useGetPosts = () => {
    const axiosInstance = useAxiosAuth();
    return useQuery({
        queryKey: ['getAllPosts'],
        queryFn: async () => {
            try {
                const res = await axiosInstance.get<IPostsApiResponse>(`/social-media/posts`);
                if (res.status !== 200) {
                    throw new Error('Network response was not ok');
                }

                return res.data.data;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
    });
};