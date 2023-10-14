import axios from "../config/axios";
const getData = (page, limit) => {
  return axios.get(`http://localhost:8080/api/v1/post`);
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
export { createUser, getData, getUser, login, logout };
