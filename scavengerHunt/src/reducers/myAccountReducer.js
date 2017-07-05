import store from '../../store'
const fireBaseFunctions = require('../../database/firebase');
import firebase from 'firebase';
import { readUserMaps, readUserInfo, database, associateScavengerItemToMap, associateUserToMap, writeUserScavengerHuntMap, writeUserScavengerHuntItem, readOneMap } from '../../database/firebase'


/* ------------------ actions ------------------------ */
SET_USER_MAPS = 'SET_USER_MAPS'
SET_CUR_MAP = 'SET_CUR_MAP'
SET_USER_INFO = 'SET_USER_INFO'
ADD_MAP = 'ADD_MAP'


/* ------------------ action creators ---------------- */
export const setUserMaps = (maps) => ({ type: SET_USER_MAPS, maps });
export const setCurMap = (map) => ({ type: SET_CUR_MAP, map });
export const setUserPersonalInfo = (userInfo) => ({ type: SET_USER_INFO, userInfo })
export const addMap = (map) => ({ type: ADD_MAP, map })

/* ------------------ reducer ------------------------ */
const initialMyAccountState = {
	maps: [],
	map: {},
	userPersonalInfo: {}
}

const myAccountReducer = (state = initialMyAccountState, action) => {
	switch (action.type) {
		case SET_USER_MAPS:
			return Object.assign({}, state, { maps: action.maps });

		case SET_CUR_MAP:
			return Object.assign({}, state, { map: action.map });

		case SET_USER_INFO:
			return Object.assign({}, state, { userPersonalInfo: action.userInfo })

		case ADD_MAP:
			return Object.assign({}, state, { maps: state.maps.push(action.map), map: action.map })

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

export const newMap = (mapName, mapRegion, description, location, places, userId) => dispatch => {
	var mapKey = database.ref('scavenger_hunt_map/').push().key
	var date = new Date()
	writeUserScavengerHuntMap(mapKey, mapName, mapRegion, description, location, date)
	var itemKeys = []
	for (i = 0; i < places.length; i++) {
		itemKeys.push(database.ref('scavenger_hunt_items/').push().key)
		database.ref('scavenger_hunt_items/' + itemKeys[i]).set({
			mapName: mapName,
			category: "Hidden Pusheen",
			latitude: places[i].coordinate.latitude,
			longitude: places[i].coordinate.longitude
		})
	}

	for (i = 0; i < itemKeys.length; i++) {
		associateScavengerItemToMap(mapKey, itemKeys[i])
	}

	let selectedMap = readOneMap(mapKey)

	selectedMap.then((map) => {
		dispatch(setCurMap(map))
	})
	associateUserToMap(userId, mapKey)
}

export const setUserSelectedMap = (map) => dispatch => {
	dispatch(setCurMap(map));

}

export default myAccountReducer;
