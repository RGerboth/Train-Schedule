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
	//add new train to db
	database.ref().push({
        trainName : trainName,
        destination : destination,
        firstTrainTime: firstTrainTime,
        frequency : frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
	});
	//clear input fields and reset table display
	$("#trainName").val("");
	$("#destination").val("");
	$("#firstTrainTime").val("");
	$("#frequency").val("");
	$(".table").empty();
	$(".table").append("<tr><th>Train Name</th><th>Destination</th><th>Frequency (minutes)</th><th>Next Arrival</th><th>Minutes Away</th></tr>")
});

database.ref().on("child_added", function(snapshot) {
	var firstTrainTime = snapshot.val().firstTrainTime
	var frequency = snapshot.val().frequency
	//convert first train time to hours and minutes, subtract a year to prevent overlap
	var firstTrainTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
    //variable for current time
    var currentTime = moment();
    //calculate difference between current time and first train time
    var diffTime = moment().diff(moment(firstTrainTimeConverted), "minutes");
	// Time apart (remainder)
    var tRemainder = diffTime % frequency;
	// Minute Until Train
    var tMinutesTillTrain = frequency - tRemainder;    
    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    // Minutes Until Train
    var tMinutesTillTrain = frequency - tRemainder;
    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    // Next Train
    // var nextTrain = moment().add(tMinutesTillTrain, "minutes");

    $(".table").append("<tr><td>" + snapshot.val().trainName + "</td><td>" + snapshot.val().destination + "</td><td>" + snapshot.val().frequency + "</td><td>" + moment(nextTrain).format("hh:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>");

	$("#currentTime").text(moment(currentTime).format("hh:mm:ss"));
    // log any errors
	setTimeout(function(){refreshPage();}, 1000 * 1);

}, function(errorObject) {
	console.log("Errors handled: " + errorObject.code);
});

var refreshPage = function() {
    $(".table").empty();
   	$(".table").append("<tr><th>Train Name</th><th>Destination</th><th>Frequency (minutes)</th><th>Next Arrival</th><th>Minutes Away</th></tr>")
	database.ref().on('value', function(snap) {
	    snap.forEach(function(snapshot) {
		var firstTrainTime = snapshot.val().firstTrainTime
		var frequency = snapshot.val().frequency
		var firstTrainTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
	    var currentTime = moment();
	    var diffTime = moment().diff(moment(firstTrainTimeConverted), "minutes");
	    var tRemainder = diffTime % frequency;
	    var tMinutesTillTrain = frequency - tRemainder;
	    var tRemainder = diffTime % frequency;
	    var tMinutesTillTrain = frequency - tRemainder;
	    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
	    var nextTrain = moment().add(tMinutesTillTrain, "minutes");

	    $(".table").append("<tr><td>" + snapshot.val().trainName + "</td><td>" + snapshot.val().destination + "</td><td>" + snapshot.val().frequency + "</td><td>" + moment(nextTrain).format("hh:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>");
		$("#currentTime").text(moment(currentTime).format("hh:mm:ss"));
    	});
	});
	setTimeout(function(){refreshPage();}, 1000 * 1);
}