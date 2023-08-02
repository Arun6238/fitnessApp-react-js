import { useState } from "react";
import {Link} from "react-router-dom"
import { useAuthStore } from "../stores/authStore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser ,faLock } from '@fortawesome/free-solid-svg-icons'
import './login.css'
import { Warning, WarningBordered } from "./children/Children";

const Login = () => {
    const {login} = useAuthStore()
    const handleSubmit = (username,password,setWarning) => {
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
                    throw({error:401,message:'invalid credentials'})
                }
                else if(res.status === 429){
                    throw({error:429,massage:'to many request..'})
                }
                else{
                    throw("something went wrong")
                }
            })
            .then(data => {
                login(data.access)
            })
            .catch(e => {
                if(e.error === 401){
                    // displays "inavlid credentials"
                    setWarning("Invalid credentials,please verify them and retry")
                }
                else if(e.error === 429){
                    setWarning("Too Many Requests. Please try again later.")
                }
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
        password : "",
        credentials :""
    })
    const setInvalidCredentials = (message) => {
        setWarning(state => {
            return {...state,credentials:message}
        })
    }
    const validateForm  = () => {
        // check if the username and password meet minimum lenghth requirement (required lenght is 3 and 8 respectively)
        if(username.length < 3 || password.length < 8){
            if (username.length < 3 ){
                setWarning(state => {
                    return{...state,username:"Username must be atleast 3 characters long",credentials:""}
                })
            }
            else{
                setWarning(state => {
                    return {...state,username:""}
                })
            }
            if(password.length < 8){
                setWarning(state => {
                    return {...state,password:"Password must be at least 8 characters long",credentials:""}
                })
            }
            else{
                setWarning(state => {
                    return {...state,password:""}
                })
            }

            return false
        }
        setWarning(state => {
            return {...state,password:"",username:""}
        })
        return true
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!validateForm()){
            console.log("abort login..")
          return  
        }
        // clear all the warning before submitting the form
        setWarning({
            username : "",
            password : "",
            credentials :""
        })
        onLogin(username,password,setInvalidCredentials)
    }
    return (
        <div className="login-register-form-container">  
            <form className="login-register-form" onSubmit={handleSubmit}>
                <div className="form-heading">
                    <h2>Sign In to Continue</h2>
                </div>
                <WarningBordered value = {warning.credentials}/>
                <div className="form-element">
                    <label className="login-register-label">
                        <FontAwesomeIcon icon={faUser} />
                        <input 
                            type="text" 
                            name="username" 
                            placeholder="Username" 
                            value={username}
                            onChange={(e)=>{setUsername(e.target.value)}} 
                        />
                    </label>
                    <Warning value={warning.username}/>                
                </div>

                <div className="form-element">
                    <label className="login-register-label">
                        <FontAwesomeIcon icon={faLock}/>
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="Password"
                            value={password} 
                            onChange={(e) => {setPassword(e.target.value)}} 
                        />
                    </label>
                    <Warning value={warning.password}/>
                </div>
                <div className="form-element">
                    <a className="forget-pass" href="#">Forget password?</a>
                </div>

                <div className="form-element">
                    <button type="submit">Submit</button>
                </div>

                <div className="form-element">
                    <span className="register">Don't have an account? <Link to="/register">Register</Link></span>
                </div>
                
            </form>
        </div>
    );
}

