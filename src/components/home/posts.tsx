import { useAuth } from '@/context/AuthProvider';
import { useGetPosts } from '@/hooks/getAllPosts';
import { Heart, MessageCircle, Bookmark, Share2 } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Posts = () => {
  const { data, isPending } = useGetPosts();
  
  const posts = data?.posts || [];
console.log(posts)
  if (isPending) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  return (
    <div className="flex flex-col divide-y divide-gray-200">
      {posts.length === 0 ? (
        <div className="py-10 text-center text-gray-500">No posts found</div>
      ) : (
        posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))
      )}
    </div>
  );
};

const PostCard = ({ post }) => {
  const username = localStorage.getItem("username")  || "User";

  const {user}= useAuth();
  const { 
    content, 
     
    createdAt, 
    likes, 
    comments, 
    isLiked, 
    isBookmarked,
    images,
    
  } = post;
  
  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
const navigate = useNavigate()
  return (
    <div className="p-4 text-white">
      <div className="flex space-x-3">
        {/* Avatar */}
        <div onClick={()=>navigate(`/${username}`)} className="flex-shrink-0">
          <img 
            src={'https://avatar.iran.liara.run/public'} 
            alt={`${user?.firstName} ${user?.lastName}`}
            className="h-12 w-12 rounded-full"
          />
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Author info */}
          <div className="flex items-center mb-1">
            <span className="font-bold text-white-900">{user?.firstName} {user?.lastName}</span>
            <span className="ml-1 text-gray-400">@{username}</span>
            <span className="mx-1 text-gray-500">·</span>
            <span className="text-gray-500 text-sm">{formattedDate}</span>
          </div>
          
          {/* Post content */}
          <div className="text-white mb-2">
            {content}
            {images.length > 0 ? 
             <div className='p-3'>
              <img src={images[0]?.url} alt="Post" className=" rounded-xl border w-full h-fit md:w-[650px] md:h-[650px] object-center " />
            </div> : null}
          </div>
          
          {/* Action buttons */}
          <div className="flex justify-between max-w-md mt-3">
            <button className="flex items-center text-gray-500 hover:text-blue-500 group">
              <MessageCircle size={18} className="mr-1 group-hover:text-blue-500" />
              <span className="text-sm">{comments}</span>
            </button>
            
            <button className={`flex items-center ${isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'} group`}>
              <Heart 
                size={18} 
                className={`mr-1 ${isLiked ? 'fill-current text-red-500' : 'group-hover:text-red-500'}`} 
              />
              <span className="text-sm">{likes}</span>
            </button>
            
            <button className={`flex items-center ${isBookmarked ? 'text-blue-500' : 'text-gray-500 hover:text-blue-500'} group`}>
              <Bookmark 
                size={18} 
                className={`mr-1 ${isBookmarked ? 'fill-current text-blue-500' : 'group-hover:text-blue-500'}`} 
              />
            </button>
            
            <button className="flex items-center text-gray-500 hover:text-green-500 group">
              <Share2 size={18} className="mr-1 group-hover:text-green-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};