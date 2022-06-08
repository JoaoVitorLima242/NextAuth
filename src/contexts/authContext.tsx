import { createContext, useState } from "react";
import { signInRequest } from "../services/auth";
import { setCookie } from "nookies"
import Router from 'next/router'
interface AuthCtx {
    isAuthenticated: boolean;
    user: User
    signIn: (data: SignInData) => Promise<void>
}

type SignInData = {
    email: string;
    password: string
}

type User = {
    name: string
    email: string
    avatar_url: string
}

export const AuthContext = createContext({} as AuthCtx)


export function AuthProvider ({ children }) {
    const [user, setUser] = useState<User | null>(null)

    const isAuthenticated = !!user
    
    async function signIn({email, password}: SignInData) {
        const { token, user } = await signInRequest({ email, password })

        setCookie(undefined, 'nextauth-token', token, {
            maxAge: 60 * 60 * 1 // 1 hour 
        })

        setUser(user)

        Router.push('/dashboard')
        
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, signIn, user}}>
            {children}
        </AuthContext.Provider>
    )
}