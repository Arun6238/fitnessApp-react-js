import React from "react";
import { useAuthStore } from "../stores/authStore";

const Login = () => {

    const {login,isAuthenticated} = useAuthStore()

    const handleSubmit = (e) => {
        e.preventDefault()
        login()
    }

    return (
        <>  
            <form onSubmit={handleSubmit}>
                {isAuthenticated?"true":"false"}<br/>
                <label>
                    Username
                    <input type="text" name="username" />
                </label>
                <br />
                <label>
                    Password
                    <input type="password" name="password" />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        </>
    );
};

export default Login;
