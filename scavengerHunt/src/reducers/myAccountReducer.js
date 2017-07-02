import store from '../../store'
const fireBaseFunctions = require('../../database/firebase');
import firebase from 'firebase';
import {readUserMaps, readUserInfo} from '../../database/firebase'


/* ------------------ actions ------------------------ */
SET_USER_MAPS = 'SET_USER_MAPS'
SET_CUR_MAP = 'SET_CUR_MAP'
SET_USER_INFO = 'SET_USER_INFO'


/* ------------------ action creators ---------------- */
export const setUserMaps = (maps) => ({type: SET_USER_MAPS, maps });
export const setCurMap = (map) => ({type: SET_CUR_MAP, map});
export const setUserPersonalInfo = (userInfo) => ({type: SET_USER_INFO, userInfo})

/* ------------------ reducer ------------------------ */
const initialMyAccountState = {
	maps: [],
	map: {},
	userPersonalInfo: {}
}

const myAccountReducer = (state = initialMyAccountState, action) => {
	switch(action.type) {
		case SET_USER_MAPS:
			return Object.assign({}, state, {maps: action.maps});
		case SET_CUR_MAP:
			return Object.assign({}, state, {map: action.map});
		case SET_USER_INFO:
			return Object.assign({},state, {userPersonalInfo: action.userInfo})
		default: 
			return state;

	}
}

/* ------------------ dispatchers ------------------- */

export const fetchUserMaps = (userId) => dispatch => {
	console.log('in fetchUserMaps', userId);
	if(!userId)
		dispatch(setUserMaps([]));
	else {
		let res = readUserMaps(userId);
		res.then(data => {
			console.log('data for uid', userId, '::', data)
			dispatch(setUserMaps(data));
		})

	}
	
	
}

export const fetchUserPersonalInfo = (userId) => dispatch =>{
	console.log('in fetch user info', userId);
	if(!userId)
		dispatch(setUserPersonalInfo({}));
	else {
		let res = readUserInfo(userId);
		res.then(data => {
			console.log('data of user', userId, '::', data);
			dispatch(setUserPersonalInfo(data));
		})
	}
	
} 

export const setUserSelectedMap = (map) => dispatch => {
	dispatch(setCurMap(map));

}

export default myAccountReducer;
