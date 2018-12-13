$(document).ready(function () {

    // Projects config object
    var config = {
        apiKey: "AIzaSyAGHCCF3ywxpgtFKPWxMDNQqb5iyQ2SF0c",
        authDomain: "train-schedule-94fe1.firebaseapp.com",
        databaseURL: "https://train-schedule-94fe1.firebaseio.com",
        projectId: "train-schedule-94fe1",
        storageBucket: "train-schedule-94fe1.appspot.com",
        messagingSenderId: "222845347770"
    };

    //// initilizes firebase

    firebase.initializeApp(config);


    // Reference to the Employees object in your Firebase database
    var database = firebase.database();



    // Save a new train to the database
    $("#add-train").on("click", function (event) {

            // Prevent page from reloading
            event.preventDefault();

            // Get input values from each of the form elements
            var name = $("#name-input").val().trim();
            var destination = $("#destination-input").val().trim();
            var time = $("#time-input").val().trim();
            var frequency = $("#frequency-input").val().trim();

            var timeConverted = moment(time, "HH:mm").subtract(1, "day");
            console.log(timeConverted);

            var currentTime = moment();
            console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

            var diffTime = moment().diff(moment(timeConverted), "minutes");
            console.log("DIFFERENCE IN TIME: " + diffTime);

            var tRemainder = diffTime % frequency;
            console.log(tRemainder);

            var tMinutesTillTrain = frequency - tRemainder;
            console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

            var nextTrain = moment().add(tMinutesTillTrain, "minutes");
            console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

            var arrival = moment(nextTrain).format("hh:mm");

            // Push new trains to the database
            var newTrain = {
                "name": name,
                "destination": destination,
                "time": time,
                "frequency": frequency,
                "arrival": arrival,
                "minutes": tMinutesTillTrain
            };

            database.ref().push(newTrain);

            $("#name-input").val("");
            $("#destination-input").val("");
            $("#time-input").val("");
            $("#frequency-input").val("");

    });

    database.ref().on("child_added", function (snapshot) {



        var name = snapshot.val().name;
        var destination = snapshot.val().destination;
        var time = snapshot.val().time;
        var frequency = snapshot.val().frequency;

        var timeConverted = moment(time, "HH:mm").subtract(1, "day");
        console.log(timeConverted);

        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        var diffTime = moment().diff(moment(timeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        var tRemainder = diffTime % frequency;
        console.log(tRemainder);

        var tMinutesTillTrain = frequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

        var arrival = moment(nextTrain).format("hh:mm");


        console.log(name);
        console.log(destination);
        console.log(time);
        console.log(frequency);


        var newRow = $("<tr>").append(
            $("<td>").text(name),
            $("<td>").text(destination),
            $("<td>").text(frequency),
            $("<td>").text(arrival),
            $("<td>").text(tMinutesTillTrain)
        );

        // Append the new row to the table
        $(".table > tbody").append(newRow);

    });


});



