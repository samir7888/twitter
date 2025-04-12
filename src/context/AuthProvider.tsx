import { createContext, useContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { USER } from '@/types/user';

type AuthContentType = {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  user: USER | null;
  setUser: (user: USER | null) => void;
};

const AuthContext = createContext<AuthContentType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<USER | null>(null);

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

interface ICurrentUser {
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
  const currentUser = accessToken ? (jwtDecode(accessToken) as ICurrentUser) : null;

  return {
    ...context,
    currentUser,
  };
}
