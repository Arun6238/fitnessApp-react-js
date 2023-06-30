import NavBar from "./Navbar"
import RouterComp from "./RouterComp"

import "./styles/app.css"

export const Layout = () => {
    return (
        <>
            <NavBar />
            <div id="routes">
                <RouterComp />
            </div>
        </>
    )
}