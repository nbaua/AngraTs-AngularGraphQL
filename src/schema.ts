import "graphql-import-node";
import * as typeDefs from "./gql/schema.graphql";
import { makeExecutableSchema } from "graphql-tools";
import resolvers from "./resolver";
import { GraphQLSchema } from "graphql";

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
