// types/following.ts

// 🧩 Avatar
export interface Avatar {
    _id: string;
    localPath: string;
    url: string;
  }
  
  // 🧩 CoverImage
  export interface CoverImage {
    _id: string;
    localPath: string;
    url: string;
  }
  
  // 🧩 Profile
  export interface Profile {
    _id: string;
    __v?: number;
    bio: string;
    countryCode: string;
    coverImage: CoverImage;
    createdAt?: string;
    dob?: string;
    firstName: string;
    lastName: string;
    location: string;
    owner: string;
    phoneNumber: string;
    updatedAt?: string;
  }
  
  // 🧩 FollowingUser
  export interface FollowingUser {
    _id: string;
    avatar: Avatar;
    email: string;
    isFollowing: boolean;
    profile: Profile;
    username: string;
  }
  
  // 🧩 LoggedInUser (shortened form, same structure as FollowingUser but no isFollowing)
  export interface LoggedInUser {
    _id: string;
    avatar: Avatar;
    email: string;
    isEmailVerified: boolean;
    profile: Omit<Profile, "__v" | "createdAt" | "dob" | "updatedAt" | "owner">;
    username: string;
  }
  
  // 🧩 FollowingData
  export interface FollowingData {
    following: FollowingUser[];
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
    nextPage: number | null;
    page: number;
    prevPage: number | null;
    serialNumberStartFrom: number;
    totalFollowing: number;
    totalPages: number;
    user: LoggedInUser;
  }
  
  // 🧩 FollowingResponse
  export interface FollowingResponse {
    data: FollowingData;
    message: string;
    statusCode: number;
    success: boolean;
  }
  


  type UserConnection = {
    _id: string;
    username: string;
    email: string;
    isFollowing: boolean;
    avatar: {
      _id: string;
      localPath: string;
      url: string;
    };
    profile: {
      _id: string;
      bio: string;
      countryCode: string;
      dob: string;
      firstName: string;
      lastName: string;
      location: string;
      phoneNumber: string;
      createdAt: string;
      updatedAt: string;
      coverImage: {
        _id: string;
        localPath: string;
        url: string;
      };
    };
  };
  
export type FollowersResponse = {
    data: {
      followers: UserConnection[];
      hasNextPage: boolean;
      hasPrevPage: boolean;
      limit: number;
      nextPage: number;
      page: number;
      prevPage: number | null;
      serialNumberStartFrom: number;
      totalFollowers: number;
      totalPages: number;
      user: {
        _id: string;
        username: string;
        email: string;
        isEmailVerified: boolean;
        avatar: {
          _id: string;
          localPath: string;
          url: string;
        };
        profile: {
          _id: string;
          bio: string;
          countryCode: string;
          coverImage: {
            _id: string;
            localPath: string;
            url: string;
          };
          firstName: string;
          lastName: string;
          location: string;
          phoneNumber: string;
        };
      };
    };
    message: string;
    statusCode: number;
    success: boolean;
  };
  