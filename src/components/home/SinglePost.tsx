
import { useParams } from "react-router-dom";
import { useGetSinglePost } from "@/hooks/posts/getSinglePost";

import { Button } from "../ui/button";
import { PostCard } from "./PostCard";

const SinglePost = () => {
  const { postId } = useParams();
  const { data, isLoading } = useGetSinglePost(postId || "");
//   if (!isLoading) {
//     return <div>loading...</div>;
//   }
  if (!data) {
    return;
  }
  return (
    <div className="flex flex-col gap-4 p-4">
      <PostCard post={data} />
      <div className="border-b border-gray-600 pb-3 w-full flex items-center justify-between ">
        <div className="flex w-full  items-center  gap-2">
          <img
            src={"https://avatar.iran.liara.run/public"}
            alt="avatar"
            className="h-12 w-12 rounded-full"
          />
          <textarea
          
            placeholder="Post your reply"
            className="w-full text-xl resize-none overflow-hidden  bg-transparent outline-none placeholder:text-gray-500 dark:placeholder:text-gray-400 min-h-9"
          />
        </div>
        <div>
          <Button className="bg-blue-500  text-white rounded-full p-5">
            Reply
          </Button>
        </div>
      </div>

      {/* comments */}
<div>
        {/* {data.comments.map((comment) => (
          <div key={comment._id} className="flex gap-3 p-4">
            <div className="flex-shrink-0">
              <img
                src={"https://avatar.iran.liara.run/public"}
                alt={`${comment.user.username}`}
                className="h-12 w-12 rounded-full"
              />
            </div>
            <div className="flex-grow">
              <div className="border-b border-gray-200 dark:border-gray-800 pb-2">
                <p className="text-white font-bold">{comment.user.username}</p>
                <p className="text-gray-500">{comment.content}</p>
              </div>
            </div>
          </div>
        ))} */}
</div>

    </div>
  );
};

export default SinglePost;
