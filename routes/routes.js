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
    }
    else {
      next();
    }
});
 
app.get("/", function(req, res) {
    res.send("Hello World");
});

app.get("/account", function(req, res) {
    var accountMock = {
        "username": "user",
        "password": "1234",
        "twitter": "@user"
    }

    if(!req.query.username) {
        return res.send({"status": "error", "message": "missing username"});
    } else if(req.query.username != accountMock.username) {
        return res.send({"status": "error", "message": "wrong username"});
    } else {
        return res.send(accountMock);
    }
});

app.post("/account", function(req, res) {
    if(!req.body.username || !req.body.password || !req.body.twitter) {
        return res.send({"status": "error", "message": "missing a parameter"});
    } else {
        return res.send(req.body);
    }
});

app.get("/mailchimp", function(req, res) {
   
	let Mailchimp = require("mailchimp-api-3");
	let mailchimp = new Mailchimp("4a408c02b1162fc49bf5840d6951455f-us15");

	mailchimp.members.create("44065f1e0a", {
    email_address: "anne@nerseth.com",
    merge_fields: {
       EMAIL: "anne@nerseth.com",
       USERNAME: "Anne Pernille Nerseth"
    },
    status: 'subscribed',
        
    })
    .then( user => {
        // result user 
    })
    .catch( e => {
        // result e 
    })
	
	res.send("MailChimp succeeded!");
});

app.get("*", function(req, res) {
    res.end('GET path: ' + req.url);
});

app.post("*", function(req, res) {
    console.log(req.body); // the posted data
    res.send(JSON.stringify(req.body, null, 4));
});

}
 
module.exports = appRouter;