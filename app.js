const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { importSchema } = require('graphql-import');

const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
    typeDefs: importSchema('./graphql/types/schema.graphql'),
    resolvers
});

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4351 }, () => {
    console.log(`Server: ${server.graphqlPath}`);
});