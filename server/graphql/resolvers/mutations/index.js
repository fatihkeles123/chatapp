const bcrypt = require('bcrypt');
const generateToken = require('../../../helpers/token');

const Mutation = {
    createUser: async (parent, args, { User }) => {
        
        const user = await User.findOne({ userName: args.userName });
        
        if(user){
            throw new Error('Please change username and try again');
        }
    
        try {
        
            const newUser = await new User({
                userName: args.userName,
                password: args.password
            }).save();
			
			return { token: generateToken(newUser.userName) }

        } catch (error) {

          return console.log("createUser mutation error : ",error);
          
        }
         
    },
	createMessage: async (parent, args, { Message, pubsub }) => {
  
		try {
        
            const message = await new Message({
                messageBody: args.messageBody,
                creatorId: args.creatorId
            });
			
			await message.save();
			
			console.log("----------------------------------------");
			console.log(message);
			console.log("-----------------------------");
			
			await pubsub.publish('messageCatched', {
				messageCatched: {
					messageBody: args.messageBody,
					creatorId: args.creatorId,
					id: message.id,
					messageCreationDate: message.messageCreationDate
				}
			});
			
			return message;

        } catch (error) {

          return console.log("Create Message Mutation:",error);
          
        }
  
    },
	loginUser: async (parent, args, { User }) => {
		
		const user = await User.findOne({ userName: args.userName });
		
		if(!user){
            throw new Error('The user cannot be found!');
        }
		
		const passwordIsValid = await bcrypt.compare(args.password, user.password);
		
		if(!passwordIsValid){
			throw new Error("The password you have written is false");
		}
		
		return { token: generateToken(args.userName) }
		
	}
};

module.exports = Mutation;