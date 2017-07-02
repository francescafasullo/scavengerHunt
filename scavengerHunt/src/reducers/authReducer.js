import store from '../../store'
const fireBaseFunctions = require('../../database/firebase');
import { writeUserData } from '../../database/firebase'
import firebase from 'firebase'

/* ------------------ actions ------------------------ */
const SET_LOGGED_USER = 'SET_LOGGED_USER'

/* ------------------ action creators ---------------- */
export const setLoggedUser = (userId) => ({ type: SET_LOGGED_USER, userId })

/* ------------------ reducer ------------------------ */
const initialAuthState = {
	userId: undefined
}

const authReducer = (state = initialAuthState, action) => {
	switch (action.type) {
		case SET_LOGGED_USER:
			return Object.assign({}, state, { userId: action.userId });
		default:
			return state;

	}

}



/* ------------------ dispatchers ------------------- */

export const signUp = (username, email, password) => dispatch =>
	firebase.auth().createUserWithEmailAndPassword(email, password)
		.then(res =>
			writeUserData(res.uid, username, email, 500, "url")).catch(function (error) {
				// Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;
				// ...
			});;



export const login = (email, password) => dispatch =>
	firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		// ...
	});;


export const logout = () => dispatch =>
	firebase.auth().signOut();






export default authReducer



