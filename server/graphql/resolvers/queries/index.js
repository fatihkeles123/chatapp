const Query = {
    user: async (parent, args, { User }) => {
        return await User.findById({ _id: args.id });
    },
	users: async (parent, args, { User }) => {
        return await User.find({});
    },
	message: async (parent, args, { Message }) => {
        return await Message.findById({ _id: args.id });
    },
	messages: async (parent, args, { Message }) => {
        return await Message.find({}).sort({'messageCreationDate':'desc'});
    },
	activeUser: async (parent, args, { activeUser, User }) => {
		console.log("Aktif:"+activeUser.userName);
		if (!activeUser) {
		  return null;
		}

		return await User.findOne({ userName: activeUser.userName });
	}
};      

module.exports = Query;
