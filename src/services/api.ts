import axios from "axios";
import { parseCookies } from 'nookies'

const { 'nextauth.token': token } = parseCookies()

export const api = axios.create({
    baseURL: 'http://localhost:3000'
})

api.interceptors.request.use(config => {
    console.log(config)

    return config
})

if ( token ) {
    api.defaults.headers['authorization'] = `Bearer ${token}`
}