//TrainSchedule js
console.log("running trainschedule.js...")

// Initialize Firebase
const config = {
  apiKey: "AIzaSyBoggGWmsF428jTDi8O_j3lGUv1Il5RXlc",
  authDomain: "my-project-58482.firebaseapp.com",
  databaseURL: "https://my-project-58482.firebaseio.com",
  projectId: "my-project-58482",
  storageBucket: "my-project-58482.appspot.com",
  messagingSenderId: "207606797006"
};

firebase.initializeApp(config);

const database = firebase.database();

let trainName = "";
let destination = "";
let firstTrainTime = "";
let frequency = 0;
let timeTable = [];

database.ref().on('value', function(snap) {
  timeTable = [];
  snap.forEach(function(snapshot) {
    timeTable.push({
      dbKey: snapshot.key,
	  name: snapshot.val().trainName,
	  description: snapshot.val().destination,
	  firstTime: snapshot.val().firstTrainTime,
	  frequency: snapshot.val().frequency
	});
  });
  
  refreshPage();

}, function(errorObject) {
	console.log("Errors handled: " + errorObject.code);
});

const refreshPage = function() {
  $(".table").empty();
  $(".table").append("<tr><th>Train Name</th><th>Destination</th><th>Frequency</th><th>Next Arrival</th><th>Minutes Away</th><th></th></tr>");
  for (let i = 0; i < timeTable.length; i++) {
    // first train time
    let firstTrainTime = timeTable[i].firstTime;
    // frequency
    let frequency = timeTable[i].frequency;
    // convert first train time to hours and minutes, subtract a year to prevent overlap
    let firstTrainTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
    // current time
    let currentTime = moment();
    // calculate difference between current time and start time
    let diffTime = moment().diff(moment(firstTrainTimeConverted), "minutes");
    // time apart (remainder)
    let tRemainder = diffTime % frequency;
    // minutes until next train (frequency times remainder)
    let tMinutesTillTrain = frequency - tRemainder;
    // next train time
    let nextTrain = moment().add(tMinutesTillTrain, "minutes");
    // delete button
   	let deleteButton = $("<button>");
	  deleteButton.addClass("btn btn-light deleteButton");
	  let databaseKey = timeTable[i].dbKey;
	  deleteButton.attr("data-key", databaseKey);
	  deleteButton.text("X");
	// build table rows
    $(".table").append("<tr><td>" + timeTable[i].name + "</td><td>" + timeTable[i].description + "</td><td>" + timeTable[i].frequency + " minutes</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + tMinutesTillTrain + "</td><td>" + deleteButton.prop('outerHTML') + "</td></tr>");
    // update current time
    $("#currentTime").text(moment(currentTime).format("HH:mm:ss"));
  };

  setTimeout(function(){refreshPage();}, 1000 * 1);
}

$("#submitButton").on("click", function(event) {
  event.preventDefault();
	//grab values from input form
	trainName = $("#trainName").val().trim();
	destination = $("#destination").val().trim();
	firstTrainTime = $("#firstTrainTime").val().trim();
	frequency = $("#frequency").val().trim();
	//add new train to db
	database.ref().push({
      trainName : trainName,
      destination : destination,
      firstTrainTime: firstTrainTime,
      frequency : frequency,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
	});
	//clear input fields
	$("#trainName").val("");
	$("#destination").val("");
	$("#firstTrainTime").val("");
	$("#frequency").val("");
});

$(".table").on("click", ".deleteButton", function(event) {
	var deleteKey = $(this).attr("data-key");
	database.ref().child(deleteKey).remove();	
});
