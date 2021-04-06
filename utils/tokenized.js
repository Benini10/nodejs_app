const jwt = require("jsonwebtoken");
const AuthenticationError = require("apollo-server-express");
const { User } = require("../models");

const createToken = async (user, secret, expiresIn) => {
  //const { id, name, role, status } = user;
  return await jwt.sign(user, secret, {
    expiresIn,
  });
};

const getToken = (data) => {
  const header = data.headers.authorization || "";
  if (!header) throw new Error("Authentication required");

  //   const token = header.replace("Bearer ", "");
  const decoded = jwt.verify(header, process.env.JWT_TOKEN_SECRET);

  if (decoded.status !== true) {
    throw new AuthenticationError("Can't access the system");
  }

  return decoded;
};

module.exports = { getToken, createToken };
