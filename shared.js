exports.MailChimpSubscribe = function (name, email) {

	let mailChimpAPIKey = process.env.MAILCHIMP_API_KEY;
	let mailChimpListId = process.env.MAILCHIMP_LIST_ID;

	let Mailchimp = require("mailchimp-api-3");
	let mailchimp = new Mailchimp(mailChimpAPIKey);
	
	mailchimp.members.create(mailChimpListId, {
		email_address: email,
		merge_fields: {
			EMAIL: email,
			USERNAME: name
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