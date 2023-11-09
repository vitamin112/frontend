import {
  faCommentDots,
  faPen,
  faReply,
  faShare,
  faThumbsUp,
  faTrash,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useUser } from "../../../service/authContext";
import {
  comment,
  delPost,
  deleteCmt,
  getPost,
  update,
} from "../../../service/postService";
import Loader from "../../loading/loading";
import "./PostDetail.scss";

const PostDetail = () => {
  let history = useHistory();

  let { id } = useParams("");
  const [post, setPost] = useState({});
  const [author, setAuthor] = useState({});
  const [postLike, setView] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState();
  const [deleteItem, setDeleteItem] = useState({});

  const { isLoggedIn } = useUser();

  const user = isLoggedIn ? JSON.parse(isLoggedIn) : {};

  let callApi = async () => {
    let { data } = await getPost(id);

    setAuthor(data.post.user);
    setPost(data.post);
    setView(data.post.like);
    setComments(data.post.comments);
  };

  useEffect(() => {
    callApi();
  }, []);

  function timeAgo(commentTime) {
    const now = new Date();
    const commentDate = new Date(commentTime);

    const timeDifference = now - commentDate;

    const minute = 60 * 1000;
    const hour = minute * 60;
    const day = hour * 24;
    const year = day * 365;

    if (timeDifference < minute) {
      return Math.floor(timeDifference / 1000) + " seconds ago";
    } else if (timeDifference < hour) {
      return Math.floor(timeDifference / minute) + " minutes ago";
    } else if (timeDifference < day) {
      return Math.floor(timeDifference / hour) + " hours ago";
    } else if (timeDifference < year) {
      return Math.floor(timeDifference / day) + " days ago";
    } else {
      return Math.floor(timeDifference / year) + " years ago";
    }
  }

  const handleComment = async (e) => {
    e.preventDefault();

    if (!newComment) {
      toast.warning("Your need to write a comment!");
    } else {
      let res = await comment(id, newComment);

      res.data.comment.user = { ...user };
      setNewComment("");

      setComments([...comments, res.data.comment]);
      toast.success("success");
    }
  };

  const handleUpdate = async (e, postUpdated) => {
    e.preventDefault();
    let newData = postUpdated ? { ...postUpdated } : post;

    let result = await update(id, newData);
    if (result.code == 1) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  const handleLike = async (e) => {
    setView(postLike + 1);

    let newData = { ...post, like: postLike + 1 };

    handleUpdate(e, newData);
  };

  const handleDelete = async (e, delItem) => {
    e.preventDefault();

    let res;

    if (delItem.type === "post") {
      res = await delPost(id);

      toast.success(res.message);

      history.push("/");
    } else {
      res = await deleteCmt(id, delItem.id);

      const updatedComments = comments.filter(
        (comment) => comment.id !== delItem.id
      );

      setComments(updatedComments);
      if (res.data.code == 1) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    }
  };

  return (
    <section id="post-detail">
      <div className="container py-5" style={{ backgroundColor: "#eee" }}>
        {post ? (
          <div className="row d-flex justify-content-center">
            <div className="col-md-12 col-lg-10 col-xl-8">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-start align-items-center">
                    <img
                      className="rounded-circle shadow-1-strong me-3"
                      src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp"
                      alt="avatar"
                      width="60"
                      height="60"
                    />
                    <div>
                      <h6 className="fw-bold text-primary mb-1">
                        {author?.userName}
                      </h6>
                      <p className="text-muted small mb-0">
                        Shared publicly - {timeAgo(post.createdAt)}
                      </p>
                    </div>
                    {user.userID == author?.id || user.group === "admin" ? (
                      <div className="ms-auto align-self-start">
                        <button
                          type="button"
                          className="btn"
                          data-bs-toggle="modal"
                          data-bs-target="#updatePostModal"
                          title="Update"
                        >
                          <FontAwesomeIcon icon={faPen} />
                        </button>
                        <button
                          type="button"
                          className="btn"
                          data-bs-toggle="modal"
                          data-bs-target="#deletePostModal"
                          title="Del"
                          onClick={(e) => setDeleteItem({ type: "post", id })}
                        >
                          <FontAwesomeIcon icon={faTrashAlt} color="red" />
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <h2>{post.title}</h2>
                  <p className="mt-3 mb-4 pb-2">{post.content}</p>

                  <div className="small d-flex justify-content-start">
                    <button
                      onClick={(e) => {
                        handleLike(e);
                      }}
                      className="d-flex align-items-center me-3"
                    >
                      <p className="m-0 me-1">{postLike} </p>
                      <FontAwesomeIcon icon={faThumbsUp} className="me-2" />
                    </button>
                    <a href="#!" className="d-flex align-items-center me-3">
                      <FontAwesomeIcon icon={faCommentDots} className="me-2" />
                      <p className="mb-0">Comment</p>
                    </a>
                    <a href="#!" className="d-flex align-items-center me-3">
                      <FontAwesomeIcon icon={faShare} className="me-2" />
                      <p className="mb-0">Share</p>
                    </a>
                  </div>
                </div>
                <form
                  action=""
                  method="post"
                  onSubmit={(e) => handleComment(e)}
                  className="card-footer py-3 border-0"
                  style={{ backgroundColor: "#f8f9fa" }}
                >
                  <div className="d-flex flex-start w-100">
                    <img
                      className="rounded-circle shadow-1-strong me-3"
                      src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp"
                      alt="avatar"
                      width="40"
                      height="40"
                    />
                    <div className="form-outline w-100">
                      <textarea
                        className="form-control"
                        id="comment-input"
                        rows="4"
                        name="content"
                        value={newComment}
                        onChange={(e) => {
                          setNewComment(e.target.value);
                        }}
                        style={{ background: "#fff" }}
                      ></textarea>
                      <label className="form-label" htmlFor="comment-input">
                        Message
                      </label>
                    </div>
                  </div>
                  <div className="float-end mt-2 pt-1">
                    <button
                      type="submit"
                      className="btn btn-primary btn-sm me-2"
                    >
                      Post comment
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </form>

                {comments.map((comment) => (
                  <div className="d-flex flex-start p-3 mt-3" key={comment.id}>
                    <img
                      className="rounded-circle shadow-1-strong me-3"
                      src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(10).webp"
                      alt="avatar"
                      width="35"
                      height="35"
                    />
                    <div className="flex-grow-1 flex-shrink-1">
                      <div>
                        <div className="d-flex justify-content-between align-items-center">
                          <p className="mb-1">
                            {comment.user.userName}{" "}
                            <span className="small">
                              - {timeAgo(comment.createdAt)}
                            </span>
                          </p>
                          <div className="cmt-action">
                            <a href="#!">
                              <FontAwesomeIcon icon={faReply} />
                              <span className="small"> reply</span>
                            </a>

                            {user.userID === comment.user.id ? (
                              <button
                                className="btn"
                                type="button"
                                data-bs-toggle="modal"
                                data-bs-target="#deletePostModal"
                                title="Del"
                                onClick={(e) =>
                                  setDeleteItem({
                                    type: "comment",
                                    id: comment.id,
                                  })
                                }
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </button>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <p className="small mb-0">{comment.content}</p>
                      </div>

                      <div className="d-flex flex-start mt-4">
                        <a className="me-3" href="#">
                          <img
                            className="rounded-circle shadow-1-strong"
                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(11).webp"
                            alt="avatar"
                            width="35"
                            height="35"
                          />
                        </a>
                        <div className="flex-grow-1 flex-shrink-1">
                          <div>
                            <div className="d-flex justify-content-between align-items-center">
                              <p className="mb-1">
                                Simona Disa{" "}
                                <span className="small">- 3 hours ago</span>
                              </p>
                            </div>
                            <p className="small mb-0">{comment.content}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </div>
      {/* delete confirm Form */}
      <div
        className="modal fade"
        id="deletePostModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Delete {deleteItem.type}?
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete this {deleteItem.type}?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={(e) => handleDelete(e, deleteItem)}
              >
                Delete
              </button>
              <button
                type="button"
                data-bs-dismiss="modal"
                className="btn btn-primary"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* update Form */}
      <div
        className="modal fade"
        id="updatePostModal"
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
                Update post
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form id="formUpdate" onSubmit={(e) => handleUpdate(e)}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    className="form-control"
                    id="title"
                    name="title"
                    value={post.title ? post.title : ""}
                    onChange={(e) =>
                      setPost({ ...post, title: e.target.value })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="content" className="form-label">
                    Content
                  </label>
                  <textarea
                    className="form-control"
                    name="content"
                    onChange={(e) =>
                      setPost({ ...post, content: e.target.value })
                    }
                    value={post ? post?.content : ""}
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

export default PostDetail;
