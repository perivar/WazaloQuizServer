var express = require("express");
var bodyParser = require("body-parser");
var dotenv = require('dotenv');

// We are using the dotenv library to load our environmental variables from the .env file. We don't have anything in the .env file for now, but we will soon.
dotenv.load();

var port = process.env.PORT;

var app = express();

//support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

var routes = require("./routes/routes.js")(app);

var server = app.listen(port, function () {
    console.log("Listening on port %s...", server.address().port);
});
