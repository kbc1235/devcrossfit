import { createContext, useState, useEffect, ReactNode } from "react";
import { signInAnonymously } from "../firebase";
import { User } from "firebase/auth";

export type AuthContextType = User | null;

// 명시적으로 undefined를 포함하지 않는 AuthContext를 생성합니다.
// 이렇게 하면 useContext를 사용할 때 undefined를 처리할 필요가 없어집니다.
export const AuthContext = createContext<AuthContextType>(null);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthContextType>(null);

  useEffect(() => {
    signInAnonymously()
      .then(({ user }) => {
        setUser(user);
      })
      .catch((error) => {
        console.error("Anonymous sign-in failed", error);
      });
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
