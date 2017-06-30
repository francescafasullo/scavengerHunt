import store from '../../store'
const fireBaseFunctions = require('../../database/firebase');
import {writeUserData} from '../../database/firebase'
import {database} from '../../database/firebase'
import firebase from 'firebase'

/* ------------------ actions ------------------------ */
const ADD_MAP = 'ADD_MAP'

/* ------------------ action creators ---------------- */
export const addMap = (map) => ({ type: ADD_MAP, map})

/* ------------------ reducer ------------------------ */
const initialMapsState = {
	maps:[],
	selectedMap: {}
}

const mapsReducer = (state = initialMapsState, action) => {
	const newState = Object.assign({}, state)	
	switch (action.type) {
		case ADD_MAP:
			newState.maps.push(action.map)
		default:
			return initialMapsState;

	}

}



/* ------------------ dispatchers ------------------- */

export const newMap = (mapId, city, places) => dispatch => 
	database.ref('scavenger_hunt_map/' + mapId).set({
		city: city,
		places: places
	})
	
export default mapsReducer



