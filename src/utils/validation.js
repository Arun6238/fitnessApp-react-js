function returnObject(status=false,message="invalid input"){
	return {
		status:status,
		message:message
	}
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isEmailValid(email) {
	if (!email) {
		return returnObject(false, "Email address cannot be empty.");
	  }
	// true if the emial is in invalid pattern
	const pattern =  !emailRegex.test(email);
	// true if the email contain white space
	const  whiteSpace = email.indexOf(" ") !== -1

	if(pattern && whiteSpace) {
		return returnObject(false,"email format is invalid, and whitespace is not allowed")
	}
	if(pattern){
		return returnObject(false,"invalid email format")
	}
	if(whiteSpace){
		return returnObject(false,"email address should not contain whitespace")
	}
	return returnObject(true,"")
  }


export function isUsernameValid (username) {
	if (!username) {
		return returnObject(false, "username cannot be empty.");
	  }
	// true if user name contain white space
	const whitespace = username.indexOf(" ") !== - 1
	// true if length is invalid 
	const length = username.length < 3 || username.length >16
	if(whitespace && length) 
		return returnObject(false,"username must be atleast 3 to 6 characters long and whitespace is not allowed")
	if(whitespace)
		return returnObject(false , "username should not contain whitespace")
	if(length) 
		return returnObject(false,"username must be atleast 3 to 6 characters long")
	return returnObject(true,"")
}

export function isPasswordValid(password){
	if (!password) {
		return returnObject(false, "password cannot be empty.");
	  }
	const length = password.length < 8
	const whiteSpace = password.indexOf(" ") !== -1

	if(length && whiteSpace) {
		return returnObject(false,"password must be atleast 8 characters long and whitespace is not allowed")
	}
	if(length){
		return returnObject(false,"password must be atleast 8 characters long")
	}
	if(whiteSpace){
		return returnObject(false,"password should not contain whitespace")
	}
	return returnObject(true,"")
} 

