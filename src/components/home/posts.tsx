
import { useInfinitePosts } from "@/hooks/posts/getAllPosts";
import { PostCard } from "./PostCard";
import { useEffect, useRef } from "react";

export const Posts = () => {
  const {
    data,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useInfinitePosts();

  const observerRef = useRef<HTMLDivElement | null>(null);

  // Scroll observer logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    const current = observerRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const allPosts = data?.pages.flatMap((page) => page.posts) || [];

  return (
    <div className="flex flex-col divide-y divide-gray-200">
      {isLoading && (
        <div className="py-10 text-center text-gray-500">Loading posts...</div>
      )}

      {allPosts.length === 0 && !isLoading ? (
        <div className="py-10 text-center text-gray-500">No posts found</div>
      ) : (
        allPosts.map((post) => <PostCard key={post._id} post={post} />)
      )}

      {isFetchingNextPage && (
        <div className="flex justify-center items-center py-6">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* Trigger for infinite scroll */}
      {allPosts.length > 0 && <div ref={observerRef} className="h-10" />}
    </div>
  );
};
