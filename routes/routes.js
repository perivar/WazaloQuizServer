var appRouter = function(app) {
 
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
    res.send("MailChimp");

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
});

app.get("*", function(req, res) {
    res.end('Path Hit: ' + req.url);
});

}
 
module.exports = appRouter;