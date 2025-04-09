interface IAvatar {
    _id: string;
    localPath: string;
    url: string;
}
enum USER_ROLE {
    USER = 'USER',
    ADMIN = 'ADMIN',
    MODERATOR = 'MODERATOR',
    GUEST = 'GUEST',
}
export type USER = {
    _id: string;
    username: string;
    avatar: IAvatar;
    login: string;
    role: USER_ROLE;
    email: string;
    isEmailVerified: boolean;
    loginType: string;
    bio: string;
    createdAt: Date;
    updatedAt: Date;
}

