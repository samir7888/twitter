export interface Avatar {
    _id: string;
    localPath: string;
    url: string;
  }
  
  export interface Account {
    _id: string;
    avatar: Avatar;
    email: string;
    username: string;
  }
  
  export interface CoverImage {
    _id: string;
    localPath: string;
    url: string;
  }
  
  export interface Author {
    __v: number;
    _id: string;
    account: Account;
    bio: string;
    countryCode: string;
    coverImage: CoverImage;
    createdAt: string;
    dob: string;
    firstName: string;
    lastName: string;
    location: string;
    owner: string;
    phoneNumber: string;
    updatedAt: string;
  }
  
  export interface PostImage {
    _id: string;
    localPath: string;
    url: string;
  }
  
  export interface Post {
    __v: number;
    _id: string;
    author: Author;
    comments: number;
    content: string;
    createdAt: string;
    images: PostImage[];
  }
  
  export interface PostsResponse {
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
    nextPage: number;
    page: number;
    posts: Post[];
  }
  
  export interface PostsApiResponse {
    data: PostsResponse;
  }
  