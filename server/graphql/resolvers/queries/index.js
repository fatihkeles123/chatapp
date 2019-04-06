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
        return await Message.find({});
    }
};      

module.exports = Query;
