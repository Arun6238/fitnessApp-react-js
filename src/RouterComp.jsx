import { Routes , Route, useNavigate  } from "react-router-dom";
import { useEffect } from "react";

import Profile from "./components/profile/Profile"
import History from "./components/history/History"
import Workout from "./components/workout/Workout"
import Exercises from "./components/exercises/Exercises"
import Measures from "./components/measures/Measures"


const RouterComp = () => {
    return (
        <>
            <Routes>
                <Route index element={<IndexPage />}/>
                <Route path="/Profile" element={<Profile />}/>
                <Route path="/history" element={<History />}/>
                <Route path="/workout" element={<Workout />}/>
                <Route path="/exercises" element={<Exercises />}/>
                <Route path="/measures" element={<Measures />}/>
            </Routes>
        </>
    )
}

export default RouterComp

const IndexPage = () => {
    const navigate = useNavigate()
    useEffect(() => {
        navigate('/profile')
    },[])
    return (
        <>
            <h1>This is index page..</h1>
        </>
    )
}