// types/auth.ts

// 🧩 Avatar
export interface Avatar {
    _id: string;
    localPath: string;
    url: string;
  }
  
  // 🧩 LoginType & Role
  export type LoginType = 'EMAIL_PASSWORD' | 'GOOGLE' | 'GITHUB';
  export type Role = 'ADMIN' | 'USER';
  
  // 🧩 User
  export interface User {
    _id: string;
    __v: number;
    avatar: Avatar;
    createdAt: string;
    updatedAt: string;
    email: string;
    isEmailVerified: boolean;
    loginType: LoginType;
    role: Role;
    username: string;
  }
  
  // 🧩 AuthData
  export interface AuthData {
    accessToken: string;
    refreshToken: string;
    user: User;
  }
  
  // 🧩 AuthResponse
  export interface AuthResponse {
    data: AuthData;
    message: string;
    statusCode: number;
    success: boolean;
  }
  