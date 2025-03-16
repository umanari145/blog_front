import React, { createContext, useState, ReactNode, useContext } from "react";
import { createLogin } from "../api/LoginFactory";
import { LoginApiInterface } from "../api/interface/LoginApiInterface";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const loginApi: LoginApiInterface = createLogin();

  const login = async (email: string, password: string) => {
    try {
      console.log("sagat")
      const data = await loginApi.fetchData(email, password)
      if (data.httpStatusCode === 200 && data.success === true) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false)
      }
    } catch (error: any) {
        return { success: false, message: error.message || "サーバーエラーが発生しました。" };
    }
  };

  const logout = (): void => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

// Hookを作成して、Contextを簡単に使えるように
export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};
