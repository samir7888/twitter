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
  
  export interface Author {
    _id: string;
    account: Account;
    firstName: string;
    lastName: string;
  }
  
  export interface Comment {
    __v: number;
    _id: string;
    author: Author;
    content: string;
    createdAt: string;
    updatedAt: string;
    isLiked: boolean;
    likes: number;
    postId: string;
  }
  
  export interface CommentData {
    comments: Comment[];
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
    nextPage: number;
    page: number;
    prevPage: number | null;
    serialNumberStartFrom: number;
    totalComments: number;
    totalPages: number;
  }
  
  export interface CommentResponse {
    data: CommentData;
    message: string;
    statusCode: number;
    success: boolean;
  }

  