import { useInfiniteQuery } from '@tanstack/react-query';
import useAxiosAuth from '../useAuth';
import { IPostsResponse } from '@/types/post'; // <- NOT IPostsApiResponse

export const useInfinitePosts = () => {
  const axiosInstance = useAxiosAuth();

  return useInfiniteQuery<IPostsResponse>({
    queryKey: ['infinitePosts'],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosInstance.get(`/social-media/posts?page=${pageParam}&limit=4`);

      if (res.status !== 200) {
        throw new Error('Network response was not ok');
      }

      return res.data.data as IPostsResponse; // <- Ensures correct shape
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNextPage ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
  });
};
