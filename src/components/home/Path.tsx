import { useGetMyPost } from '@/hooks/posts/useGetMyPost'

import { PostCard } from './PostCard';
import { Post } from '@/types/post';

const Path = () => {
    const {data,isPending} = useGetMyPost();
   
    if (!data && isPending) {
        return (
            <div className='flex justify-center items-center h-64'>
                <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
            </div>
        )
        
    }
  
  return (
    <div>
       {data?.totalPosts > 0 ? (data.posts.map((post: Post) => {
         return <PostCard post={post} key={post._id}/>
       } )): <div className='text-center text-gray-500'>No posts found</div>}
    </div>
  )
}

export default Path