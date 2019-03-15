import * as actionTypes from "./actionTypes.js";
import axios from "axios"


import jwt_decode from "jwt-decode";




const instance = axios.create({
  baseURL: "https://the-index-api.herokuapp.com"
});


export const checkForExpiredToken = () => {
  return dispatch => {
    // Get token
    const token = localStorage.getItem("token");

    if (token) {
      const currentTime = Date.now() / 1000;

      // Decode token and get user info
      const user = jwt_decode(token);

      console.log((user.exp - currentTime) / 60);

      // Check token expiration
      if (user.exp >= currentTime) {
        // Set auth token header
        // setAuthToken(token);

        // Set user
        dispatch(setCurrentUser(token));
      } else {
        dispatch(logout());
      }
    }
  };
};

export const login = (userData, history) => {
	return async dispatch => {
		console.log("ACTIONS login");
		try {
			console.log("ACTIONS login - post");
			const res = await instance.post(
				"/login/",
				userData
			)

			console.log("ACTIONS login");
			const token = res.data.token

			console.log("res.data: ", res.data)

			//dispatching setCurrent user here
			// w/ token
			dispatch(setCurrentUser(token))
			history.push("/authors") 
		} catch(e) {
			console.error(e);
		}
	}
};

export const signup = (userData, history) => {
	return async dispatch => {
		try {
			const res = await instance.post(
				'/signup/',
				userData
			)
			
			const token = res.data.token
			console.log("signup res.data: ", res.data)

			//dispatching setCurrent user here
			// w/ token
			dispatch(setCurrentUser(token)) 
			history.push("/authors")
		} catch(e) {
			console.log(e);
		}
	}
};

export const logout = (token) => {
	return dispatch => {
		setCurrentUser()
	} 
};


const setCurrentUser = token => {
	let user;
	if (token) {
		let user = jwt_decode(token)
		
		localStorage.setItem("token", token);
		
		axios.defaults.headers.common.Authorization = `JWT ${token}`
		console.log("decoded user", user)
	} 

	// for logout
	else {
		localStorage.removeItem("token");
		delete axios.defaults.headers.common.Authorization
	}

	return {
			type: actionTypes.SET_CURRENT_USER,
			payload: user
		}
};