const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const { importSchema } = require('graphql-import');
require('dotenv').config();
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
    typeDefs: importSchema('./graphql/types/schema.graphql'),
    resolvers
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