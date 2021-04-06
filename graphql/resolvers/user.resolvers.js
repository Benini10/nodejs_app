const { User, Role, Employee } = require("../../models");
const bcrypt = require("bcrypt");
const {
  AuthenticationError,
  UserInputError,
} = require("apollo-server-express");
const token = require("../../utils/tokenized");

module.exports = {
  Query: {
    async users(_, __) {
      return await User.findAll();
    },
    async user(_, { id }) {
      return await User.findOne({ where: { id } });
    },
  },
  Mutation: {
    async createUser(_, { name, email, password, status, roleId }) {
      const user = await User.findOne({ where: { email } });
      if (user) {
        throw new UserInputError("This email is already taken !!");
      }

      return await User.create({
        name,
        email,
        password: await bcrypt.hash(password, 10),
        status,
        roleId,
      });
    },

    async editUserRole(_, { id, roleId }) {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error("User does not exist");
      }

      const role = await Role.findByPk(roleId);
      if (!role) {
        throw new Error("This role does not exist");
      }
      user.update({ roleId: roleId });
      return user;
    },

    async editUser(_, { id, data }) {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error("User does not exist");
      }
      user.update({ ...data });
      return user;
    },

    async login(_, { email, password }) {
      const user = await User.findOne({
        where: { email },
        include: {
          model: Role,
        },
      });
      if (!user) {
        throw new AuthenticationError(
          "Email is not exist / Email or passowrd is incorrect"
        );
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        throw new AuthenticationError("Password is incorrect");
      }

      return {
        token: token.createToken(
          {
            name: user.name,
            role: user.Role.name,
            status: user.status,
          },
          process.env.JWT_TOKEN_SECRET,
          process.env.JWT_TOKEN_EXPIRE
        ),
      };
    },
  },
  User: {
    role: async ({ roleId }) => {
      return await Role.findOne({
        where: { id: roleId },
      });
    },
    employee: async ({ id }) => {
      return await Employee.findOne({
        where: { userId: id },
      });
    },
  },
};
