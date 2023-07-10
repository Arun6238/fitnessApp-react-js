import NavBar from "./Navbar"
import { Outlet } from "react-router-dom"
import "./styles/app.css"


export const Layout = () => {
    return (
        <>
            <NavBar />
            <div id="routes">
                <Outlet/>
                <button onClick={logout}>Logout</button>
            </div>
        </>
    )
}