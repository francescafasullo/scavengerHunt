var config = {
    apiKey: "AIzaSyDrvLFZawkHwPm0WIg2bPTZbtAMfkfcehI",
    authDomain: "scavngo-4f724.firebaseapp.com",
    databaseURL: "https://scavngo-4f724.firebaseio.com",
    storageBucket: "scavngo-4f724.appspot.com"
  };
  firebase.initializeApp(config);

  // Get a reference to the database service
  var database = firebase.database();