var dotenv = require('dotenv');

// There's no need to check if .env exists, dotenv will check this 
// for you. It will show a small warning which can be disabled when 
// using this in production.
dotenv.config();

var mysql = require('mysql');

var dbconn = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME
});

dbconn.connect(function(err) {
	if (err) {
		console.log('Database connection error');
	} else {
		console.log('Database connection successful');
	}
});

var record = {
	firstname: 'Rahul',
	lastname: 'Kumar',
	email: 'abc@domain.com'
};

dbconn.query('INSERT INTO users SET ?', record, function(err, res) {
	if (err) throw err;
	console.log('Last record insert id:', res.insertId);
});

dbconn.end(function(err) {
	// Function to close database connection
});