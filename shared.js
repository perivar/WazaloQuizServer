exports.MailChimpSubscribe = function(name, email) {

	let mailChimpAPIKey = process.env.MAILCHIMP_API_KEY;
	let mailChimpListId = process.env.MAILCHIMP_LIST_ID;

	let Mailchimp = require("mailchimp-api-3");
	let mailchimp = new Mailchimp(mailChimpAPIKey);

	var nameSplit = exports.SplitName(name);

	mailchimp.members.create(mailChimpListId, {
		email_address: email,
		merge_fields: {
			EMAIL: email,
			FNAME: nameSplit.first_name,
			LNAME: nameSplit.last_name
		},
		status: 'subscribed',

	}).then(user => {
		// successfull, result user 
		return user;
	}).catch(e => {
		// failed, result e
		throw e;
	});
}

exports.SplitName = function(fullName) {
	var result = {};

	if (fullName) {
		var nameArr = fullName.split(' ');
		result.last_name = nameArr.pop();
		result.first_name = nameArr.join(' ');
	}
	return result;
}

exports.AddToDatabase = function(name, email, responses) {

	let mysql = require('mysql');
	let dbconn = mysql.createConnection({
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME
	});

	dbconn.connect(function(err) {
		if (err) throw err;
	});

	var record = {
		name: name,
		email: email,
		json: JSON.stringify(responses)
	};
	dbconn.query('INSERT INTO quiz_responses SET ?', record, function(err, res) {
		if (err) throw err;
		return res.insertId;
	});

	dbconn.end(function(err) {
		// Function to close database connection
	});
}
