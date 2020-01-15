var friends = require("../data/friends");
var app = require("express");
var path = require("path");


module.exports = function (app) {
    app.get('/api/friends', function (req, res) {
        res.json(friends);
    });
    app.post('/api/friends', function (req, res) {
        var friendMatch = {
            'name': '',
            'photo': ''
        };

        // Score difference between the user and the other people, and index to use later
        var friendIndex = 0;
        var tempScore = 0;

        // This is initialized high so that it can be compared against lower values in the loop
        var lowestScore = 100;

        // Data references
        var userData = req.body;
        var userScores = userData.scores;
        console.log('Before FOR LOOP! userScores ' + userScores.length);
        console.log('Before FOR LOOP! friends ' + friends.length);
        console.log('Before FOR LOOP! userData ' + userData);

        // Loop through all friends and then their scores, and find the lowest difference
        for (var i = 0; i < friends.length; i++) {
            console.log('Inside FOR LOOP! ' + userScores.length);
            tempScore = 0;
            for (var j = 0; j < userScores.length; j++) {
                console.log('Inside inside FOR LOOP!');
                tempScore += Math.abs(parseInt(friends[i].scores[j]) - parseInt(userScores[j]));
                console.log('friends[i].scores[j] ' + friends[i].scores[j]);
                console.log('parseInt(userScores[j]) ' + parseInt(userScores[j]));
                console.log('tempScore ' + tempScore);
            }
            if (tempScore < lowestScore) {
                lowestScore = tempScore;
                friendIndex = i;
                console.log('lowestScore ' + lowestScore);
            }
        }

        // Add the newest friend to the list
        friends.push(userData);

        // Pass the values of the match
        friendMatch.name = friends[friendIndex].name;
        friendMatch.photo = friends[friendIndex].photo;

        // Return the best match
        res.json(friendMatch);
    });
}