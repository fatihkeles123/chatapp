const Message = {
	messageUser: async (parent, args, { User }) => {
		console.log(parent.creatorId);
		return await User.findById({ _id: parent.creatorId });
	}
};

module.exports = Message;