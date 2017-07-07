const firebase = require('firebase')
const GeoFire = require('geofire')

var config = {
  apiKey: "AIzaSyDgSoVrvjyZTFsT3Udks1x0KkGZGrYjThQ",
  authDomain: "scavngo-da953.firebaseapp.com",
  databaseURL: "https://scavngo-da953.firebaseio.com",
  projectId: "scavngo-da953",
  storageBucket: "",
  messagingSenderId: "80431684805"
};

//  Initializes the Firebase SDK
firebase.initializeApp(config)

// Creates a reference to the Firebase database service where we will store information
var database = firebase.database()
var firebaseRef = database.ref('geoFire/')

// Creates a GeoFire index
var geoFire = new GeoFire(firebaseRef)

function writeUserData(userId, name, email, score, profile_picURL) {
  database.ref('users/' + userId).set({
    username: name,
    email: email,
    score: score,
    profile_pic: profile_picURL
  })
}


function writeUserScavengerHuntMap(key, name, description, location, date){
  database.ref('scavenger_hunt_map/' + key).set({
    key: key,
    mapname: name,
    description: description,
	  location: location,
    date: date
  })
}

//functions for seeding
function createOneUser(username, email, password){
	return firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(res => {
            	writeUserData(res.uid, username, email, 500, "url");
            	return res.uid
            });


}
function newMap (mapName, description, location, userId) {
    var mapKey = database.ref('scavenger_hunt_map/').push().key
    var date = new Date()
    writeUserScavengerHuntMap(mapKey, mapName, description, location, date)

    associateUserToMap(userId, mapKey)

}

function createItemsToDefaultMapDownTown() {
	let places = [{
		'coordinate': {'latitude': 40.7052066,'longitude': -74.0103288999999},
		'title': "Open Market",
		'description': "A deli",
		'image': "../public/restaurantPusheen.png"
	},{
		'coordinate': {'latitude': 40.7039915,'longitude':-74.0110917},
		'title': "La Pen Quotidien",
		'description': "A restaurant with healthy food",
		'image': "../public/restaurantPusheen.png"
	},{
		'coordinate': {'latitude': 40.7065557,'longitude':-74.0090503},
		'title': "Museum of American Finance",
		'description': "A museum for American finance history",
		'image': "../public/museumPusheen.png"
	},{
    'coordinate': {'latitude': 40.705076,'longitude':-74.009160},
    'title': "Grace hopper museum",
    'description': "A museum for computer science history",
    'image': "../public/museumPusheen.png"

  }];

	return places;

}

function createItemsToDefaultMapUpTown() {
	let places = [{
		'coordinate': {'latitude': 40.775725,'longitude': -73.950204},
		'title': "Nica Trattoria",
		'description': "An italian restaurant",
		'image': "../public/restaurantPusheen.png"
	},{
		'coordinate': {'latitude': 40.775998,'longitude':-73.951918},
		'title': "Jax Cafe",
		'description': "An internet cafe",
		'image': "../public/restaurantPusheen.png"
	},
	{
		'coordinate': {'latitude': 40.774246,'longitude':-73.945809},
		'title': "Zangi Cafe",
		'description': "A home coffee",
		'image': "../public/restaurantPusheen.png"

	},
  {
    'coordinate': {'latitude': 40.774441,'longitude':-73.946303},
    'title': "Yorkville Cafe",
    'description': "A local coffee",
    'image': "../public/restaurantPusheen.png"
  }];

	return places;

}
//////////////////////////////////////////////////////////////////////////////
function writeUserScavengerHuntItem(key, name, description, latitude, longitude, imagePath){
	database.ref('scavenger_hunt_items/' + key).set({
		name: name,
		latitude: latitude,
		longitude: longitude,
		key: key,
    description: description,
    imagePath: imagePath
	})
}


function writeCategory(name, description) {
  database.ref('location_categories/' + name).set({
    description: description
  })
}

// setting the update object to be added to the database
function addCategoryToScavengerHuntItem(itemId, categoryName) {
  let update = {};
  update['/scavenger_hunt_items/' + itemId + '/category/' + categoryName] = true;
  return database.ref().update(update);
}

// assosiating a scavenger hunt item to a map, both the item and the map should have reference to each other
function associateScavengerItemToMap(mapId, scavengerItemId){
	let update={};
	update['/scavenger_hunt_map/'+mapId+'/items/'+scavengerItemId] = true;
	update['/scavenger_hunt_items/'+scavengerItemId+'/maps/'+mapId] = true;
	return database.ref().update(update);

}


