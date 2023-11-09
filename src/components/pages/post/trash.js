import { faTrashAlt, faTrashRestore } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import { destroy, restore } from "../../../service/postService";
import { getData } from "../../../service/userService";

const Trash = (props) => {
  const [listPost, setListPost] = useState([]);
  const [currentPage, setICurrentPage] = useState(1);
  const [itemLimit, setItemLimit] = useState(2);
  const [totalPages, setTotalPages] = useState(0);
  const [deletePost, setDeletePost] = useState();

  const fetchData = async (page) => {
    try {
      let res = await getData(page ? page : currentPage, itemLimit);

      if (res && res.data && res.code === 1) {
        setListPost(res.data.trash.data.rows);
        setTotalPages(0);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const handlePageClick = (event) => {
    const newOffset = +event.selected + 1;
    setICurrentPage(newOffset);
  };

  const setDeleteItem = (id) => {
    setDeletePost(id);
  };

  const handleDelete = async (id) => {
    let res = await destroy(id);

    const updatedPosts = listPost.filter((post) => post.id !== id);

    setListPost(updatedPosts);
    if (res.code == 1) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  const handleRestore = async (id) => {
    let res = await restore(id);

    const updatedPosts = listPost.filter((post) => post.id !== id);

    setListPost(updatedPosts);
    if (res.code == 1) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="table-container">
      <div className=" mt-2">
        <table className="table table-hover ">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Author</th>
              <th scope="col">Content</th>
              <th scope="col">Like</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {listPost.length > 0 ? (
              listPost.map((post, index) => {
                return (
                  <tr key={"user-" + index}>
                    <td>{itemLimit * (currentPage - 1) + index + 1}</td>
                    <td>{post.title}</td>
                    <td>{post.author}</td>
                    <td
                      className="d-inline-block text-truncate"
                      style={{ maxWidth: "250px" }}
                    >
                      {post.content}
                    </td>
                    <td>{post.like}</td>
                    <td>
                      <button
                        className="px-1 mx-1 btn"
                        title="restore"
                        onClick={() => handleRestore(post.id)}
                      >
                        <FontAwesomeIcon icon={faTrashRestore} color="blue" />
                      </button>

                      <button
                        type="button"
                        className="btn px-1 mx-1 "
                        data-bs-toggle="modal"
                        data-bs-target="#deletePostModal"
                        title="Del"
                        onClick={(e) => setDeleteItem(post.id)}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} color="red" />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <th>Nothing here!</th>
              </tr>
            )}
          </tbody>
        </table>
        <div className="table-footer">
          {totalPages > 0 && (
            <ReactPaginate
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={totalPages}
              previousLabel="< previous"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              renderOnZeroPageCount={null}
            />
          )}
        </div>
      </div>

      {/* delete form */}
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
                Are you sure you want to delete this post?
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete this post?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={() => handleDelete(deletePost)}
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
    </div>
  );
};

export default Trash;
