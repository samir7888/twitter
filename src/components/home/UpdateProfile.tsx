import { useEffect, useState, useRef } from "react";
import { X, Camera } from "lucide-react";
import { useUpdateMyProfile } from "@/hooks/profile/useUpdateProfile";
import { useUpdateCoverImage } from "@/hooks/profile/useUpdateCoverImage";
import { useUpdateProfile } from "@/hooks/profile/useUpdateAvatar";
import { UserProfile } from "@/types/userProfile";
import { profileFormSchema } from "@/validations/input-validations/profileInput";

export default function ProfileEditModal({
  isOpen,
  setIsOpen,
  initialValues,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  initialValues: UserProfile;
}) {
  const coverImageInputRef = useRef<HTMLInputElement>(null);
  const profileImageInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  
  // Form data interface
  interface FormData {
    firstName: string;
    lastName: string;
    bio: string;
    dob: string;
    location: string;
    phoneNumber: string;
    countryCode: string;
  }

  // Form data state
  const [formData, setFormData] = useState<FormData>({
    firstName: initialValues?.firstName || "",
    lastName: initialValues?.lastName || "",
    bio: initialValues?.bio || "",
    dob: initialValues?.dob || "",
    location: initialValues?.location || "",
    phoneNumber: initialValues?.phoneNumber || "",
    countryCode: initialValues?.countryCode || "+1",
  });

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setFormData({
        firstName: initialValues?.firstName || "",
        lastName: initialValues?.lastName || "",
        bio: initialValues?.bio || "",
        dob: initialValues?.dob || "",
        location: initialValues?.location || "",
        phoneNumber: initialValues?.phoneNumber || "",
        countryCode: initialValues?.countryCode || "+1",
      });
      // Reset previews and errors when modal opens
      setCoverImagePreview(null);
      setProfileImagePreview(null);
      setCoverImageFile(null);
      setProfileImageFile(null);
      setError("");
    }
  }, [isOpen, initialValues]);

  // Profile update mutation
  const { 
    mutate: updateProfileMutate, 
    isPending: isProfileUpdatePending, 
    isError: isProfileUpdateError, 
    error: profileUpdateError, 
    isSuccess: isProfileUpdateSuccess 
  } = useUpdateMyProfile();

  // Cover image update mutation
  const { 
    mutate: updateCoverImageMutate, 
    isPending: isCoverUpdatePending, 
    isError: isCoverUpdateError, 
    error: coverUpdateError, 
    isSuccess: isCoverUpdateSuccess 
  } = useUpdateCoverImage();

  // Profile image update mutation
  const { 
    mutate: updateProfileImageMutate,
    isPending: isProfileImageUpdatePending,
    isError: isProfileImageUpdateError,
    error: profileImageUpdateError,
    isSuccess: isProfileImageUpdateSuccess
  } = useUpdateProfile();

  // Preview states for images
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);
  // File states for submission
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);

  const countryCodes = [
    { code: "+1", name: "United States (+1)" },
    { code: "+44", name: "United Kingdom (+44)" },
    { code: "+91", name: "India (+91)" },
    { code: "+61", name: "Australia (+61)" },
    { code: "+86", name: "China (+86)" },
    { code: "+49", name: "Germany (+49)" },
  ];
 
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCoverImageClick = () => {
    coverImageInputRef.current?.click();
  };

  const handleProfileImageClick = () => {
    profileImageInputRef.current?.click();
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Store file for submission
    setCoverImageFile(file);
    
    // Create a preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setCoverImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Store file for submission
    setProfileImageFile(file);
    
    // Create a preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError("");
    
    try {
      // Validate form data
      const validationResult = profileFormSchema.safeParse(formData);
    
      if (!validationResult.success) {
        const firstError = Object.values(validationResult.error.flatten().fieldErrors)[0]?.[0];
        setError(firstError || "Invalid input.");
        return;
      }
      
      // Update profile information
      updateProfileMutate({ params: formData });
      
      // Upload cover image if changed
      if (coverImageFile) {
        // Convert File to base64 string since the API expects a string
        const reader = new FileReader();
        reader.readAsDataURL(coverImageFile);
        reader.onload = () => {
          // Remove the prefix (e.g., "data:image/jpeg;base64,") from the base64 string
          const base64String = reader.result?.toString().split(',')[1];
          if (base64String) {
            updateCoverImageMutate({ params: base64String });
          }
        };
      }
      
      // Upload profile image if changed
      if (profileImageFile) {
        updateProfileImageMutate();
      }
      
      // Close modal on success after a small delay to ensure mutations complete
      if (isProfileUpdateSuccess && 
          (!coverImageFile || isCoverUpdateSuccess) && 
          (!profileImageFile || isProfileImageUpdateSuccess)) {
        setTimeout(() => setIsOpen(false), 500);
      }
    } catch (err) {
      setError("Failed to update profile. Please try again.");
      console.error("Profile update error:", err);
    }
  };

  // If the modal is not open, don't render anything
  if (!isOpen) return null;

  // Show loading indicator if any operation is pending
  const isLoading = isProfileUpdatePending || isCoverUpdatePending || isProfileImageUpdatePending;
  
  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  // Combine error messages if any
  const hasError = isProfileUpdateError || isCoverUpdateError || isProfileImageUpdateError;
  const errorMessage = profileUpdateError?.message || coverUpdateError?.message || profileImageUpdateError?.message;

  // Get cover image source
  const coverImageSrc = coverImagePreview || 
    (initialValues?.coverImage && typeof initialValues.coverImage === "string" ? 
      initialValues.coverImage : 
      "https://picsum.photos/seed/picsum/1500/500");

  // Get profile image source
  const profileImageSrc = profileImagePreview || 
    (initialValues?.account?.avatar && typeof initialValues.account.avatar === "string" ? 
      initialValues.account.avatar : 
      "https://avatar.iran.liara.run/public");

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 font-sans">
      {/* Semi-transparent background */}
      <div
        className="fixed inset-0 bg-black"
        onClick={() => setIsOpen(false)}
      />

      {/* Modal Content */}
      <div className="bg-black opacity-80 border rounded-2xl w-full max-w-md mx-4 z-10 max-h-screen overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full hover:bg-gray-800"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold">Edit Profile</h2>
          </div>
          <button
            onClick={handleSubmit}
            className="bg-black text-white font-bold py-1 px-4 rounded-full"
          >
            Save
          </button>
        </div>

        {/* Error message display */}
        {(error || hasError) && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <span className="block sm:inline">{error || errorMessage || "An error occurred while saving your profile."}</span>
          </div>
        )}

        {/* Form */}
        <form className="px-4 py-1 space-y-4">
          <div className="my-6">
            <div className="h-28 relative lg:h-32 bg-black overflow-hidden">
              {/* Cover Image */}
              <img
                src={coverImageSrc}
                alt="cover"
                className="w-full h-full object-cover"
              />
              <div 
                onClick={handleCoverImageClick}
                className="text-black absolute top-12 left-1/2 transform -translate-x-1/2 rounded-full bg-gray-600 p-3 opacity-50 cursor-pointer hover:opacity-70"
              >
                <Camera />
                <input
                  type="file"
                  ref={coverImageInputRef}
                  onChange={handleCoverImageChange}
                  className="hidden"
                  accept="image/*"
                />
              </div>
            </div>
            {/* Profile Image */}
            <div className="flex justify-between px-4 relative">
              <div className="absolute -top-14 border-4 border-white dark:border-black rounded-full">
                <img
                  src={profileImageSrc}
                  alt="profile"
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div 
                  onClick={handleProfileImageClick}
                  className="text-white bg-gray-600 opacity-50 p-2 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:opacity-70"
                >
                  <Camera size={16} />
                  <input
                    type="file"
                    ref={profileImageInputRef}
                    onChange={handleProfileImageChange}
                    className="hidden"
                    accept="image/*"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4 pt-12">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            ></textarea>
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="City, State"
            />
          </div>

          {/* Phone Number with Country Code */}
          <div className="pb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <div className="grid grid-cols-3 gap-2">
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                className="p-2 border bg-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {countryCodes.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
              <div className="col-span-2">
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Phone number"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}