import {
  faPenFancy,
  faSearch,
  faThumbsUp,
  faUserEdit,
  faUserNinja,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useUser } from "../../../service/authContext";
import { create, search } from "../../../service/postService";
import { getData } from "../../../service/userService";
import "./user.scss";

const UserLayout = () => {
  const [posts, setPosts] = useState([]);
  const [postContent, setPostContent] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postImg, setPostImg] = useState("");

  let location = useLocation();
  let history = useHistory();
  const queryParams = new URLSearchParams(location.search);
  const initialSearchTerm = queryParams.get("searchTerm") || "";

  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  useEffect(() => {
    const updatedSearchParams = new URLSearchParams();
    if (searchTerm) {
      updatedSearchParams.set("searchTerm", searchTerm);
      handleSearch(searchTerm);
    } else {
      callApi();
    }
    history.push({ search: updatedSearchParams.toString() });
  }, [searchTerm, history]);

  const handleSearch = async () => {
    let kq = await search(searchTerm);
    setPosts(kq.data.posts);
  };

  const { isLoggedIn, logout } = useUser();
  const user = isLoggedIn ? JSON.parse(isLoggedIn) : {};

  let token = localStorage.getItem("access_token");

  if (!token) {
    history.push("/login");
  }

  let callApi = async () => {
    let kq = await getData();
    if (kq.code == 1) {
      setPosts(kq.data.posts);
    } else {
      history.push("/login");
    }
  };

  useEffect(() => {
    callApi();
  }, []);

  const formatDate = (inputDateString) => {
    const date = new Date(inputDateString);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!postContent || !postTitle) {
      toast.warning("You need to fill the title and the content");
    } else {
      let res = await create({ postContent, postTitle, postImg });
      res.data.user = user;
      console.log(res.data);
      toast.success("success");

      setPosts([...posts, res.data]);

      setPostContent("");
      setPostTitle("");
    }
  };

  return (
    <section className="container my-5" id="user-layout">
      <div className="row px-3">
        <div className="col-md-5  d-flex">
          <button
            className="btn btn-primary me-3"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#createModal"
            title="Create"
          >
            <FontAwesomeIcon icon={faPenFancy} />
          </button>
          <div className="input-group">
            <input
              className="form-control border-end-0 border rounded-pill"
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              id="search-input"
            />
            <span className="input-group-append">
              <button
                className="btn btn-outline-secondary bg-white border-bottom-0 border rounded-pill ms-n5"
                type="button"
              >
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </span>
          </div>
        </div>
      </div>
      <div className="d-flex flex-wrap  g-4">
        {posts.length > 0
          ? posts.map((post) => {
              return (
                <div className="col-12 col-md-6 col-lg-4 p-4" key={post.id}>
                  <div className="card text-black text-decoration-none">
                    <a
                      href={"/post/" + post.id}
                      className="text-decoration-none"
                    >
                      <img
                        className="card-img-top "
                        src="https://images.unsplash.com/photo-1532153955177-f59af40d6472?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="img"
                      />
                    </a>
                    <div className="card-body">
                      <h5 className="card-title">{post.title}</h5>
                      <h5 className="card-title">
                        {post.user ? (
                          <span className="h6">
                            <FontAwesomeIcon icon={faUserEdit} />{" "}
                            {post.user.userName}
                          </span>
                        ) : (
                          <span className="h6">
                            <FontAwesomeIcon icon={faUserNinja} />
                          </span>
                        )}
                      </h5>
                      <div className="card-footer">
                        <p className="card-text">
                          {post.content ? post.content : <small>Nothing</small>}
                        </p>
                      </div>
                      <div className="card-footer text-muted d-flex justify-content-between">
                        <span>
                          {post.like ? post.like : 0}{" "}
                          <FontAwesomeIcon icon={faThumbsUp} />
                        </span>
                        <span>{formatDate(post.createdAt)}</span>
                      </div>
                    </div>

                    <div className="px-4 pb-4">
                      <a
                        href={"/post/" + post.id}
                        className="card-link btn btn-primary"
                      >
                        View
                      </a>
                    </div>
                  </div>
                </div>
              );
            })
          : "Nothing here"}
      </div>

      {/* create form  */}
      <div
        className="modal fade"
        id="createModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Create a new post
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form id="formCreate" onSubmit={(e) => handleCreate(e)}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    className="form-control"
                    id="title"
                    name="title"
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="content" className="form-label">
                    Content
                  </label>
                  <textarea
                    className="form-control"
                    name="content"
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="img" className="form-label">
                    Image
                  </label>
                  <textarea
                    className="form-control"
                    name="img"
                    value={postImg}
                    onChange={(e) => setPostImg(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="btn btn-secondary ms-2"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserLayout;
