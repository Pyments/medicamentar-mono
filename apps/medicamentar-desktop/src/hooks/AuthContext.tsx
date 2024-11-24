import { createContext, useMemo, ReactNode, useEffect } from "react";
import { useLocalStorage } from "@hooks/UseLocalStorage";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface User {
  token: string;
}

export interface AuthContextType {
  user: User | null; 
  login: (data: User) => Promise<void>; 
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useLocalStorage<User | null>("user", null);
  const navigate = useNavigate();

  const login = async (data: User) => {
    setUser(data);
    navigate("/home");
  };

  const logout = () => {
    setUser(null);
    navigate("/signin", { replace: true });
  };

  const validateToken = async () => {
    if (user && user.token) {
      try {
        await axios.get("/auth/validate-token", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
      } catch (error) {
        logout();
      }
    }
  };

  useEffect(() => {
    validateToken();
    if (user) {
      window.electron.user.send(JSON.stringify(user));
    }
  }, [user]);

  const isAuthenticated = !!user;

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      isAuthenticated,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};