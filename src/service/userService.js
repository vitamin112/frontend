const { default: axios } = require("axios");

module.exports = {
  getData(page, limit) {
    return axios.get(
      `http://localhost:8080/api/user/read?page=${page}&limit=${limit}`
    );
  },
};
