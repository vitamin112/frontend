import axios from "../config/axios";
const getData = async (page, limit) => {
  let result = await axios.get(`http://localhost:8080/api/v1/post`);
  return result.data;
};

const getUser = (page, limit) => {
  return axios.get(`http://localhost:8080/api/v1/user`);
};

const login = (userData) => {
  return axios.post("http://localhost:8080/api/v1/login", {
    key: userData.key,
    password: userData.password,
  });
};

const logout = () => {
  return axios.post("http://localhost:8080/api/v1/logout");
};

const createUser = () => {
  return axios.post("http://localhost:8080", {});
};

const resetPassword = (key, code, password) => {
  return axios.post("http://localhost:8080/api/v1/reset-password", {
    key,
    code,
    password,
  });
};

const generateResetCode = (key) => {
  return axios.post("http://localhost:8080/api/v1/generate-reset-code", {
    key,
  });
};

const getUserById = async (id) => {
  let res = await axios.get(`http://localhost:8080/api/v1/user/${id}`);
  return res.data;
};

export {
  createUser,
  generateResetCode,
  getData,
  getUser,
  getUserById,
  login,
  logout,
  resetPassword,
};
