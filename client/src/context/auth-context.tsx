import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface AuthProviderProps {
  children: React.ReactNode;
}

export interface AuthContextProps {
  userId: string | undefined;
  role: string | undefined;
  token: string | undefined;
  updateToken: (tokenData: string) => Promise<void> | undefined;
  logout: () => void | undefined;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [role, setRole] = useState<string | undefined>(undefined);

  const [token, setToken] = useState<string | undefined>(
    JSON.parse(localStorage.getItem("token")!) || undefined
  );

  const updateToken = async (tokenData: string) => {
    setToken(tokenData);
    const { sub, role }: any = await jwtDecode(tokenData);
    setUserId(sub);
    setRole(role);
  };

  const logout = () => {
    setToken(undefined);
    setRole(undefined);
    setUserId(undefined);
    localStorage.setItem("token", JSON.stringify(null));
  };

  useEffect(() => {
    if(!token) return;
      const { sub, role }: any = jwtDecode(token);
      setUserId(sub);
      setRole(role);
  }, []);

  useEffect(() => {
    if (token !== undefined)
      localStorage.setItem("token", JSON.stringify(token));
  }, [token]);

  return (
    <AuthContext.Provider value={{ userId, role, token, updateToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
