const path = require("path");
const { mergeResolvers } = require("@graphql-tools/merge");
const { loadFilesSync } = require("@graphql-tools/load-files");
console.log(__dirname);
const resolversArray = loadFilesSync(path.join(__dirname, "."));

module.exports = mergeResolvers(resolversArray);
