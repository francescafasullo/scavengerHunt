import store from '../../store'
const fireBaseFunctions = require('../../database/firebase');
import firebase from 'firebase';
import {readUserMaps} from '../../database/firebase'


/* ------------------ actions ------------------------ */
SET_USER_MAPS = 'SET_USER_MAPS'
SET_CUR_MAP = 'SET_CUR_MAP'


/* ------------------ action creators ---------------- */
export const setUserMaps = (maps) => ({type: SET_USER_MAPS, maps });
export const setCurMap = (map) => ({type: SET_CUR_MAP, map});

/* ------------------ reducer ------------------------ */
const initialAuthState = {
	maps: [],
	map: {}
}

const myAccountReducer = (state = initialAuthState, action) => {
	switch(action.type) {
		case SET_USER_MAPS:
			return Object.assign({}, state, {maps: action.maps});
		case SET_CUR_MAP:
			return Object.assign({}, state, {map: action.map});
		default: 
			return initialAuthState;

	}
}

/* ------------------ dispatchers ------------------- */

export const fetchUserMaps = (userId) => dispatch => {
	console.log('in fetchUserMaps', userId);
	let res = readUserMaps(userId);
	//res.then(data => {console.log('data for uid', userId, '::', data)})
	//.catch(console.error)

	console.log('in fetchUserMaps maps', res);
	
	//let res = null;
	//dispatch(setUserMaps(res));
}

export default myAccountReducer;
