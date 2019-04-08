const Message = {
	userMessages: async (parent, args, { Message }) => {
		return await Message.find({ creatorId: parent._id });
	}
};

module.exports = Message;