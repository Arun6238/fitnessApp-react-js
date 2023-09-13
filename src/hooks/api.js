import {useAuthStore}from "../stores/authStore"
const BASE_URL = "http://127.0.0.1:8000/api/";

export const useAuthenticatedFetch = () => {
    const {login,accessToken,logout} = useAuthStore();
    const authenticatedFetch = async (path, options= {},retryCount= 0) => {
        const defaultOptions = {
            ...options,
            headers:{
                ...options.headers,
                Authorization: `Bearer ${accessToken}`
            }
        };
        const response = await fetch(BASE_URL + path,defaultOptions);
        const status = response.status
        // status will be 401 if the access token in the request is expired 
        if(response.status === 401){
            // get new access token using refresh token stored as http only cookie
            const {token,status} = await getNewRefreshToken()
            if(status === 200){
                login(token)
                // Recall the authenticatedFetch function with the same path and options
                // Only retry up to a maximum of 2 times
                if(retryCount < 2){
                    authenticatedFetch(path,options,retryCount + 1)
                }
            }
            // if the refresh token is also expired logout the user
            // logingout will send the user to login page
            else if(status === 401){
                logout()
                return
            }
        }
        const data = await response.json();
        return {
            status,
            data
        }
    }
    return authenticatedFetch
}

const getNewRefreshToken = async () => {
    const path = 'token/check/'
            const res = await fetch(BASE_URL + path, {
                method: 'POST', 
                credentials: 'include',
              })
            if(res.ok){
                const data = await res.json()
                return {
                    token:data.access_token,
                    status:res.status
                }
            }
            else{
                return {
                    token:null,
                    status:res.status
                }
            }

}