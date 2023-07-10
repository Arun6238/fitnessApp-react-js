import {create } from "zustand"

const AuthStore = (set) => ({
    isAuthenticated : false,
    login :() => set(() => ({isAuthenticated:true})),
    logout :() => set(() => ({isAuthenticated:false}))
})

export const useAuthStore = create(AuthStore)