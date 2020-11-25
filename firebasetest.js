const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");
const firebaseConfig = {
    apiKey: "AIzaSyCuVcVdoUacB07y_KccVBEFeU7CG1eQaG4",
    authDomain: "qrcodeforrest.firebaseapp.com",
    databaseURL: "https://qrcodeforrest.firebaseio.com",
    projectId: "qrcodeforrest",
    storageBucket: "qrcodeforrest.appspot.com",
    messagingSenderId: "541236949821",
    appId: "1:541236949821:web:4d4f431bc92d142b1c4b54"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
let ref = firebase.database().ref("orders")
ref.on('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      let childData = childSnapshot.val();
      console.log(childData)
    });
});