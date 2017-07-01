import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './src/reducers';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import firebase from 'firebase';
import {setLoggedUser} from './src/reducers/authReducer'
import {fetchUserMaps,fetchUserPersonalInfo} from './src/reducers/myAccountReducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, logger))
);

firebase.auth().onAuthStateChanged(user => {
		store.dispatch(setLoggedUser(user ? user.uid : null));
		store.dispatch(fetchUserMaps(user ? user.uid : null));
		store.dispatch(fetchUserPersonalInfo(user ? user.uid : null));
		
		

});



export default store;