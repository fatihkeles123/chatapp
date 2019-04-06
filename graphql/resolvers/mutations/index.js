const Mutation = {
    createUser: async (parent, args, { User }) => {
        
        const user = await User.findOne({ userName: args.userName });
        
        if(user){
            throw new Error('Please change username and try again');
        }
    
        try {
        
            return await new User({
                userName: args.userName,
                password: args.password
            }).save();

        } catch (error) {

          return console.log(error);
          
        }
  
         
    },
	createMessage: async (parent, args, { Message }) => {
        try {
        
            return await new Message({
                messageBody: args.messageBody,
                creatorId: args.creatorId
            }).save();

        } catch (error) {

          return console.log(error);
          
        }
  
         
    },
	loginUser: async (parent, args, { User }) => {
		
		const user = await User.findOne({ userName: args.userName });
		
		if(!user){
            throw new Error('The user cannot be found!');
        }
    
	}
};

module.exports = Mutation;