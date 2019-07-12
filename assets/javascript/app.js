
  // Your web app's Firebase configuration
  var config = {
    apiKey: "AIzaSyC7e_KkduJnM4FiGOXgFNDLuKj6cCBemPc",
    authDomain: "trainapp-c068e.firebaseapp.com",
    databaseURL: "https://trainapp-c068e.firebaseio.com",
    projectId: "trainapp-c068e",
    storageBucket: "",
    messagingSenderId: "584561698535",
    appId: "1:584561698535:web:d713b6987fb1206d"
  };

// Initialize Firebase
  firebase.initializeApp(config);

// Create a variable to reference the database
  var database = firebase.database();

$("#submit-train").on("click", function(event) {
    event.preventDefault();
    console.log("clciked");
    
//Get Inputs from add Train Form
  var trainName = $("#trainInput").val().trim();
  var destinationName = ($("#destinationInput").val().trim());
  var firsttrainTime = parseInt($("#firstInput").val().trim());
  var frequencyTime = parseInt($("#frequencyInput").val().trim());

// Log variables
  console.log(trainName);
  console.log(destinationName);
  console.log(firsttrainTime);
  console.log(frequencyTime);

// Set values in Firebase
database.ref().push({
    trainName: trainName,
    destinationName: destinationName,
    firsttrainTime: firsttrainTime,
    frequencyTime: frequencyTime
  });

})