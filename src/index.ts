import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import pkg1 from './models/index.js';
import resolversProvider from './graphql/resolvers.js'
import typeDefsProvider from './graphql/typeDefs.js'
import bodyParser from 'body-parser';
import { createServer } from 'http';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';

const { sequelize } = pkg1;
const typeDefs = typeDefsProvider;  // The GraphQL schema
const resolvers = resolversProvider; // A map of functions which return data for the schema.
const url = 4000;
const app = express();
const httpServer = createServer(app);
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Creating the WebSocket server
const wsServer = new WebSocketServer({
  // This is the `httpServer` we created in a previous step.
  server: httpServer,
  // Pass a different path here if app.use
  // serves expressMiddleware at a different path
  path: '/graphql',
});

// Hand in the schema we just created and have the
// WebSocketServer start listening.
const serverCleanup = useServer({ schema }, wsServer);

interface myContext {
  
}

const server = new ApolloServer({
  schema,
  plugins: [
    // Proper shutdown for the HTTP server.
    ApolloServerPluginDrainHttpServer({ httpServer }),
    // Proper shutdown for the WebSocket server.
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          }
        };
      }
    }
  ],
});

await server.start();

app.use('/graphql', bodyParser.json(), expressMiddleware(server));



// const { url } = await startStandaloneServer(server, {
//   context: contextMiddleware
// });
//console.log(`🚀 Server ready at http://localhost:${url}`);

httpServer.listen(url, () => {
  console.log(`🚀 Query endpoint ready at http://localhost:${url}/graphql`);
  console.log(`🚀 Subscription endpoint ready at ws://localhost:${url}/graphql`);
})

sequelize
    .authenticate()
    .then(() => console.log('Database connected!'))
    .catch((err) => console.log(err));