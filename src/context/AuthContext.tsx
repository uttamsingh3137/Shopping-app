import { createContext, useContext, useState } from "react";
import type { User } from "../types/User";
import {
  getCurrentUser,
  removeCurrentUser,
  saveCurrentUser,
  getUsers,
  saveUsers,
} from "../utils/authStorage";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  signup: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(getCurrentUser());

  const login = (email: string, password: string) => {
    const users = getUsers();
    const found = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!found) return false;

    setUser(found);
    saveCurrentUser(found);
    return true;
  };

  const signup = (email: string, password: string) => {
    const users = getUsers();

    const exists = users.some((u) => u.email === email);
    if (exists) return false;

    const newUser = { email, password };
    saveUsers([...users, newUser]);
    saveCurrentUser(newUser);
    setUser(newUser);
    return true;
  };

  const logout = () => {
    removeCurrentUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
