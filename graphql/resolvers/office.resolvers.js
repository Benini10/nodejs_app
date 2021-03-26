const { Office, Company } = require("../../models");

module.exports = {
  Query: {
    async getOffices() {
      return await Office.findAll();
    },
    async getOffice(_, { id }) {
      return await Office.findByPk(id);
    },
  },
  Mutation: {
    async createOffice(_, { data }) {
      const office = await Office.create({
        ...data,
      });
      return office;
    },
    async editOffice(_, { officeId, data }) {
      const office = await Office.findByPk(officeId);
      if (!office) {
        throw new Error("Office does not exist");
      }
      return office.update({ ...data });
    },
  },
  Office: {
    async company({ companyId }) {
      const comps = await Company.findOne({
        where: {
          id: companyId,
        },
      });
      return comps;
    },
  },
};
