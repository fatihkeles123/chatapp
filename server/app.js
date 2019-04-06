const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const { importSchema } = require('graphql-import');
require('dotenv').config();
const resolvers = require('./graphql/resolvers');

const User = require('./models/UserModel');
const Message = require('./models/MessageModel');

const server = new ApolloServer({
    typeDefs: importSchema('./graphql/schema.graphql'),
    resolvers,
    context: {
        User,
		Message
    }
});

console.log(process.env.MONGODB_DATABASE_SERVER);

mongoose.connect(process.env.MONGODB_DATABASE_SERVER, { useNewUrlParser: true })
    .then(() => console.log('MongoDB connection is successful'))
    .catch(err => console.log(err));

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4351 }, () => {
    console.log(`Server: ${server.graphqlPath}`);
});