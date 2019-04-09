const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { ApolloServer, PubSub } = require('apollo-server-express');
const { importSchema } = require('graphql-import');
require('dotenv').config();
const resolvers = require('./graphql/resolvers');


const pubsub = new PubSub();
const User = require('./models/UserModel');
const Message = require('./models/MessageModel');

const server = new ApolloServer({
    typeDefs: importSchema('./graphql/schema.graphql'),
    resolvers,
    context: ({ req }) => ({
		User,
		Message,
		pubsub,
		activeUser: req ? req.activeUser : null
	})
});

console.log(process.env.MONGODB_DATABASE_SERVER);

mongoose.connect(process.env.MONGODB_DATABASE_SERVER, { useNewUrlParser: true })
    .then(() => console.log('MongoDB connection is successful'))
    .catch(err => console.log('MongoDB connection error : ',err));

const app = express();

app.use(async (req, res, next) => {
	const token = req.headers['authorization'];
	
	if (token && token !== 'null') {
	  try{
	  	const activeUser = await jwt.verify(token, process.env.SECRET_KEY);
	  	req.activeUser = activeUser;
			console.log("activeUser in app.js : ",activeUser);
	  }catch (error) {
			console.log("activeUser error in app.js : ",error);
		}
	}

	next();
});

server.applyMiddleware({ app });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: 4351 }, () => {
    console.log(`Server: ${server.graphqlPath}`);
});