import store from '../../store'
const fireBaseFunctions = require('../../database/firebase');
import firebase from 'firebase';
const geoFire = require('../../database/firebase.js').geoFire
import { readUserMaps, readUserInfo, database, associateScavengerItemToMap, associateUserToMap, writeUserScavengerHuntMap, writeUserScavengerHuntItem, readOneMap, readItemInfo, readMapsItemsInfo } from '../../database/firebase'
import axios from 'axios'


/* ------------------ actions ------------------------ */
SET_USER_MAPS = 'SET_USER_MAPS'
SET_CUR_MAP = 'SET_CUR_MAP'
SET_USER_INFO = 'SET_USER_INFO'
SET_CUR_ITEM = 'SET_CUR_ITEM'
ADD_MAP = 'ADD_MAP'
SET_VENUE_ID = 'SET_VENUE_ID'
SET_ITEM_OFF = 'SET_ITEM_OFF'
RESET_MAP_ITEMS = 'RESET_MAP_ITEMS'
ADD_ITEM_TO_BANK = 'ADD_ITEM_TO_BANK'
RESET_BANK = 'RESET_BANK'
SET_CUR_MAP_ITEMS = 'SET_CUR_MAP_ITEMS'

SET_VENUE_ID = 'SET_VENUE_ID'

/* ------------------ action creators ---------------- */
export const setUserMaps = (maps) => ({ type: SET_USER_MAPS, maps });
export const setCurMap = (map) => ({ type: SET_CUR_MAP, map });
export const setUserPersonalInfo = (userInfo) => ({ type: SET_USER_INFO, userInfo })
export const setCurItem = (item) => ({ type: SET_CUR_ITEM, item })
export const addMap = (map) => ({ type: ADD_MAP, map })
export const setId = (venueId, latitude, longitude) => ({ type: SET_VENUE_ID, venueId, latitude, longitude })
export const takeItemOff = (item) => ({type: SET_ITEM_OFF, item})
export const turnOnItems = () => ({type: RESET_MAP_ITEMS})
export const addVisitedItemToBank = (item) => ({type: ADD_ITEM_TO_BANK, item})
export const resetBank = () => ({type: RESET_BANK})
export const setCurrentMapItems = (items) => ({type: SET_CUR_MAP_ITEMS, items})



/* ------------------ reducer ------------------------ */
const initialMyAccountState = {
	maps: [],
	map: {},
	userPersonalInfo: {},
	venueId: '',
	curItem: "",
	itemBank: [],
	items: []
}

const myAccountReducer = (state = initialMyAccountState, action) => {
	const newState = Object.assign({}, state)
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
    case SET_VENUE_ID:
			return Object.assign({}, state, { venueId: action.venueId, latitude: action.latitude, longitude: action.longitude })
		case SET_ITEM_OFF:
			newState.map.items[action.item] = false
			return newState
    case RESET_MAP_ITEMS:
			if (newState.map.items) {
				itemKeys = Object.keys(newState.map.items)
				itemKeys.map((item) => newState.map.items[item] = true)
			}
			return newState
    case ADD_ITEM_TO_BANK:
			newState.itemBank.push(action.item)
			return newState
    case RESET_BANK:
			newState.itemBank = []
			return newState
		case SET_CUR_MAP_ITEMS:
			return Object.assign({}, state, {items: action.items})
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

export const fetchCurrentMapItems = (mapId) => dispatch => {
	let res = readOneMap(mapId)
	res.then(data => {
		let result = readMapsItemsInfo(data.items)
		result.then((data) => {
			console.log('items', data)
			dispatch(setCurrentMapItems(data))
		})
	})
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

export const newItem = (name, description, latitude, longitude, imagePath, mapId) => dispatch => {
	let itemKey = database.ref('scavenger_hunt_items/').push().key
	writeUserScavengerHuntItem(itemKey, name, description, latitude, longitude, imagePath)
	geoFire.set({ [itemKey]: [latitude, longitude] })
	associateScavengerItemToMap(mapId, itemKey)

	let selectedMap = readOneMap(mapId)
	selectedMap.then((map) => {
		dispatch(setCurMap(map))
	})
}

export const setUserSelectedMap = (map) => dispatch => {
	dispatch(setCurMap(map));
}

export const setVenueId = (id, latitude, longitude) => dispatch => {
	dispatch(setId(id, latitude, longitude))
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

export const resetItemBank = () => dispatch => {
	dispatch(resetBank())
}

export const addItemToBank = (key) => dispatch => {
	let itemPromise = readItemInfo(key)
	let item = {
		'name': "",
		'address': "",
		'date': ""
	}
	item.date = new Date()
	itemPromise.then(data => {
		item.name = data.name
		item.image = data.imagePath
		return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${data.latitude},${data.longitude}&sensor=true`)
	})
	.then((data)=>{
		if(data.data){
			if(data.data.results){
				item.address = data.data.results[0].formatted_address
			}
			dispatch(addVisitedItemToBank(item))
		}
		}).catch(err => console.log(err))

	



}

export default myAccountReducer;
