import { useInfiniteQuery } from '@tanstack/react-query';
import useAxiosAuth from '../useAuth';
import { IPostsApiResponse } from '@/types/post';

export const useInfinitePosts = () => {
  const axiosInstance = useAxiosAuth();

  return useInfiniteQuery({
    queryKey: ['infinitePosts'],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosInstance.get<IPostsApiResponse>(
        `/social-media/posts?page=${pageParam}&limit=4`
      );

      if (res.status !== 200) {
        throw new Error('Network response was not ok');
      }

      return res.data.data;
    },
    getNextPageParam: (lastPage: { hasNextPage: boolean }, allPages) => {
      return lastPage.hasNextPage ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
  });
};
