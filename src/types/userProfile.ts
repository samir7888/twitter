// Base image/file interface
interface FileInfo {
    _id: string;
    localPath: string;
    url: string;
  }
  
  // Account interface
  interface UserAccount {
    _id: string;
    avatar: FileInfo;
    email: string;
    isEmailVerified: boolean;
    username: string;
  }
  
  // User profile interface
  export interface UserProfile {
    _id: string;
    __v: number;
    account: UserAccount;
    bio: string;
    countryCode: string;
    coverImage: FileInfo;
    createdAt: string; // ISO date string
    dob: string; // ISO date string
    firstName: string;
    followersCount: number;
    followingCount: number;
    isFollowing: boolean;
    lastName: string;
    location: string;
    owner: string; // Reference to user ID
    phoneNumber: string;
    updatedAt: string; // ISO date string
  }
  
  // Full API response interface
  export interface UserProfileApiResponse {
    data: UserProfile;
    message: string;
    statusCode: number;
    success: boolean;
  }

