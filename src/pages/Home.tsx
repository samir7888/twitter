import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthProvider";
// import { useAuth } from "@/context/AuthProvider";
// import { useGetPosts } from "@/hooks/getPosts";
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const { user } = useAuth();
  const [tweet, setTweet] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Auto-resize textarea as content grows
  // const posts = useGetPosts();
  useEffect(() => {

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [tweet]);
const username = localStorage.getItem("username") || user?.username || "User";
  return (
    <div className="border-b border-gray-200 dark:border-gray-800">
      <div className="flex gap-3 p-4">
        <div className="flex-shrink-0">
          <Link to={`/${username}`}>
          <img
            className="w-12 h-12 rounded-full"
            src="https://avatar.iran.liara.run/public"
            alt="profile"
            />
            </Link>
        </div>
        <div className="flex-grow">
          <div
            className={`border-b ${
              isFocused ? "border-blue-500" : "border-transparent"
            } pb-2`}
          >
            <textarea
              ref={textareaRef}
              className="w-full text-xl resize-none overflow-hidden bg-transparent outline-none placeholder:text-gray-500 dark:placeholder:text-gray-400 min-h-9"
              placeholder="What is happening?"
              value={tweet}
              rows={1}
              onChange={(e) => setTweet(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          </div>

          {isFocused && (
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center space-x-2 text-blue-500">
                <button className="p-2 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/30">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                    ></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                </button>
                <button className="p-2 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/30">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </button>
              </div>
              <Button
                className={`rounded-full px-4 py-2 font-medium ${
                  tweet.trim().length > 0
                    ? "bg-blue-500 hover:bg-blue-600 text-white"
                    : "bg-blue-300 text-white cursor-not-allowed"
                }`}
                disabled={tweet.trim().length === 0}
              >
                Post
              </Button>
            </div>
          )}
        </div>
      </div>
      {/* posts */}
      <div>
     

      </div>
    </div>
  );
};

export default Home;
