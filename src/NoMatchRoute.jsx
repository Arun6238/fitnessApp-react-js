import { useEffect } from "react"
import background from  "./assets/004.jpg"
import "./styles/noMatchRoute.css"
import { useLocation, useNavigate } from "react-router-dom"
const NoMatchRoute = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const redirectToHome = () => {
        navigate('/profile')
    }

    
    return (
        <>
          <div className="container">
                <img src={background} alt="" />
                <button onClick={redirectToHome}>Take me back to home page</button>
          </div>
        </>
    )
}

export default NoMatchRoute