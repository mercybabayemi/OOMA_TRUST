'use client';
import { createContext, useState, useContext, ReactNode, useEffect } from 'react';

export interface User {
  address: string;
  id: number;
  name: string;
  isVerified: boolean;
  email?: string;
  avatarInitial: string;
}

interface UserContextType {
  currentUser: User | null;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
  verifyUser: () => void;
}
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('oomaUser');
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
    }
    setIsLoading(false);
  }, []);

  const login = (user: User) => {
    localStorage.setItem('oomaUser', JSON.stringify(user));
    setCurrentUser(user);
  };

  const logout = () => {
    localStorage.removeItem('oomaUser');
    setCurrentUser(null);
  };

  const verifyUser = () => {
    if (currentUser) {
      const updatedUser = { ...currentUser, isVerified: true };
      localStorage.setItem('oomaUser', JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);
    }
  };

  return (
    <UserContext.Provider value={{ currentUser, isLoading, login, logout, verifyUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};