import React, { createContext, useState, ReactNode, useContext, useEffect } from "react";
import { createLogin } from "../api/LoginFactory";
import { LoginApiInterface } from "../api/interface/LoginApiInterface";

interface AuthProviderProps {
  children: ReactNode;
}

interface LoginResult {
  success: boolean;
  message?: string; // 成功時は不要だが、失敗時にエラーメッセージを格納
}

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<LoginResult>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const storedAuth = sessionStorage.getItem("isAuthenticated");
    return storedAuth === "true";
  });
  const loginApi: LoginApiInterface = createLogin();

  const login = async (email: string, password: string):Promise<LoginResult> => {
    try {
      const data = await loginApi.fetchData(email, password)
      if (data.httpStatusCode === 200 && data.success === true) {
        setIsAuthenticated(true);
        window.sessionStorage.setItem("isAuthenticated", "true");
        return { success: true };
      } else {
        setIsAuthenticated(false)
        window.sessionStorage.setItem("isAuthenticated", "false");
        return { success: false, message: "認証失敗" };
      }
    } catch (error: any) {
        return { success: false, message: error.message || "サーバーエラーが発生しました。" };
    }
  };

  const logout = (): void => {
    setIsAuthenticated(false);
    window.sessionStorage.setItem('isAuthenticated', "false");
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
