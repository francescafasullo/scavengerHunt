import store from '../../store'
const fireBaseFunctions = require('../../database/firebase');
import firebase from 'firebase';
import { readUserMaps, readUserInfo, database, associateScavengerItemToMap, associateUserToMap, writeUserScavengerHuntMap, writeUserScavengerHuntItem, readOneMap } from '../../database/firebase'


/* ------------------ actions ------------------------ */
SET_USER_MAPS = 'SET_USER_MAPS'
SET_CUR_MAP = 'SET_CUR_MAP'
SET_USER_INFO = 'SET_USER_INFO'
SET_CUR_ITEM = 'SET_CUR_ITEM'
ADD_MAP = 'ADD_MAP'
SET_ITEM_OFF = 'SET_ITEM_OFF'
RESET_MAP_ITEMS = 'RESET_MAP_ITEMS'



/* ------------------ action creators ---------------- */
export const setUserMaps = (maps) => ({ type: SET_USER_MAPS, maps });
export const setCurMap = (map) => ({ type: SET_CUR_MAP, map });
export const setUserPersonalInfo = (userInfo) => ({ type: SET_USER_INFO, userInfo })
export const setCurItem = (item) => ({ type: SET_CUR_ITEM, item })
export const addMap = (map) => ({ type: ADD_MAP, map })
export const takeItemOff = (item) => ({type: SET_ITEM_OFF, item})
export const turnOnItems = () => ({type: RESET_MAP_ITEMS})


/* ------------------ reducer ------------------------ */
const initialMyAccountState = {
	maps: [],
	map: {},
	userPersonalInfo: {},
	curItem: ""
}

const myAccountReducer = (state = initialMyAccountState, action) => {
	const newState = Object.assign({},state)
	let itemKeys;
	switch (action.type) {
		case SET_USER_MAPS:
			return Object.assign({}, state, { maps: action.maps });

		case SET_CUR_MAP:
			return Object.assign({}, state, { map: action.map });

		case SET_USER_INFO:
			return Object.assign({}, state, { userPersonalInfo: action.userInfo })
		case SET_CUR_ITEM:
			return Object.assign({},state, {curItem: action.item})
		case ADD_MAP:
			return Object.assign({}, state, { maps: state.maps.push(action.map), map: action.map })
		case SET_ITEM_OFF:
			newState.map.items[action.item] = false
			return newState
		case RESET_MAP_ITEMS:
			if(newState.map.items){
				itemKeys = Object.keys(newState.map.items)
				itemKeys.map((item) => newState.map.items[item] = true)
			}
			return newState
		default:
			return state;

	}
}

/* ------------------ dispatchers ------------------- */

export const fetchUserMaps = (userId) => dispatch => {
	if (!userId) {
		dispatch(setUserMaps([]));
	}
	else {
		let res = readUserMaps(userId);
		res.then(data => {
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
	if (!userId)
		dispatch(setUserPersonalInfo({}));
	else {
		let res = readUserInfo(userId);
		res.then(data => {
			dispatch(setUserPersonalInfo(data));
		}).catch(function (error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
		});
	}

}

export const newMap = (mapName, description, location, userId) => dispatch => {
	var mapKey = database.ref('scavenger_hunt_map/').push().key
	var date = new Date()
	writeUserScavengerHuntMap(mapKey, mapName, description, location, date)

	let selectedMap = readOneMap(mapKey)

	selectedMap.then((map) => {
		dispatch(setCurMap(map))
	})
	associateUserToMap(userId, mapKey)
}

export const setUserSelectedMap = (map) => dispatch => {
	dispatch(setCurMap(map));

}

export const setUserCurLocation = (item) => dispatch => {
	dispatch(setCurItem(item))
}

export const takeItemOfMap = (key) => dispatch => {
	dispatch(takeItemOff(key))
}



export const resetMap = () => dispatch => {
	dispatch(turnOnItems())

}

export default myAccountReducer;
