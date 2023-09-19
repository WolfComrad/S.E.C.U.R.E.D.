import React, { createContext, ReactNode, useContext, useMemo, useState } from 'react';

interface UserContextType {
  userId: string;
  setUserId: (userId: string) => void;
  login: (userId: string) => void;
}

const UserType = createContext<UserContextType | undefined>(undefined);

const useUser = (): UserContextType => {
  const context = useContext(UserType);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserContextProps {
  children: ReactNode;
}

const UserContext = ({ children }: UserContextProps) => {
  const [userId, setUserId] = useState<string>('');
  const login = (newUserId: string) => {
    setUserId(newUserId);
  };
  const contextValue: UserContextType = useMemo(() => ({
    userId,
    setUserId,
    login,
  }), [userId, login, setUserId]);

  return <UserType.Provider value={contextValue}>{children}</UserType.Provider>;
};

export { UserContext, useUser };
