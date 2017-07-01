import store from '../../store'
const fireBaseFunctions = require('../../database/firebase');
import { writeUserData } from '../../database/firebase'
import { database } from '../../database/firebase'
import { associateScavengerItemToMap } from '../../database/firebase'
import firebase from 'firebase'

/* ------------------ actions ------------------------ */
const ADD_MAP = 'ADD_MAP'
const FETCH_MAP = 'FETCH_MAP'

/* ------------------ action creators ---------------- */
export const addMap = (map) => ({ type: ADD_MAP, map })
export const fetchMaps = (map) => ({ type: FETCH_MAPS, map })


/* ------------------ reducer ------------------------ */
const initialMapsState = {
	maps: [],
	selectedMap: {}
}

const mapsReducer = (state = initialMapsState, action) => {
	const newState = Object.assign({}, state)
	switch (action.type) {
		case ADD_MAP:
			newState.maps.push(action.map)
			break;
		case FETCH_MAPS:
			newState.selectedMap = action.selectedMap
			break;
		default:
			return initialMapsState;

	}
	return newState

}



/* ------------------ dispatchers ------------------- */

export const newMap = (mapName, description, city, places) => dispatch => {
	var mapKey = database.ref('scavenger_hunt_map/').push().key
	database.ref('scavenger_hunt_map/' + mapKey).set({
		mapName: mapName,
		description: description,
		city: city,
	})
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
	const map = {
		mapName: mapName,
		description: description,
		city: city,
		places: places
	}
	dispatch(addMap(map))
}

export const getMaps = () => dispatch => {
	database.ref('/scavenger_hunt_map').once('value').then(data => {
		console.log(data.val())
	})
}

export default mapsReducer



