export interface IAvatar {
    _id: string;
    localPath: string;
    url: string;
}

export interface IAccount {
    _id: string;
    avatar: IAvatar;
    email: string;
    username: string;
}

export interface ICoverImage {
    _id: string;
    localPath: string;
    url: string;
}

export interface IAuthor {
    __v: number;
    _id: string;
    account: IAccount;
    bio: string;
    countryCode: string;
    coverImage: ICoverImage;
    createdAt: string;
    dob: string;
    firstName: string;
    lastName: string;
    location: string;
    owner: string;
    phoneNumber: string;
    updatedAt: string;
}

export interface IPostImage {
    _id: string;
    localPath: string;
    url: string;
}

export interface Post {
    __v: number;
    _id: string;
    author: IAuthor;
    comments: number;
    content: string;
    createdAt: string;
    images: IPostImage[];
    isBookmarked: boolean;
    isLiked: boolean;
    likes: number;
    tags: string[];
    updatedAt: string;
}

export interface IPostsResponse {
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
    nextPage: number;
    page: number;
    posts: Post[];
}

export interface IPostsApiResponse {
    data: IPostsResponse;
    message: string;
    statusCode: number;
    success: boolean;
}
export interface IPostApiResponse {
    data: Post;
    message: string;
    statusCode: number;
    success: boolean;
}

