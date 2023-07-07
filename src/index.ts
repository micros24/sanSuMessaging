import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import pkg1 from "./models/index.js";
import resolversProvider from "./graphql/resolvers.js";
import typeDefsProvider from "./graphql/typeDefs.js";
import contextMiddleware from "./utils/contextMiddleware.js";
import bodyParser from "body-parser";
import cors from "cors";
import { createServer } from "http";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.mjs";

const { sequelize } = pkg1;
const typeDefs = typeDefsProvider; // The GraphQL schema
const resolvers = resolversProvider; // A map of functions which return data for the schema.
const url = 4000;
const app = express();
const httpServer = createServer(app);
const schema = makeExecutableSchema({ typeDefs, resolvers });

const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/subscriptions",
});

// WebSocketServer start listening
const serverCleanup = useServer(
  {
    schema,
    context: contextMiddleware,
  },
  wsServer
);

interface MyContext {
  contextMiddleware;
}

const server = new ApolloServer<MyContext>({
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
          },
        };
      },
    },
  ],
});

await server.start();
app.use(express.static("public"));
app.use(graphqlUploadExpress());
app.use(
  "/graphql",
  cors<cors.CorsRequest>(),
  bodyParser.json(),
  expressMiddleware(server, {
    context: contextMiddleware,
  })
);

httpServer.listen(url, () => {
  console.log(`🚀 Query endpoint ready at http://localhost:${url}/graphql`);
  console.log(
    `🚀 Subscription endpoint ready at ws://localhost:${url}/subscriptions`
  );
});

sequelize
  .authenticate()
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));