function associateUserToMap(userId, mapId){
  let update={};
  update['/users/'+userId+'/maps/'+mapId] = true;
  update['/scavenger_hunt_map/'+mapId+'/users/'+userId] = true;
  return database.ref().update(update);
}

// help functions to re-construct data retrieved from db
// takes an array of maps keys and maps them to an array of map objects
// that each one would have the map info
function readMapsInfo(maps) {
  let res = maps.map((item) => {
    return database.ref('/scavenger_hunt_map/' + item).once('value')
  });
  return Promise.all(res).then(values => {
    let mapInfoArr = values.map(item => {
      return item.val();
    })
    return mapInfoArr;
  })
    .catch((error) => { console.log(error) })
}

function readMapsItemsInfo(items) {
  let keys = Object.keys(items)
  let res = keys.map((key) => {
    return database.ref('/scavenger_hunt_items/' + key).once('value')

  });
  return Promise.all(res).then (values => {
    let itemInfoArr = values.map(item => {
      return item.val();
    })
    return itemInfoArr;
  })
    .catch((error) => { console.log(error) })
}

//read one item info
function readItemInfo(itemKey){
  return database.ref('/scavenger_hunt_items/' + itemKey).once('value')
    .then((data) => {
      return data.val()
    })
    .then((data) => {
      return data
    })
  }

// readingdata function

function readUserMaps(userId) {
  let mapKeys;
  let mapItemsKeys;
  let userMaps;
  return database.ref('/users/' + userId).once('value')
    .then(data => {
      if (!data.val().maps)
        return null
      mapKeys = Object.keys(data.val().maps);
      return readMapsInfo(mapKeys);
    })
    .then(data => {
      if(!data)
  return null
      userMaps = data;
      return userMaps
    });
}

function readOneMap(mapId) {
  return database.ref('/scavenger_hunt_map/' + mapId).once('value')
    .then((data) => {
      return data.val()
    })
    .then((data) => {
      return data
    })
}

function readUserInfo(userId) {
	let user= {};
	return database.ref('/users/' + userId).once('value')
	.then(data => {
    user.id = userId;
		user.username = data.val().username;
		user.email = data.val().email;
		user.score = data.val().score;
		user.profile_pic = data.val().profile_pic
		return user;
	})
}

function readUserInfo(userId) {
  let user = {};
  return database.ref('/users/' + userId).once('value')
    .then(data => {
      user.username = data.val().username;
      user.email = data.val().email;
      user.score = data.val().score;
      user.profile_pic = data.val().profile_pic
      return user;
    })
}

if(module === require.main) {
  //Seeds scavenger hunt list items in geoFire
  geoFire.set({
    '1': [40.7052066, -74.0103288999999],
    '2': [40.7039915, -74.0110917],
    '3': [40.7043408, -74.0118572],
    '4': [40.7060794, -74.0093213],
    '5': [40.7071269, -74.0118077999999],
    '6': [40.7065557, -74.0090503],
    '7': [40.707258, -74.0103563999999],
    '8': [40.7076346, -74.0107747],
    '9': [40.8010717, -73.93807850000002],

    '10': [40.7761098, -73.951832],
    '-KoIDM9yOe00NT7y5TBx': [40.7052066, -74.0103288999999],
    '-KoIDMA-5Le9I808SRJg': [40.7039915,-74.0110917],
    '-KoIDMA0rEiyyOtmE_C9': [40.7065557,-74.0090503],
    '-KoIDMA1dOlttfWTFPc-': [40.705076, -74.00916]
  }).then(function() {
  }, function(error) {

    console.log('Error: ' + error)
  })
}

module.exports = {
  database: database,
  writeUserData: writeUserData,
  writeUserScavengerHuntMap: writeUserScavengerHuntMap,
  writeUserScavengerHuntItem: writeUserScavengerHuntItem,
  writeCategory: writeCategory,
  addCategoryToScavengerHuntItem: addCategoryToScavengerHuntItem,
  associateScavengerItemToMap: associateScavengerItemToMap,
  associateUserToMap: associateUserToMap,
  geoFire: geoFire,
  readUserMaps: readUserMaps,
  readUserInfo: readUserInfo,
  readOneMap: readOneMap,
  readItemInfo: readItemInfo,
  readMapsItemsInfo: readMapsItemsInfo
}
