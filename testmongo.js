var dotenv = require('dotenv').config();

// Lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

// We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var url = process.env.MONGO_URL;

// Collection name.
var collection_name = process.env.MONGO_COLLECTION;

// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
	if (err) {
		console.log('Unable to connect to the mongoDB server. Error:', err);
	} else {
		console.log('Connection established to', url);

		// Get the user collection
		var collection = db.collection(collection_name);

		// Find some users
		//collection.find().toArray(function (err, result) {
		//collection.find({username: { $regex: /test/i} }).toArray(function (err, result) {
		collection.find({
			username: /user/
		}).toArray(function(err, result) {
			if (err) {
				console.log(err);
			} else if (result.length) {
				console.log('Found:', result);
			} else {
				console.log('No document(s) found with defined "find" criteria!');
			}
		});

		// Close connection
		db.close();
	}
});