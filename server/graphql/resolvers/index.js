const Query = require('./queries');
const Message = require('./queries/messages');
const User = require('./queries/user');
const Mutation = require('./mutations');
const Subscription = require('./subscriptions');

module.exports = {
    Query,
	Message,
	User,
    Mutation,
	Subscription
}