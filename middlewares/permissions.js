const { rule, shield, and, or, not } = require("graphql-shield");
const { getToken } = require("../utils/tokenized");

// Rules
const isUser = rule({ cache: "contextual" })(
  async (parent, args, { req }, info) => {
    return getToken(req).role.includes("Admin");
  }
);

// Permissions

const permissions = shield({
  Query: {
    getCompanies: isUser,
  },
});

module.exports = {
  permissions,
};
