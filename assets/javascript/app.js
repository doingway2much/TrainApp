
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
    // console.log("clciked");
    
//Get Inputs from add Train Form
  var trainName = $("#trainInput").val().trim();
  var destinationName = ($("#destinationInput").val().trim());
  var firstTrainTime = ($("#firstInput").val().trim());
  var frequencyTime = parseInt($("#frequencyInput").val().trim());

// Log variables
//   console.log(trainName);
//   console.log(destinationName);
//   console.log(firsttrainTime);
//   console.log(frequencyTime);

// Set values in Firebase
database.ref().push({
    trainName: trainName,
    destinationName: destinationName,
    firstTrainTime: firstTrainTime,
    frequencyTime: frequencyTime,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });

});

  database.ref().on("child_added", function(childSnapshot) {

// Creates variable for the childSnapshot      
    var snapshotValue = childSnapshot.val();
// Gets current time
    var currentTime = moment();
// Coverts time so it willalways be behind the time entered
    var convertedTime = moment(snapshotValue.firstTrainTime ,"HH:mm").subtract(1, "years");
// Tells the diffrence in time in th convertedTime variable
    var timeDiff = moment().diff(moment(convertedTime), "minutes");
//Calculates the time remaining
    var timeRemaining = timeDiff % snapshotValue.frequencyTime;
// Calculates mins till train
    var minsTillTrian = snapshotValue.frequencyTime - timeRemaining;
// Calculates misn away based on the minsTillTrian cvariable
    var nextTrain = moment().add(minsTillTrian, "minutes");


    if(snapshotValue.trainName === "blah"){
        console.log("Looks like that trian is already there")
        
    }else {
// Create the new row
    var newRow = $("<tr>").append(
    $("<td>").text(snapshotValue.trainName),
    $("<td>").text(snapshotValue.destinationName),
    $("<td>").text(snapshotValue.frequencyTime),
    $("<td>").text(moment(nextTrain).format("hh:mm")),
    $("<td>").text(minsTillTrian)
    
   
  );
  $("#train-table > tbody").append(newRow);

    }
    
  });