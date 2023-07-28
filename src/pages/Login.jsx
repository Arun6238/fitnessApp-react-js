import React, { useState } from "react";
import { useAuthStore } from "../stores/authStore";

const Login = () => {
    const {login} = useAuthStore()
    const handleSubmit = (username,password) => {
        const data = {
            username:username,
            password:password
        }
        const options = {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            headers:{
                'Content-type' : 'application/json'
            },
            body:JSON.stringify(data)
        }
        const url = 'http://127.0.0.1:8000/api/login-user/'

        fetch(url,options)
            .then((res) => {
                if(res.status === 200){
                    return res.json()
                }
                else if (res.status === 401){
                    throw("invalid credentials")
                }
                else{
                    throw("something went wrong")
                }
            })
            .then(data => {
                login(data.access)
            })
            .catch(e => {
                console.log('Error: ',e)
            })
    }

    return (
        <>  
            <LoginForm onLogin={handleSubmit} />
        </>
    );
};

export default Login;



const LoginForm = ({ onLogin }) => {
    const [username, setUsername] = useState("") 
    const [password, setPassword] = useState("") 
    const [warning, setWarning] = useState({
        username : "",
        password : ""
    })
    const validateForm  = () => {
        // check if the username and password meet minimum lenghth requirement (required lenght is 3 and 8 respectively)
        if(username.length < 3 || password.length < 8){
            if (username.length < 3 ){
                setWarning(state => {
                    return{...state,username:"user name must be atleast 3 characters long"}
                })
            }
            else{
                setWarning(state => {
                    return {...state,username:""}
                })
            }
            if(password.length < 8){
                setWarning(state => {
                    return {...state,password:"Password must be at least 8 characters long"}
                })
            }
            else{
                setWarning(state => {
                    return {...state,password:""}
                })
            }

            return false
        }
        return true
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!validateForm()){
            console.log("abort login..")
          return  
        }
        onLogin(username,password)
    }
    return (
        <>  
            <form onSubmit={handleSubmit}>
                <label>
                    Username
                    <input 
                        type="text" 
                        name="username"  
                        value={username}
                        onChange={(e)=>{setUsername(e.target.value)}} 
                    />
                </label>
                {warning.username}
                <br />
                <label>
                    Password
                    <input 
                        type="password" 
                        name="password" 
                        value={password} 
                        onChange={(e) => {setPassword(e.target.value)}} 
                    />
                </label>
                {warning.password}
                <br />
                <button type="submit">Submit</button>
            </form>
        </>
    );
}