const Subscription = {
    messageCatched: {
		subscribe: (parent, args, { pubsub }) => {
			return pubsub.asyncIterator('messageCatched');
		}
    }
	
}

module.exports = Subscription;