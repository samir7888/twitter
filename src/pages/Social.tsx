import {
  useGetUserFollowerList,
  useGetUserFollowingList,
  useFollowUser,
} from "@/hooks/follow/useFollow";
import { useGetMyProfile } from "@/hooks/profile/getMyProfile";
import { useNavigate, useParams } from "react-router-dom";

const Social = () => {
  const { username } = useParams<{ username: string }>();
  const { tab } = useParams<{ tab: string }>();
  const navigate = useNavigate();

  const { data: myProfile } = useGetMyProfile();

  const { data: userFollowers, isPending: loadingFollowers } =
    useGetUserFollowerList(username || "");
  const { data: userFollowing, isPending: loadingFollowing } =
    useGetUserFollowingList(username || "");

  // ✅ FIXED: only call the hook once
  const { mutate: followMutate } = useFollowUser();

  const renderUserCard = (user: {
    _id: string;
    username: string;
    firstName?: string;
    lastName?: string;
    isFollowing: boolean;
  }) => {
    const isFollowing = user.isFollowing;

    return (
      <div
        key={user._id}
        className="flex justify-between items-center w-full px-4 py-3 hover:bg-gray-800 transition"
      >
        <div
          className="flex gap-3 items-center cursor-pointer"
          onClick={() => navigate(`/${user.username}`)}
        >
          <img
            src="https://avatar.iran.liara.run/public"
            alt={user.username}
            className="w-10 h-10 rounded-full"
          />
          <div className="flex flex-col">
            <span className="text-white font-semibold">
              {user.firstName ?? "First"} {user.lastName ?? "Last"}
            </span>
            <span className="text-sm text-gray-400">@{user.username}</span>
          </div>
        </div>
        {myProfile?.account?.username !== user.username && (
          <button
            onClick={() => followMutate(user._id)}
            className={`text-sm px-4 py-1 rounded-full border ${
              isFollowing
                ? "text-white border-gray-500 hover:bg-red-600"
                : "text-white border-blue-500 hover:bg-blue-600"
            }`}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col">
      <div className="flex px-4 py-4">
        <div>
          <button
            onClick={() => navigate(`/${username}`)}
            className="rounded-full p-2 hover:bg-gray-700 "
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 12H5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 19L5 12L12 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">
            {myProfile?.firstName} {myProfile?.lastName}
          </h1>
          <p className="text-sm text-gray-500">@{username}</p>
        </div>
      </div>

      <div className="flex border-b border-gray-700">
        <button
          onClick={() => navigate(`/${username}/followers`)}
          className={`flex-1 py-3 text-center text-sm font-medium ${
            tab === "followers"
              ? "text-white border-b-2 border-blue-500"
              : "text-gray-400 hover:bg-gray-800"
          }`}
        >
          Followers
        </button>
        <button
          onClick={() => navigate(`/${username}/following`)}
          className={`flex-1 py-3 text-center text-sm font-medium ${
            tab === "following"
              ? "text-white border-b-2 border-blue-500"
              : "text-gray-400 hover:bg-gray-800"
          }`}
        >
          Following
        </button>
      </div>

      <div className="flex flex-col">
        {tab === "followers" && (
          <>
            {loadingFollowers ? (
              <div className="text-center py-6 text-gray-400">
                Loading followers...
              </div>
            ) : userFollowers && userFollowers.length > 0 ? (
              userFollowers.map((follower) => renderUserCard(follower))
            ) : (
              <div className="text-center py-6 text-gray-400">
                No followers found
              </div>
            )}
          </>
        )}

        {tab === "following" && (
          <>
            {loadingFollowing ? (
              <div className="text-center py-6 text-gray-400">
                Loading following...
              </div>
            ) : userFollowing && userFollowing.length > 0 ? (
              userFollowing.map((following) => renderUserCard(following))
            ) : (
              <div className="text-center py-6 text-gray-400">
                Not following anyone
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Social;
