const { Service } = require("../../models");

module.exports = {
  Query: {
    async getServices() {
      return await Service.findAll();
    },
    async getService(_, { id }) {
      return await Service.findByPk(id);
    },
  },
  Mutation: {
    async createService(_, { data }) {
      const service = await Service.create({
        ...data,
      });
      return service;
    },
    async editService(_, { serviceId, data }) {
      const service = await Service.findByPk(serviceId);
      if (!service) {
        throw new Error("Service does not exist");
      }
      return service.update({ ...data });
    },
  },
};
