
import { useQuery } from '@tanstack/react-query'
import { UserProfileApiResponse } from '@/types/userProfile';
import useAxiosAuth from '../useAuth';
import { IPostsApiResponse } from '@/types/post';


export const useGetUserProfile = (username: string) => {
    const axiosInstance = useAxiosAuth();
    return useQuery({
        queryKey: ['userProfile'],
        queryFn: async () => {
            const res = await axiosInstance.get<UserProfileApiResponse>(`/social-media/profile/u/${username}`);
            if (res.status !== 200) {
                throw new Error('Network response was not ok');
            }
            console.log(res.data)
            return res.data.data;
        }
    })
}
export const useGetUserPost = (username: string) => {
    const axiosInstance = useAxiosAuth();
    return useQuery({
        queryKey: ['userPost'],
        queryFn: async () => {
            const res = await axiosInstance.get<IPostsApiResponse>(`/social-media/posts/get/u/${username}`);
            if (res.status !== 200) {
                throw new Error('Network response was not ok');
            }
            console.log(res.data)
            return res.data.data;
        }
    })
}

