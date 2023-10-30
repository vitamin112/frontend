import axios from "../config/axios";
const getPost = async (id) => {
  let post = await axios.get(`http://localhost:8080/api/v1/post/` + id);

  return { data: post.data.data };
};

const comment = async (id, content) => {
  let result = await axios.post(
    `http://localhost:8080/api/v1/post/${id}/comment`,
    { content }
  );
  return result.data;
};

const deleteCmt = (postId, cmtId) => {
  return axios.delete(
    `http://localhost:8080/api/v1/post/${postId}/comment/${cmtId}`
  );
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

export {
  comment,
  createUser,
  deleteCmt,
  generateResetCode,
  getPost,
  resetPassword,
};
