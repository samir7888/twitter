import { useFollowUser } from "@/hooks/follow/useFollow";
import { useGetMyProfile } from "@/hooks/profile/getMyProfile";
import { useNavigate } from "react-router-dom";

export const RenderUserCard = (user: {
  _id: string;
  username: string;
  firstName?: string;
  lastName?: string;
  isFollowing: boolean;
}) => {
  const isFollowing = user.isFollowing;
    const { mutate: followMutate } = useFollowUser(user._id);
  const navigate = useNavigate();
  const { data: myProfile } = useGetMyProfile();
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
            onClick={() => followMutate()}
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
