import { Posts } from "@/components/home/Posts";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthProvider";
import { useUploadPost } from "@/hooks/posts/useUploadPost";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  // const { user } = useAuth();
  const [tweet, setTweet] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate } = useUploadPost();
  const { user } = useAuth();
  const username = user?.user.username || "User";
  // Auto-resize textarea as content grows
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [tweet]);

  // Handle file selection
  interface FileChangeEvent extends React.ChangeEvent<HTMLInputElement> {
    target: HTMLInputElement & { files: FileList };
  }

  const handleFileChange = (e: FileChangeEvent): void => {
    const selectedFiles = Array.from(e.target.files) as File[];
    setImages((prevImages) => [...prevImages, ...selectedFiles]);
  };

  // Open file dialog when image button is clicked
  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  // Handle tag input
  const handleTagInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCurrentTag(e.target.value);
  };

  // Add tag when Enter key is pressed
  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && currentTag.trim()) {
      e.preventDefault();
      const newTag = currentTag.trim().startsWith("#")
        ? currentTag.trim()
        : `#${currentTag.trim()}`;

      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
        setCurrentTag("");
      }
    }
  };

  // Remove a tag
  const removeTag = (tagToRemove: string): void => {
    setTags(tags.filter((tag: string) => tag !== tagToRemove));
  };

  // Remove an image
  const removeImage = (index: number): void => {
    setImages(images.filter((_, i) => i !== index));
  };

  // Handle submit
  const handleSubmit = async () => {
    if (tweet.trim() === "") return;

    try {
      const formData = new FormData();
      formData.append("content", tweet);

      tags.forEach((tag) => {
        formData.append("tags", tag);
      });

      images.forEach((img) => {
        formData.append("images", img);
      });

      await mutate(formData);

      setTweet("");
      setImages([]);
      setTags([]);
    } catch (error) {
      console.error("Error uploading post:", error);
      alert("Failed to upload post. Please try again.");
    }
  };

  // const username = localStorage.getItem("username")  || "User";

  return (
    <div className=" ">
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
              // onBlur={() => setIsFocused(false)}
            />
          </div>

          {/* Tags input */}
          {isFocused && (
            <div className="mt-2">
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300 px-2 py-1 rounded-full text-sm flex items-center"
                  >
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="ml-1 text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-200"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                className="w-full px-3 py-2 text-sm text-black bg-gray-100 dark:bg-gray-800 rounded-md outline-none placeholder:text-gray-500 dark:placeholder:text-gray-400"
                placeholder="Add tags (press Enter to add)"
                value={currentTag}
                onChange={handleTagInput}
                onKeyDown={handleTagKeyDown}
              />
            </div>
          )}

          {/* Image previews */}
          {isFocused && images.length > 0 && (
            <div className="mt-3 grid grid-cols-2 gap-2">
              {images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Upload preview ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-black bg-opacity-60 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          {isFocused && (
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center space-x-2 text-blue-500">
                {/* Image upload button */}
                <button
                  className="p-2 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/30"
                  onClick={openFileDialog}
                >
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
                <input
                  type="file"
                  multiple
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />

                {/* Status indicator showing count of images/tags */}
                {(images.length > 0 || tags.length > 0) && (
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {images.length > 0 &&
                      `${images.length} image${images.length > 1 ? "s" : ""}`}
                    {images.length > 0 && tags.length > 0 && ", "}
                    {tags.length > 0 &&
                      `${tags.length} tag${tags.length > 1 ? "s" : ""}`}
                  </span>
                )}
              </div>

              <Button
                onClick={handleSubmit}
                type="button"
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
      <div onClick={() => setIsFocused(false)}>
        <Posts />
      </div>
    </div>
  );
};

export default Home;
