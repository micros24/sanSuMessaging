import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import pkg1 from './models/index.js';
import resolversProvider from './graphql/resolvers.js'
import typeDefsProvider from './graphql/typeDefs.js'
import contextMiddleware from './utils/contextMiddleware.js';

const { sequelize } = pkg1;
const typeDefs = typeDefsProvider;  // The GraphQL schema
const resolvers = resolversProvider; // A map of functions which return data for the schema.

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const { url } = await startStandaloneServer(server, {
  context: contextMiddleware
});
console.log(`🚀 Server ready at ${url}`);

sequelize
    .authenticate()
    .then(() => console.log('Database connected!'))
    .catch((err) => console.log(err));