import * as actionTypes from "./actionTypes.js";
import axios from "axios"


import jwt_decode from "jwt-decode";

const instance = axios.create({
  baseURL: "https://the-index-api.herokuapp.com"
});

export const login = (userData) => {
	return async dispatch => {
		try {
			const res = await instance.post(
				'/login/',
				userData
			)

			const token = res.data.token

			console.log("res.data: ", res.data)

			//dispatching setCurrent user here
			// w/ token
			dispatch(setCurrentUser(token)) 
		} catch(e) {
			console.log(e);
		}
	}
};

export const signup = (userData) => {
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
		user = jwt_decode(token)
		axios.defaults.headers.common.Authorization = `JWT ${token}`
		console.log("decoded user", user)
	} else {
		delete axios.defaults.headers.common.Authorization
	}

	return {
		type: actionTypes.SET_CURRENT_USER,
		payload: user
	}
};