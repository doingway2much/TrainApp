
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
database.ref('trains/').push({
    trainName: trainName,
    destinationName: destinationName,
    firstTrainTime: firstTrainTime,
    frequencyTime: frequencyTime,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });

});

  database.ref('trains/').on("child_added", function(childSnapshot) {
 
       
        // var shanpshot = childSnapshot
// Creates variable for the childSnapshot      
    const snapshotValue = childSnapshot.val();
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
    console.log(childSnapshot);

    if(snapshotValue.trainName === "blah"){
        console.log("Looks like that trian is already there")
        
    }else {
// Create the new row
    var newRow = $("<tr>").append(
    $("<td>").html("<button class='update' data-toggle='modal' data-target='#exampleModal' data-key=" + "'" + childSnapshot.key + "'" + "data-freq=" + "'" + snapshotValue.frequencyTime + "'" + "data-first=" + "'" + snapshotValue.firstTrainTime + "'" + "><i class='fas fas fa-edit'></i></button>"),
    $("<td>").html("<button class='delete' data-key=" + "'" + childSnapshot.key + "'" + "><i class='fas fa-minus-circle'></i></button>"),
    $("<td>").text(snapshotValue.trainName),
    $("<td>").text(snapshotValue.destinationName),
    $("<td>").text(snapshotValue.frequencyTime),
    $("<td>").text(moment(nextTrain).format("hh:mm")),
    $("<td>").text(minsTillTrian)
    
    
   
  );
  $("#train-table > tbody").append(newRow);
  



    }
    $(document.body).on("click", ".delete", function () {
        var key = $(this).data('key');
        // console.log(key);
        firebase.database().ref('trains/').child(key).remove();
        location.reload();

    });

    $(".update").on("click", function () {
      var key = $(this).data('key');
      console.log(key);
      $("#exampleModal").show()
      $(".modal-header")

      $("#update-train").on("click", function(event) {
        event.preventDefault();
        // var key = $(this).data('key');
        // console.log(key);
        
    //Get Inputs from update Train modal
      var updatedTrainTime = ($("#updateFirst").val().trim());
      var updatedFrequencyTime = parseInt($("#updateFrequency").val().trim());
    
    
    // Update values in Firebase
        firebase.database().ref('trains/').child(key).update({
        firstTrainTime: updatedTrainTime,
        frequencyTime: updatedFrequencyTime,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });
        $(".modal-body").html("<p id='success'>Undated train details click close to see the change.</p>");
        // location.reload()
    
    });
      

    

    });
});
        
        

//CURRENT TIME AND DATE USING MOMENT.JS:
var datetime = null,
    date = null;
var update = function () {
    date = moment(new Date())
    datetime.html(date.format('dddd, MMMM Do YYYY, H:mm:ss '));
};
$(document).ready(function () {
    datetime = $('#currentStatus')
    update();
    setInterval(update, 1000);
});

setInterval(function() {
 
  // window.location.reload();
  $("#train-table").load(location.href + " #train-table");
}, 10000); 
