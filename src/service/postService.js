import axios from "../config/axios";
const getPost = async (id) => {
  let post = await axios.get(`post/` + id);

  return { data: post.data.data };
};

const update = async (id, newData) => {
  let result = await axios.put(`post/update/${id}`, {
    ...newData,
    content: newData.content,
    title: newData.title,
  });
  return result.data;
};

const delPost = async (id) => {
  let result = await axios.delete(`post/delete/${id}`);
  return result.data;
};

const create = async ({ ...newData }) => {
  let result = await axios.post(`post/create`, {
    content: newData.postContent,
    title: newData.postTitle,
  });
  return result.data;
};

const comment = async (id, content) => {
  let result = await axios.post(`post/${id}/comment`, { content });
  return result.data;
};

const search = async (searchTerm) => {
  let result = await axios.get(`post/search/?searchTerm=${searchTerm}`);
  return result.data;
};
const destroy = async (id) => {
  let result = await axios.delete(`post/destroy/${id}`);
  return result.data;
};
const restore = async (id) => {
  let result = await axios.post(`post/restore/${id}`);
  return result.data;
};

const deleteCmt = (postId, cmtId) => {
  return axios.delete(`post/${postId}/comment/${cmtId}`);
};

const createUser = () => {
  return axios.post("http://localhost:8080", {});
};

const resetPassword = (key, code, password) => {
  return axios.post("reset-password", {
    key,
    code,
    password,
  });
};

const generateResetCode = (key) => {
  return axios.post("generate-reset-code", {
    key,
  });
};

export {
  comment,
  create,
  createUser,
  delPost,
  deleteCmt,
  destroy,
  generateResetCode,
  getPost,
  resetPassword,
  restore,
  search,
  update,
};
