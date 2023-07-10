import { Routes , Route, useNavigate, Navigate  } from "react-router-dom";

import Profile from "./components/profile/Profile"
import History from "./components/history/History"
import Workout from "./components/workout/Workout"
import Exercises from "./components/exercises/Exercises"
import Measures from "./components/measures/Measures"
import NoMatchRoute from "./NoMatchRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NonAuthenticatedRoute from "./utils/NonAuthenticatedRoute";
import AuthenticatedRoutes from "./utils/AuthenticatedRoutes";
import { Layout } from "./Layout";


const RouterComp = () => {
    return (
        <>
            <Routes>
                <Route index element={<Navigate to="/Profile" />}/>
                <Route element={<NonAuthenticatedRoute/>}>
                    <Route path="/login"  element={<Login/>}/>
                    <Route path="/register"  element={<Register/>}/>
                </Route>
                <Route element={<AuthenticatedRoutes/>}>
                    <Route element={<Layout/>}>
                        <Route path="/Profile" element={<Profile />}/>
                        <Route path="/history" element={<History />}/>
                        <Route path="/workout" element={<Workout />}/>
                        <Route path="/exercises" element={<Exercises />}/>
                        <Route path="/measures" element={<Measures />}/>
                    </Route>
                </Route>
                <Route path="/*" element={<NoMatchRoute/>}/>
            </Routes>
        </>
    )
}

export default RouterComp



