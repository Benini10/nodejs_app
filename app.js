require("dotenv").config({ path: __dirname + "/.env" });
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
let schema = require("./graphql");
const token = require("./utils/tokenized");
const { applyMiddleware } = require("graphql-middleware");
const { permissions } = require("./middlewares/permissions");

const app = express();
app.disable("x-powered-by");

schema = applyMiddleware(schema, permissions);

const server = new ApolloServer({
  schema,
  middlewares: [permissions],
  playground: {
    endpoint: "/graphql",
  },
  context: ({ req }) => {
    return { req };
    //return token.getToken(req);
  },
});
server.applyMiddleware({ app });
app.listen({ port: process.env.APP_PORT }, () => {
  console.log("The server started on port " + process.env.APP_PORT);
  console.log(`http://localhost:${process.env.APP_PORT}${server.graphqlPath}`);
});
