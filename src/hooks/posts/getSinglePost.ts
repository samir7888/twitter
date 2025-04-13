import { useQuery } from "@tanstack/react-query";
import useAxiosAuth from "../useAuth";
import { IPostApiResponse } from "@/types/post";

export const useGetSinglePost = (postId: string) => {
    const axiosInstance = useAxiosAuth();
    return useQuery({
        queryKey: ['singlePost'],
        queryFn: async () => {

            try {
                const res = await axiosInstance.get<IPostApiResponse>(`/social-media/posts/${postId}`);
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
}