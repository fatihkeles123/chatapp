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
		console.log(args.password);
		console.log(user.password);
		
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