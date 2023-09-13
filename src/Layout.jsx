import NavBar from "./Navbar"
import { Outlet } from "react-router-dom"
import "./styles/app.css"
import { useAuthStore } from "./stores/authStore"

export const Layout = () => {
    const {logout,accessToken}  = useAuthStore()

    const logoutFunction = () => {
        const url = 'http://127.0.0.1:8000/api/logout-user/'
        fetch(url,{
            method:'POST',
            credentials:'include',
            headers:{
                'Authorization':`Bearer ${accessToken}`
            }
        })
        .then(res => {
            if(res.status === 200){
                logout()
            }
        })
        .catch(e => {
            console.log("ERROR : ",e)
        })
    }
    return (
        <>
            <NavBar />
            <div id="routes">
                <Outlet/>
                {/* <button onClick={logoutFunction}>Logout</button> */}
            </div>
        </>
    )
}