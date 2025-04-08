
import { useQuery } from '@tanstack/react-query'
// import {axiosInstance} from '@/hooks/index'
import { BASEURL } from '@/lib/constant';

import useAxiosAuth from './useAuth';
export const fetchPosts = async (axiosInstance: any) => {
    try {
        const response = await axiosInstance.get(`${BASEURL}/social-media/posts`);
        console.log(response.data)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const useGetPosts = () => {
    const axiosInstance = useAxiosAuth();
    return useQuery({
        queryKey: ['posts'],
        queryFn: () => fetchPosts(axiosInstance),
    });
};