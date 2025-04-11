import { useGetPosts } from "@/hooks/posts/getAllPosts";
import { Post } from "@/types/post";

import { PostCard } from "./PostCard";

export const Posts = () => {
  
  const { data, isPending } = useGetPosts();
  if (isPending) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
    const posts = (data?.posts as Post[]) || [];
    console.log(data?.posts);
  return (
    <div className="flex flex-col divide-y divide-gray-200">
      {posts.length === 0 ? (
        <div className="py-10 text-center text-gray-500">No posts found</div>
      ) : (
        posts.map((post) => <PostCard key={post._id} post={post} />)
      )}
    </div>
  );
};
