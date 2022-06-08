import { createContext } from "react";

export const AuthContext = createContext({})

interface authCtx {
    isAuthenticated: boolean
}

export function AuthProvider ({ children }) {
    const isAuthenticated = false

    return (
        <AuthContext.Provider value={{isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )
}