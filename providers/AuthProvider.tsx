"use client";

import { _User } from "@/typings/user";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface AuthContextProps {
  user?: _User | null;
  isLoggedIn: boolean;
  setUser: Dispatch<SetStateAction<_User | null | undefined>>;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextProps>({
  user: undefined,
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  setUser: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
  user?: _User | null;
}

export default function AuthProvider({ children, user }: AuthProviderProps) {
  const [_user, setUser] = useState(user);
  const [isLoggedIn, setIsLoggedIn] = useState(user ? true : false);

  return (
    <AuthContext.Provider
      value={{ user: _user, isLoggedIn, setUser, setIsLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (typeof context === "undefined") throw new Error("Missing AuthProvider");

  return context;
};
