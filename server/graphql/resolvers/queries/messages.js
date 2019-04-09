const Message = {
	messageUser: async (parent, args, { User }) => {
		console.log("creatorId in messageUser query in /queries/messages.js :",parent.creatorId);
		return await User.findById({ _id: parent.creatorId });
	}
};

module.exports = Message;