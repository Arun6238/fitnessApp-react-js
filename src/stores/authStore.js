import {create } from "zustand"
import {persist} from "zustand/middleware"

const AuthStore = (set) => ({
    isAuthenticated : false,
    accessToken:null,
    login :(token) => set(() => ({accessToken:token,isAuthenticated:true})) ,
    logout :() => set(() => ({isAuthenticated:false,accessToken:null}))
})

export const useAuthStore = create(
    persist(
        AuthStore,
        {
            name:'Auth-storage'
        })
)