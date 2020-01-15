//Dependencies
var express = require('express');
// Create Express server through Node
var app = express();

// Initial PORT will be used in listeners/callback
var PORT = process.env.PORT || 8080;

// Data parsing through Express app used here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

// Listeners
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});
