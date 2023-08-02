import {faUser,faLock,faEnvelope} from "@fortawesome/free-solid-svg-icons"
import { useRef, useState } from "react"
import { Link,useNavigate } from "react-router-dom"
import './login.css'
import { LoginRegisterInput, Warning, WarningBordered } from "./children/Children"
import { isEmailValid, isPasswordValid, isUsernameValid } from "../utils/validation"
import debounce from '../utils/debounce'

const Register = () => {
	const formData = useRef({
		username:"",
		email:"",
		password:"",
		confirmPassword:""
	})
	const [ formWarning ,setFormWarning ] = useState({
		username:"",
		email:"",
		password:"",
		confirmPassword:"",
		server:""
	})
	const navigate = useNavigate()
	// const debouncedSetField = useCallback(debounce(setField),[])
	function validateUsername(username){
		const {status,message} = isUsernameValid(username)
		setFormWarning(state => ({...state, username:message}))
		return status
	}
	function validateEmail(email){
		const {status,message} = isEmailValid(email)
		setFormWarning(state => ({...state, email:message}))
		return status
	}

	function validatePassword(password){
		// check if the current password is empty and if not empty and both
		// password doesnt match display error message for both passwords
		if(formData.current.confirmPassword !=="" ){
			setFormWarning(state => ({...state, confirmPassword:""}))
			if(password !== formData.current.confirmPassword){
				setFormWarning(state => ({...state, confirmPassword:"password dosen't match"}))


			}
			else{
				setFormWarning(state => ({...state, confirmPassword:""}))
	
			}
		}
		const {status,message} = isPasswordValid(password)
		setFormWarning(state => ({...state, password:message}))
		return status
	}
	function validateConfirmPassword(confPassword){
		if(formData.current.password === confPassword){
			setFormWarning(state => ({...state, confirmPassword:""}))
			return true
		}
		setFormWarning(state => ({...state, confirmPassword:"password dosen't match"}))
		return false
	}
	const debouncedValidateUsername = debounce(validateUsername,900)
	const debouncedValidateEmail = debounce(validateEmail,900)
	const debouncedValidatePassword = debounce(validatePassword,900)
	const debouncedValidateConfirmPassword = debounce(validateConfirmPassword,900)
	const formInputFields = {
		username:{
			name:"username",
			type:"text",
			icon:faUser,
			placeholder:"username",
			value:formData.username,
			handleChange:(e) => {
				formData.current.username = e.target.value
				debouncedValidateUsername(e.target.value)
			},		
		},
		email:{
			name:"email",
			type:"email",
			icon:faEnvelope,
			placeholder:"email",
			value:formData.email,
			 handleChange:(e) => {
				formData.current.email = e.target.value
				debouncedValidateEmail(e.target.value)
			}
		},		
		password:{
			name:"password",
			type:'password',
			icon:faLock,
			placeholder:"password",
			value:formData.password,
			handleChange:(e) => {
				formData.current.password = e.target.value
				debouncedValidatePassword(e.target.value)
			},
		},
		confirmPassword:{
			name:"confirmPassword",
			type:"password",
			icon:faLock,
			placeholder:"confirm password",
			// value:formData.confirmPassword,
			handleChange:(e) => {
				formData.current.confirmPassword = e.target.value
				debouncedValidateConfirmPassword(e.target.value)
			},
		}
	}
	// function to handle form submition
	const handleRegister = (e) => {
		e.preventDefault()
		const data =formData.current
		// clear error messages from previous fetch
		// perfrom all the validation
		if(
			validateUsername(data.username) &&
			validateEmail(data.email) &&
			validatePassword(data.password) &&
			validateConfirmPassword(data.confirmPassword)
		){

			const url = "http://127.0.0.1:8000/api/register-user/"
			const options = {
				method: 'POST',
				credentials: 'include',
				headers:{
					'Content-type' : 'application/json'
				},
				body:JSON.stringify({
					username:data.username,
					email:data.email,
					password:data.password
				})
			}
			fetch(url,options)
			.then((res) =>{
				if(res.ok){
					setFormWarning(state => ({...state,server:"user created successfully"}))
					setTimeout(() =>{
						navigate('/login')
					},500)
				}
				else if(res.status === 409){
					setFormWarning(state => ({...state,server:"username already exist please try another one"}))
				}
				else if(res.status === 429 ){
					setFormWarning(state => ({...state,server:"Too many requests. Please wait a moment and try again later"}))
				}
				return res.json()
			})
			.catch(e => {
				setFormWarning(state => ({...state,server:e}))
			})
		}
		else
			setFormWarning(state => ({...state,server:""}))
		}
  	return <div className='login-register-form-container'>
		<form  className='login-register-form' onSubmit={handleRegister}>
			<div className="form-heading">
				<h2>Create an account</h2>
			</div>
			<WarningBordered value = {formWarning.server}/>

			<LoginRegisterInput  {...formInputFields.username}/>
			<Warning value={formWarning.username}/>
			<LoginRegisterInput {...formInputFields.email}/>
			<Warning value={formWarning.email}/>
			<LoginRegisterInput {...formInputFields.password}/>	
			<Warning value={formWarning.password}/>
			<LoginRegisterInput {...formInputFields.confirmPassword}/>
			<Warning value={formWarning.confirmPassword}/>
			<div className="form-element">
				<span>Already have an account ? <Link to="/login">Sign in</Link></span>
            </div>
			<div className="form-element">
                <button type="submit">Sign up</button>
            </div>					
		</form>

	</div>
}

export default Register
