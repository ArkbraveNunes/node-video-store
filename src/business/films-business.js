module.exports = class FilmsBusiness {
  constructor(tid) {
    this.tid = tid;
  }

  async getFilms({ id, cpf, email }) {
    try {
      return [];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async createFilms(body) {
    try {
      return {};
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateFilms(body) {
    try {
      return {};
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteFilms({ id }) {
    try {
      return {};
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
};
