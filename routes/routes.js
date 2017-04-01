var shared = require("../shared.js");

var appRouter = function(app) {

	// make sure we can handle Cross-Domain requests, i.e. to get around the Same-Origin Policy
	// I.e. the error message: No 'Access-Control-Allow-Origin' header is present on the requested resource. 
	// Origin 'http://my.app' is therefore not allowed access.
	app.all('*', function(req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
		res.header('Access-Control-Allow-Headers', 'accept, content-type, x-parse-application-id, x-parse-rest-api-key, x-parse-session-token');
		// intercept OPTIONS method
		if ('OPTIONS' == req.method) {
			res.send(200);
		} else {
			next();
		}
	});

	app.get("/", function(req, res) {
		res.send("Quiz Server Ready!");
	});

	app.get("/mailchimp", function(req, res) {

		var name = req.query.name;
		var email = req.query.email;

		if (undefined == name || undefined == email) {
			res.send("Missing name or email...");
		} else {
			try {
				// statements to try
				var user = shared.MailChimpSubscribe(name, email);
				res.send("MailChimp subscription succeeded: " + name + ":" + email + ". Feedback " + user);
			} catch (e) {
				res.send("MailChimp subscription failed: " + name + ":" + email + ". Error: " + JSON.stringify(e, null, 4));
			}
		}
	});

	app.post("/quiz_admin", function(req, res) {
		//console.log(req.body); // the posted data

		var action = req.body.action;
		if (action == "waz_qc_add_response") {
			//var quizId = req.body.quiz_id;
			//var response = req.body.response;
			//console.log("Received response: " + response);
			res.end("OK");

		} else if (action == "waz_qc_add_result") {
			//var quizId = req.body.quiz_id;
			//var result = req.body.result;
			//console.log("Received result: " + result);
			res.end("OK");

		} else if (action == "waz_qc_send_responses") {
			var quizId = req.body.quiz_id;
			var name = req.body.name;
			var email = req.body.email;
			var result = req.body.result;
			var responses = req.body.responses;
			//console.log("Received responses: " + JSON.stringify(responses, null, 4));
			res.end("OK");

		} else if (action == "waz_qc_add_to_mailing_list") {
			var name = req.body.name;
			var email = req.body.email;
			//console.log("Received name and email: " + name + " , " + email);

			if (undefined == name || undefined == email) {
				res.end("FAILED: missing name or email");
			} else {
				try {
					// statements to try
					var user = shared.MailChimpSubscribe(name, email);
					res.end("OK: " + name + ":" + email);
				} catch (e) {
					res.end("FAILED: " + name + ":" + email + ". Error: " + JSON.stringify(e, null, 4));
				}
			}
		}
		//res.send(JSON.stringify(req.body, null, 4));
	});

	app.get("*", function(req, res) {
		res.end('GET path: ' + req.url);
	});

	app.post("*", function(req, res) {
		//console.log(req.body); // the posted data
		res.send(JSON.stringify(req.body, null, 4));
	});
}

module.exports = appRouter;
