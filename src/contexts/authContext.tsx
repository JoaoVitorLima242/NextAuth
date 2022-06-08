import { createContext, useEffect, useState } from "react";
import Router from 'next/router'
import { setCookie, parseCookies } from "nookies"

import { recoverUserInformation, signInRequest } from "../services/auth";
import { api } from "../services/api";
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

    useEffect(() => {
        const { 'nextauth-token': token } = parseCookies()

        if(token) {
            recoverUserInformation().then(response => setUser(response.user))
        }
    }, [])
    
    async function signIn({email, password}: SignInData) {
        const { token, user } = await signInRequest({ email, password })

        setCookie(undefined, 'nextauth-token', token, {
            maxAge: 60 * 60 * 1 // 1 hour 
        })

        setUser(user)

        api.defaults.headers['authorization'] = `Bearer ${token}`

        Router.push('/dashboard')
        
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, signIn, user}}>
            {children}
        </AuthContext.Provider>
    )
}