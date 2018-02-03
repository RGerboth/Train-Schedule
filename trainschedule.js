//TrainSchedule js
console.log("running js...")

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBoggGWmsF428jTDi8O_j3lGUv1Il5RXlc",
  authDomain: "my-project-58482.firebaseapp.com",
  databaseURL: "https://my-project-58482.firebaseio.com",
  projectId: "my-project-58482",
  storageBucket: "my-project-58482.appspot.com",
  messagingSenderId: "207606797006"
};

firebase.initializeApp(config);

var database = firebase.database();

var trainName = "";
var destination = "";
var firstTrainTime = "";
var frequency = 0;

$("#submitButton").on("click", function(event) {
    event.preventDefault();
//grab values from input field
	trainName = $("#trainName").val().trim();
	destination = $("#destination").val().trim();
	firstTrainTime = $("#firstTrainTime").val().trim();
	frequency = $("#frequency").val().trim();
	console.log("First Train Time: " + firstTrainTime + " frequency: " + frequency)
	//append new train to db
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

database.ref().on("child_added", function(snapshot) {
	var firstTrainTime = snapshot.val().firstTrainTime
	var frequency = snapshot.val().frequency
	console.log("First Train Time: " + firstTrainTime + " frequency: " + frequency)
	//convert first train time to hours and minutes, subtract a year to prevent overlap
	var firstTrainTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
    console.log("First Train converted: " + firstTrainTimeConverted);
    //variable for current time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    //calculate difference between current time and first train time
    var diffTime = moment().diff(moment(firstTrainTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
	// Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);
	// Minute Until Train
    var tMinutesTillTrain = frequency - tRemainder;    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);
    // Minutes Until Train
    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    $(".table").append("<tr><td>" + snapshot.val().trainName + "</td><td>" + snapshot.val().destination + "</td><td>" + snapshot.val().frequency + "</td><td>" + moment(nextTrain).format("hh:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>");

    $("#currentTime").text(moment(currentTime).format("hh:mm"));
    // log any errors
}, function(errorObject) {
    	console.log("Errors handled: " + errorObject.code);
});