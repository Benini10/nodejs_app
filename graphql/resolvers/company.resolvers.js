const { Company, Office } = require("../../models");

module.exports = {
  Query: {
    async getCompanies() {
      return await Company.findAll();
    },
    async getCompany(_, { id }) {
      return await Company.findByPk(id);
    },
  },
  Mutation: {
    async createCompany(_, { data }) {
      const company = await Company.create({
        ...data,
      });
      return company;
    },
    async editCompany(_, { companyId, data }) {
      const company = await Company.findByPk(companyId);
      if (!company) {
        throw new Error("Company does not exist");
      }
      return company.update({ ...data });
    },
  },
  Company: {
    async offices({ id }) {
      return Office.findAll({
        where: {
          companyId: id,
        },
      });
    },
  },
};
