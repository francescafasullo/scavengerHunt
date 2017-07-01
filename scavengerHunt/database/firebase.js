const firebase = require('firebase')

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
 var firebaseRef = database.ref()

 // Creates a GeoFire index
var geoFire = new GeoFire(firebaseRef)

 function writeUserData(userId, name, email,score,profile_picURL) {
  database.ref('users/' + userId).set({
    username: name,
    email: email,
    score: score,
    profile_pic: profile_picURL
  });
}
function writeScavengerHuntMap(mapId, name, creatorId, description, date){
	database.ref('scavenger_hunt_map/' + mapId).set({
		mapname: name,
		creator_id: creatorId,
		description: description,
		date: date
	})

}


function writeScavengerHuntItem(itemId, name, address, latitude, longitude, category){
	database.ref('scavenger_hunt_items/' + itemId).set({
		name: name,
		address: address,
		latitude: latitude,
		longitude: longitude

	})

}

function writeCategory(name, description){
	database.ref('location_categories/' + name).set({
		description: description
	})

}

function addCategoryToScavengerHuntItem(itemId, categoryName){

	//setting the update object to be added to the datanase
	let update={};
	update['/scavenger_hunt_items/'+itemId+'/category/'+categoryName] = true;
	return database.ref().update(update);
}

//assosiating a scavenger hunt item to a map, both the item and the map should have reference to each other
function associateScavengerItemToMap(mapId, scavengerItemId){
	// let update = {
	// 	['/scavenger_hunt_map/'+mapId+'/items/'+scavengerItemId]: true
	// };
	let update={};
	update['/scavenger_hunt_map/'+mapId+'/items/'+scavengerItemId] = true;
	update['/scavenger_hunt_items/'+scavengerItemId+'/maps/'+mapId] = true;
	return database.ref().update(update);


}

function associateUserToMap(userId,mapId){
	let update={};
	update['/users/'+userId+'/maps/'+mapId] = true;
	update['/scavenger_hunt_map/'+mapId+'/usres/'+userId] = true;
	return database.ref().update(update);

}
if(module === require.main){
	//seeding scavenger hunt items
writeScavengerHuntItem(1,'Open Market', '15 William St, New York, NY 10005, USA', 40.7052066, -74.0103288999999);
writeScavengerHuntItem(2, 'La Pain Quotidien', '85 Broad St, New York, NY 10005, USA', 40.7039915, -74.0110917);
writeScavengerHuntItem(3, 'dig inn', '80 Broad St, New York, NY 10004, USA', 40.7043408, -74.0118572);
writeScavengerHuntItem(4, 'Cipriani Club 55', '55 Wall St, New York, NY 10005, USA', 40.7060794, -74.0093213);
writeScavengerHuntItem(5, 'Haru Sushi', '1 Wall St, New York, NY 10005', 40.7071269, -74.0118077999999);
writeScavengerHuntItem(6, 'Museum of American Finance', '48 Wall St, New York, NY 10005', 40.7065557, -74.0090503);
writeScavengerHuntItem(7, 'Federal Hall', '26 Wall St, New York, NY 10005, USA', 40.707258, -74.0103563999999);
writeScavengerHuntItem(8, 'Keya Gallery', '14 Wall Stt, New York, NY 10005', 40.7076346, -74.0107747)
writeScavengerHuntItem(9, 'CityFresh Market', '2212 3rd Avenue, New York, NY 10035', 40.8010717, -73.93807850000002)

//  Seeds scavenger hunt list items in geoFire
geoFire.set({
  '1': [40.7052066, -74.0103288999999],
  '2': [40.7039915, -74.0110917],
  '3': [40.7043408, -74.0118572],
  '4': [40.7060794, -74.0093213],
  '5': [40.7071269, -74.0118077999999],
  '6': [40.7065557, -74.0090503],
  '7': [40.707258, -74.0103563999999],
  '8': [40.7076346, -74.0107747],
  '9': [40.8010717, -73.93807850000002]
}).then(function() {
  console.log('Provided keys have been added to GeoFire!')
}, function(error) {
  console.log('Error: ' + error)
})

//seeding categories
writeCategory('Restaurant', 'A place to dine');
writeCategory('Cafe', 'A plcae to drink coffee and eat snacks');
writeCategory('Bar', 'A place to go for drinks');
writeCategory('Museum', 'a building in which objects of historical, scientific, artistic, or cultural interest are stored and exhibited');
writeCategory('Gallery', 'a room or building for the display or sale of works of art');

//seeding users in the data base
writeUserData(1, "Stella", "stella@stella.stella",0,"https://i.imgur.com/O5wwwaG.jpg");
writeUserData(2,"Emma","emma@yahoo.com",0,"https://i.imgur.com/akaLrwh.jpg");
writeUserData(3,"John", "john@gmail.com",0,"http://i.imgur.com/xoH7gvu.jpg");

//seeding scavenger hunt maps
writeScavengerHuntMap(1,"NYC john map",3, "john's trip to nyc may 2017","05052017");
writeScavengerHuntMap(2,"NYC wall street",3, "nice places to visit in wall street area","20062017");
writeScavengerHuntMap(3,"wall street dining",2, "great eating spots in wall street area","04032017");
writeScavengerHuntMap(4,"wall street tour",1, "a one day tour in wall street area NYC","10202016");


//adding categories to scavenger hunt items
addCategoryToScavengerHuntItem(1,'Restaurant');
addCategoryToScavengerHuntItem(1,'Cafe');
addCategoryToScavengerHuntItem(2, 'Restaurant');
addCategoryToScavengerHuntItem(2,'Cafe');
addCategoryToScavengerHuntItem(3, 'Restaurant');
addCategoryToScavengerHuntItem(4, 'Restaurant');
addCategoryToScavengerHuntItem(5, 'Restaurant');
addCategoryToScavengerHuntItem(6, 'Museum');
addCategoryToScavengerHuntItem(7, 'Museum');
addCategoryToScavengerHuntItem(8, 'Gallery');

//associating maps and items
associateScavengerItemToMap(1,1);
associateScavengerItemToMap(1,2);
associateScavengerItemToMap(1,6);
associateScavengerItemToMap(2,3);
associateScavengerItemToMap(2,8);
associateScavengerItemToMap(3,3);
associateScavengerItemToMap(3,1);
associateScavengerItemToMap(4,2);
associateScavengerItemToMap(4,7);
associateScavengerItemToMap(4,6);

//associating users amd maps
associateUserToMap(1,1);
associateUserToMap(1,4);
associateUserToMap(1,2);
associateUserToMap(2,3);
associateUserToMap(2,4);
associateUserToMap(3,4);
associateUserToMap(3,1);
associateUserToMap(3,2);



database.ref('/users/1').once('value').then(data => {
  console.log('reading user from firebase',data.val())
})

}


module.exports = {
	database: database,
	writeUserData: writeUserData,
	writeScavengerHuntMap: writeScavengerHuntMap,
	writeScavengerHuntItem: writeScavengerHuntItem,
	writeCategory: writeCategory,
	addCategoryToScavengerHuntItem: addCategoryToScavengerHuntItem,
	associateScavengerItemToMap: associateScavengerItemToMap,
	associateUserToMap: associateUserToMap,
  geoFire: geoFire
}
//export default database

