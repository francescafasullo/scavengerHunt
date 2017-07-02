import store from '../../store'
const fireBaseFunctions = require('../../database/firebase');
import { writeUserData } from '../../database/firebase'
import { database } from '../../database/firebase'
import { associateScavengerItemToMap } from '../../database/firebase'
import {associateUserToMap} from '../../database/firebase'
import {writeUserScavengerHuntMap} from '../../database/firebase'
import {writeUserScavengerHuntItem} from '../../database/firebase'
import firebase from 'firebase'

/* ------------------ actions ------------------------ */
const ADD_MAP = 'ADD_MAP'


/* ------------------ action creators ---------------- */
export const addMap = (map) => ({ type: ADD_MAP, map })



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
		default:
			return initialMapsState;

	}
	return newState

}



/* ------------------ dispatchers ------------------- */

export const newMap = (mapName, description, city, places,userId) => dispatch => {
	var mapKey = database.ref('scavenger_hunt_map/').push().key
	var date = new Date()
	writeUserScavengerHuntMap(mapKey, mapName, description, city, date)

	var itemKeys = []
	for (i = 0; i < places.length; i++) {
		itemKeys.push(database.ref('scavenger_hunt_items/').push().key)
		writeUserScavengerHuntItem(itemKeys[i], mapName, places[i].coordinate.latitude, places[i].coordinate.longitude )
	}

	associateUserToMap(userId, mapKey)

	for (i = 0; i < itemKeys.length; i++) {
		associateScavengerItemToMap(mapKey, itemKeys[i])
	}
}

export default mapsReducer



