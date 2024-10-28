import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface AuthProviderProps {
    children: React.ReactNode;
}

export interface AuthContextProps {
    userId: string | undefined;
    token: string | undefined;
    updateToken: (tokenData: string) => void | undefined;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
    const [userId, setUserId] = useState<string | undefined>(undefined);

    const [token, setToken] = useState(
        JSON.parse(localStorage.getItem("token")!) || null
    );

    const updateToken = (tokenData: string) => {        
        setToken(tokenData);
        setUserId(jwtDecode(tokenData).sub);
    };

    useEffect(() => {
        localStorage.setItem("token", JSON.stringify(token));
    }, [userId]);

    return <AuthContext.Provider value={{ userId, token, updateToken }}>{children}</AuthContext.Provider>
}