import axios from "../config/axios";
const getData = (page, limit) => {
  return axios.get(
    `http://localhost:8080/api/user/read?page=${page}&limit=${limit}`
  );
};
const login = (userData) => {
  return axios.post("http://localhost:8080/api/login", {
    key: userData.key,
    password: userData.password,
  });
};
const createUser = () => {
  return axios.post("http://localhost:8080", {});
};
export { getData, login, createUser };
