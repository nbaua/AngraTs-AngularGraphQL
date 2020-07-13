import express from "express";
import { ApolloServer } from "apollo-server-express";
import depthLimit from "graphql-depth-limit";
import { createServer } from "http";
import cors from "cors";
import schema from "./schema";

const app = express();

const server = new ApolloServer({
  schema,
  validationRules: [depthLimit(7)],
});

app.use("*", cors());

server.applyMiddleware({ app, path: "/graphql" });

const httpServer = createServer(app);
httpServer.listen({ port: 1000 }, (): void =>
  console.log(`GraphQL server running on http://localhost:1000/graphql`)
);
