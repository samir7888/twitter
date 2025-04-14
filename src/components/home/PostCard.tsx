import { useLikePost } from "@/hooks/posts/likePost";
import { formatDate } from "@/lib/TimeFormat";
import { Post } from "@/types/post";
import { Bookmark, Heart, MessageCircle, Share2, Ellipsis } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthProvider";
import { useDeletePost } from "@/hooks/posts/deletePost";
import {
  useFollowUser,
  useGetUserFollowerList,
} from "@/hooks/follow/useFollow";

export const PostCard = ({ post }: { post: Post }) => {
  const { user } = useAuth();
  const {
    content,
    createdAt,
    likes,
    comments,
    isLiked,
    isBookmarked,
    images,
    author,
  } = post;
console.log(post)
  const { mutate } = useDeletePost();
  const { mutate: followTheUser } = useFollowUser(author?.account?._id);
  const { data: followersList } = useGetUserFollowerList(
    author?.account?.username
  );
  console.log(followersList);
  const username = author?.account?.username || "User";
  const { mutate: likeThePost } = useLikePost();
  const [isPostLiked, setIsPostLiked] = React.useState(post.isLiked);

  const navigate = useNavigate();
  return (
    <div className="p-4 text-white cursor-pointer ">
      <div className="flex flex-col space-x-3">
        <div className="flex w-full justify-between">
          <div className="flex gap-3 w-full">
            {/* Avatar */}

            <div
              onClick={() => navigate(`/${username}`)}
              className="flex-shrink-0"
            >
              <img
                src={"https://avatar.iran.liara.run/public"}
                alt={`${username} `}
                className="h-12 w-12 rounded-full"
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {/* Author info */}
              <div className="flex items-center mb-1">
                {/* <span className="font-bold text-white-900">
                {user?.firstName} {user?.lastName}
                </span> */}
                <span className="ml-1 text-gray-400">@{username}</span>
                <span className="mx-1 text-gray-500">·</span>
                <span className="text-gray-500 text-sm">
                  {formatDate(createdAt)}
                </span>
              </div>

              {/* Post content */}
              <div
                onClick={() => {
                  navigate(`/${username}/status/${post._id}`);
                }}
                className="text-white flex flex-col justify-start  mb-2"
              >
                <div className="flex justify-start">{content}</div>
                {images?.length > 0 ? (
                  <div className="p-3">
                    <img
                      src={images[0]?.url}
                      alt="Post"
                      className=" rounded-xl border w-full h-fit md:w-[650px] md:h-[650px] object-cover "
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-gray-500 hover:text-blue-500 group">
                <Ellipsis size={18} className="group-hover:text-blue-500" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gray-800 text-white">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {user?.user.username === username && (
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={() => {
                      mutate(post._id);
                    }}
                  >
                    Delete post
                  </DropdownMenuItem>
                )}
                {!(user?.user.username === username) && (
                  <DropdownMenuItem
                    variant="default"
                    onClick={() => {
                      followTheUser();
                    }}
                  >
                    {followersList && followersList?.followers?.length > 0
                      ? followersList?.followers?.map((follower) => {
                          return follower.username === user?.user.username
                            ? "Unfollow"
                            : "Follow";
                        })
                      : "follow"}{" "}
                    @{post?.author?.account.username}
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  onClick={() => {
                    navigate(`/${username}/status/${post._id}`);
                  }}
                >
                  View Post
                </DropdownMenuItem>
                <DropdownMenuItem>Report</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {/* Action buttons */}
        <div className="flex gap-5 justify-between max-w-md mt-3">
          <button
            onClick={() => {
              navigate(`/${username}/status/${post._id}`);
            }}
            className="flex items-center text-gray-500 hover:text-blue-500 group"
          >
            <MessageCircle
              size={18}
              className="mr-1 group-hover:text-blue-500"
            />
            <span className="text-sm">{comments}</span>
          </button>

          <button
            className={`flex items-center ${
              isLiked ? "text-red-500" : "text-gray-500 hover:text-red-500"
            } group`}
          >
            <Heart
              onClick={() => {
                setIsPostLiked(!isPostLiked);

                likeThePost({
                  postId: post._id,
                });
              }}
              size={18}
              className={`mr-1 ${
                isLiked
                  ? "fill-current text-red-500"
                  : "group-hover:text-red-500"
              }`}
            />
            <span className="text-sm">{likes}</span>
          </button>

          <button
            className={`flex items-center ${
              isBookmarked
                ? "text-blue-500"
                : "text-gray-500 hover:text-blue-500"
            } group`}
          >
            <Bookmark
              size={18}
              className={`mr-1 ${
                isBookmarked
                  ? "fill-current text-blue-500"
                  : "group-hover:text-blue-500"
              }`}
            />
          </button>

          <button className="flex items-center text-gray-500 hover:text-green-500 group">
            <Share2 size={18} className="mr-1 group-hover:text-green-500" />
          </button>
        </div>
      </div>
    </div>
  );
};
