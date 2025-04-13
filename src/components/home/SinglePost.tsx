import { useParams, useSearchParams } from "react-router-dom";
import { useGetSinglePost } from "@/hooks/posts/getSinglePost";

import { Button } from "../ui/button";
import { PostCard } from "./PostCard";
import { useState } from "react";
import {
  useCommentPost,
  useGetPostComment,
  useLikeComment,
} from "@/hooks/posts/commentPost";
import { formatDate } from "@/lib/TimeFormat";
import { Heart } from "lucide-react";

const SinglePost = () => {
  const { postId } = useParams();
  const { data } = useGetSinglePost(postId || "");
  const [comment, setComment] = useState<string>("");
  const { data: commentsData } = useGetPostComment();
  const { mutate } = useCommentPost();
  const { mutate: likeTheComment } = useLikeComment();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
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
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            placeholder="Post your reply"
            className="w-full text-xl resize-none overflow-hidden  bg-transparent outline-none placeholder:text-gray-500 dark:placeholder:text-gray-400 min-h-9"
          />
        </div>
        <div>
          <Button
            onClick={() => {
              mutate({ comment });
            }}
            className="bg-blue-500  text-white rounded-full p-5"
          >
            Reply
          </Button>
        </div>
      </div>

      {/* comments */}
      <div>
        {commentsData?.comments.map((comment) => (
          <div key={comment._id} className="flex gap-3 p-4">
            <div className="flex-shrink-0">
              <img
                src={"https://avatar.iran.liara.run/public"}
                alt={`${comment.author.account.username} `}
                className="h-12 w-12 rounded-full"
              />
            </div>
            <div className="flex-grow">
              <div className="border-b border-gray-600  pb-2">
                <p className="text-white font-bold">
                  {comment.author.firstName}{" "}
                  <span className="text-gray-400 text-sm font-normal">
                    @{comment.author.account.username} ·{" "}
                    <span>{formatDate(comment.updatedAt)}</span>
                  </span>
                </p>
                <p className="text-white text-xl">{comment.content}</p>
                <div>
                  <button
                    className={`flex items-center ${
                      comment.isLiked
                        ? "text-red-500"
                        : "text-gray-500 hover:text-red-500"
                    } group`}
                  >
                    <Heart
                      onClick={() => {
                        likeTheComment({
                          commentId: comment._id,
                        });
                      }}
                      size={18}
                      className={`mr-1 ${
                        comment.isLiked
                          ? "fill-current text-red-500"
                          : "group-hover:text-red-500"
                      }`}
                    />
                    <span className="text-sm">{comment.likes}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-center mt-4">
          <Button
            onClick={() => {
              searchParams.set("page", String(page + 1));
            setSearchParams(searchParams);
            
            }}
            className="bg-blue-500 text-white rounded-full p-2"
          >
            Load more comments
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
