const path = require("path");
const { makeExecutableSchema } = require("apollo-server-express");
const { loadFilesSync } = require("@graphql-tools/load-files");
const { mergeResolvers, mergeTypeDefs } = require("@graphql-tools/merge");

const typesArray = loadFilesSync(path.join(__dirname, "types/."), {
  recursive: true,
});

const resolversArray = loadFilesSync(path.join(__dirname, "resolvers/."), {
  recursive: true,
});

const schema = makeExecutableSchema({
  typeDefs: mergeTypeDefs(typesArray),
  resolvers: mergeResolvers(resolversArray),
});

module.exports = schema;
