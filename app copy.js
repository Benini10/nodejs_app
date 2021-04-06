const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const jwt = require("express-jwt");

const { typeDefs, resolvers } = require("./graphql");
const JWT_SECRET = require("./constants");

const app = express();
const auth = jwt({
  secret: JWT_SECRET,
  algorithms: ["HS256"],
  credentialsRequired: false,
});
app.use(auth);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    endpoint: "/graphql",
  },
});

server.applyMiddleware({ app });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("The server started on port " + PORT);
});
