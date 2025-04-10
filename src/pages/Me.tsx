import { Button } from "@/components/ui/button";
import { useGetMyProfile } from "@/hooks/getMyProfile";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { CalendarIcon, MapPinIcon } from "lucide-react";
import { useState, useEffect } from "react";
import ProfileEditModal from "@/components/home/UpdateProfile";
import Logout from "@/components/Auth/Logout";

const Me = () => {
  const { data } = useGetMyProfile();
  const { username } = useParams<{ username: string }>();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("tweets");
  const navigate = useNavigate();
  const location = useLocation();

  // Check if the current route is the settings profile route
  useEffect(() => {
    if (location.pathname === "/settings/profile") {
      setIsOpen(true);
    }
  }, [location.pathname]);

  // Handle modal close and navigation
  const handleModalClose = () => {
    setIsOpen(false);
    if (location.pathname === "/settings/profile") {
      navigate(-1); // Go back to previous page
    }
  };

  // Format date to "Joined Month Year" format
  const formatJoinDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return `Joined ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
  };

  // Tabs for profile navigation
  const tabs = [
    { id: "tweets", label: "Posts" },
    { id: "replies", label: "Replies" },
    { id: "media", label: "Media" },
    { id: "likes", label: "Likes" }
  ];

  return (
    <div className="w-full min-h-full bg-black">
      {/* Header with back button */}
      <div onClick={() => navigate(-1)} className="flex justify-between sticky top-0 z-10 backdrop-blur-md bg-black dark:bg-black/70 p-4  items-center">
        <div className="flex items-center gap-6">
          <button className="rounded-full p-2 hover:bg-gray-100 ">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div>
            <h2 className="font-bold text-xl">{data?.firstName} {data?.lastName}</h2>
            <p className="text-sm text-gray-500">0 posts</p>
          </div>
        </div>
        <div><Logout /></div>
      </div>

      {/* Cover and profile image */}
      <div className="w-full relative">
        <div className="h-48 md:h-52 lg:h-60 bg-black dark:bg-gray-800 overflow-hidden">
          <img
            src={"https://picsum.photos/seed/picsum/1500/500"}
            alt="cover"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex justify-between px-4 relative">
          <div className="absolute  -top-16 border-4 border-white dark:border-black rounded-full">
            <img
              src={"https://avatar.iran.liara.run/public"}
              alt="profile"
              className="max-w-32 max-h-32 rounded-full object-cover"
            />
          </div>
          
          <div className="flex justify-end w-full pt-3">
            <Button 
              onClick={() =>{ navigate("/settings/profile");
                setIsOpen(true);
              }} 
              className="rounded-full bg-blue-500 text-white"
            >
              Edit profile
            </Button>
          </div>
        </div>
      </div>

      {/* Profile info */}
      <div className="mt-16 px-4">
        <h1 className="text-xl font-bold">
          {data?.firstName} {data?.lastName}
        </h1>
        <p className="text-gray-500 dark:text-gray-400">@{username}</p>
        
        <p className="my-3 whitespace-pre-wrap">{data?.bio || "REACT || NODE"}</p>
        
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-400 mt-2">
          {data?.location && (
            <div className="flex items-center gap-1">
              <MapPinIcon size={16} />
              <span>{data.location}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <CalendarIcon size={16} />
            <span>{formatJoinDate(data?.createdAt || "")}</span>
          </div>
        </div>
        
        <div className="flex gap-5 mt-3 text-sm">
          <button className="hover:underline">
            <span className="font-bold text-white dark:text-white">{data?.followingCount ?? 0}</span>{" "}
            <span className="text-gray-500 dark:text-gray-400">Following</span>
          </button>
          <button className="hover:underline">
            <span className="font-bold text-white dark:text-white">{data?.followersCount ?? 0}</span>{" "}
            <span className="text-gray-500 dark:text-gray-400">Followers</span>
          </button>
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="flex border-b border-gray-200 mt-4">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`flex-1 text-center py-4 px-2 transition-colors ${
              activeTab === tab.id 
                ? "font-bold border-b-4 border-blue-500" 
                : "text-gray-500 hover:bg-gray-800"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tweets */}
      <div className="min-h-40 flex justify-center items-center p-8 text-center text-gray-500">
        {activeTab === "tweets" && (
          <div>
            <p className="text-xl font-bold text-white mb-1">Share your thoughts</p>
            <p>When you post a Tweet, it will show up here.</p>
          </div>
        )}
        
        {activeTab === "replies" && (
          <div>
            <p className="text-xl font-bold text-white dark:text-white mb-1">Join the conversation</p>
            <p>When you reply to someone, it will show up here.</p>
          </div>
        )}
        
        {activeTab === "media" && (
          <div>
            <p className="text-xl font-bold text-white dark:text-white mb-1">Lights, camera... attachment!</p>
            <p>When you post photos or videos, they will show up here.</p>
          </div>
        )}
        
        {activeTab === "likes" && (
          <div>
            <p className="text-xl font-bold text-white dark:text-white mb-1">You haven't liked any posts yet</p>
            <p>When you do, they will show up here.</p>
          </div>
        )}
      </div>

      {/* Modal - Pass the user data as initialData */}
      {isOpen && <ProfileEditModal 
        isOpen={isOpen} 
        setIsOpen={handleModalClose}
        initialValues={data}
        
      />}
    </div>
  );
};

export default Me;