const { Role, User } = require("../../models");
const { UserInputError } = require("apollo-server-express");

module.exports = {
  Query: {
    async roles(_, __) {
      return await Role.findAll();
    },
    async role(_, { id }) {
      return await Role.findOne({ where: { id } });
    },
    async rolesStatus(_, { status }) {
      return await Role.findOne({ where: { status } });
    },
  },
  Mutation: {
    async createRole(_, args) {
      const role = await Role.findOne({ where: { name: args.name } });
      if (role) {
        throw new UserInputError("This name is already taken ");
      }

      return await Role.create({ ...args });
    },

    async editRole(_, { id, ...data }) {
      const role = await Role.findByPk(id);
      if (!role) {
        throw new UserInputErrorror("Role does not exist");
      }
      return role.update({ ...data });
    },

    async switchRole(_, { id, status }) {
      const role = await Role.findByPk(id);
      if (!role) {
        throw new UserInputErrorror("Role does not exist");
      }
      role.update({ status });
      return role;
    },
  },
  Role: {
    users: async ({ id }) => {
      const users = await User.findAll({
        where: {
          roleId: id,
        },
      });
      return users;
    },
  },
};
