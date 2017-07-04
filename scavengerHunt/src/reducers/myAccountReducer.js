import store from '../../store'
const fireBaseFunctions = require('../../database/firebase');
import firebase from 'firebase';
import { readUserMaps, readUserInfo } from '../../database/firebase'


/* ------------------ actions ------------------------ */
SET_USER_MAPS = 'SET_USER_MAPS'
SET_CUR_MAP = 'SET_CUR_MAP'
SET_USER_INFO = 'SET_USER_INFO'
SET_CUR_ITEM = 'SET_CUR_ITEM'


/* ------------------ action creators ---------------- */
export const setUserMaps = (maps) => ({ type: SET_USER_MAPS, maps });
export const setCurMap = (map) => ({ type: SET_CUR_MAP, map });
export const setUserPersonalInfo = (userInfo) => ({ type: SET_USER_INFO, userInfo })
export const setCurItem = (item) => ({ type: SET_CUR_ITEM, item })

/* ------------------ reducer ------------------------ */
const initialMyAccountState = {
	maps: [],
	map: {},
	userPersonalInfo: {},
	curItem: {}
}

const myAccountReducer = (state = initialMyAccountState, action) => {
	switch (action.type) {
		case SET_USER_MAPS:
			return Object.assign({}, state, { maps: action.maps });
		case SET_CUR_MAP:
			return Object.assign({}, state, { map: action.map });
		case SET_USER_INFO:
			return Object.assign({}, state, { userPersonalInfo: action.userInfo })
		case SET_CUR_ITEM:
			return Object.assign({},state, {curItem: action.item})
		default:
			return state;

	}
}

/* ------------------ dispatchers ------------------- */

export const fetchUserMaps = (userId) => dispatch => {
	console.log('in fetchUserMaps', userId);
	if (!userId)
		dispatch(setUserMaps([]));
	else {
		let res = readUserMaps(userId);
		res.then(data => {
			console.log('data for uid', userId, '::', data)
			dispatch(setUserMaps(data));
		}).catch(function (error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			// ...
		});

	}


}

export const fetchUserPersonalInfo = (userId) => dispatch => {
	console.log('in fetch user info', userId);
	if (!userId)
		dispatch(setUserPersonalInfo({}));
	else {
		let res = readUserInfo(userId);
		res.then(data => {
			console.log('data of user', userId, '::', data);
			dispatch(setUserPersonalInfo(data));
		}).catch(function (error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			// ...
		});
	}

}

export const setUserSelectedMap = (map) => dispatch => {
	dispatch(setCurMap(map));

}

export const setUserCurLocation = (item) => dispatch => {
	dispatch(setCurItem(item))
}

export default myAccountReducer;
