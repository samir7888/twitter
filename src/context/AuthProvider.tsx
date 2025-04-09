import {createContext, useContext, useState} from 'react';
import {jwtDecode} from 'jwt-decode';
import { UserProfile } from '@/types/userProfile';
type AuthContentType = {
    accessToken: string | null;
    setAccessToken: (token: string | null) => void;
    refreshToken: string | null;
    setRefreshToken: (token: string | null) => void;
    user: UserProfile | null;
    setUser: (user: UserProfile | null) => void;
}
const AuthContext = createContext<AuthContentType | undefined>(undefined);


export function AuthProvider({children}:{children: React.ReactNode}) {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [refreshToken, setRefreshToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserProfile | null>(null); // You can define a more specific type for user if needed

    return (
        <AuthContext.Provider value={{accessToken,user,setUser, setAccessToken, refreshToken, setRefreshToken}}>
            {children}
        </AuthContext.Provider>
    )
};

  
interface ICurrentUser{
    _id: string;
    username: string;
    role: string;
    iat: number;
    exp: number;
}
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    const accessToken = context.accessToken;
    const currentUser = accessToken ? (jwtDecode(accessToken) as ICurrentUser ) : null;
    return {
        ...context,
        currentUser,};
};

