module.exports = class CustomerBusiness {
  constructor(tid) {
    this.tid = tid;
  }

  async getCustomer({ id, cpf, email }) {
    try {
      return [];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async createCustomer(body) {
    try {
      return {};
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateCustomer(body) {
    try {
      return {};
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteCustomer({ id }) {
    try {
      return {};
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
};
