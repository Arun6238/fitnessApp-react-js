import { NavLink } from "react-router-dom"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser ,faHistory, faAdd, faDumbbell,faRuler } from '@fortawesome/free-solid-svg-icons'

import './styles/navbar.css'
import { useEffect, useState } from "react"
const NavBar = () => {
    const [count,setCount] = useState(0)
    useEffect(()=> {
        console.log("onMount")
    },[])
    
    const handleClick = () => {
        setCount(prevState => {
            return prevState + 1
        })
        console.log(count)
    }
    return (
        <nav className="navbar">
            <ul>
                <NavigationLink icon={faUser} name="Profile"  to="/profile" />
                <NavigationLink icon={faHistory} name="History" to="/history" />
                <NavigationLink icon={faAdd} name="Wokrout" to="/workout" />
                <NavigationLink icon={faDumbbell} name="Exercises" to="/exercises" />
                <NavigationLink icon={faRuler} name="measures" to="/measures" />
            </ul>
        </nav>
    )
}

export default NavBar

const NavigationLink = ({to,name,icon}) => {
    return (
        <li>
            <NavLink to={to}>
                <FontAwesomeIcon icon={icon} />
                <br />
                {name}
            </NavLink>
        </li>
    )
}