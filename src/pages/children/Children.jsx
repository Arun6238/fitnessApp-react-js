import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

export const  LoginRegisterInput = (props) =>{
	return<div className="form-element">
		<label className="login-register-label">
			<FontAwesomeIcon icon={props.icon}/>
			<input 
				type={props.type}  
				name={props.name}
				autoComplete="off"
				placeholder={props.placeholder}
				value={props.value}		
				onChange={props.handleChange}
				onBlur={props.onBlur}
				required
			/>
		</label>
	</div>
}

export const Warning = ({value}) => {
    return <>
        {value?<span className="login-register-warning">{value}</span>:null}
    </>
}
export const WarningBordered = ({value}) => {
    return <>
        {value?<div className="login-register-warning-bordered">{value}</div>:null}
    </>
}