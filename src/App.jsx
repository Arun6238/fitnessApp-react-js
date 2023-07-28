import { useEffect, useState } from "react"
import RouterComp from "./RouterComp"
import { useAuthStore } from "./stores/authStore"
import {isExpired} from 'react-jwt'

const App = () =>{
    const {login,accessToken,logout}  = useAuthStore()
    const [loading ,setLoading] = useState(true)
    useEffect(() => {  
        //check if the access token is not expired and not null      
        if( !(accessToken === null) && !isExpired(accessToken) ){
            login(accessToken)  
            setLoading(false)
        }
        else{
            // api to check if the refresh token stored as httpOnly cookie is valid if valid it return a new access token
            const url = 'http://127.0.0.1:8000/api/token/check/'
            fetch(url, {
                method: 'POST', 
                credentials: 'include',
              })
            .then(res => {
                if(res.status === 200) return res.json()
                if(res.status === 401) {
                    throw ("user is not authenticated...")
                }

            })
            .then(data => {
                // saves access token in auth store and set isAuthenticated to true 
                login(data.access_token)
            })
            .catch(error => {
                // Handle any errors that occurred during the fetch
                // change this alert with better error handling 
            })
            .finally(()=>{
                setLoading(false)
            })
        }
    
    },[])
    return (
        <>
            {loading?null:<RouterComp/>}
        </>
    )
}

export default App