import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
import { getData } from "../../../service/userService";

const Posts = (props) => {
  const [listPost, setListPost] = useState([]);
  const [currentPage, setICurrentPage] = useState(1);
  const [itemLimit, setItemLimit] = useState(2);
  const [totalPages, setTotalPages] = useState(0);
  // call api
  const fetchData = async (page) => {
    try {
      let res = await getData(page ? page : currentPage, itemLimit);

      if (res && res.data && res.data.code === 1) {
        setListPost(res.data.data.posts);
        setTotalPages(0);
      }
      if (res.data.code !== 1) {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  //get user list
  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const handlePageClick = (event) => {
    const newOffset = +event.selected + 1;
    setICurrentPage(newOffset);
  };

  return (
    <div className="table-container">
      <div className="mt">
        <Link className="btn btn-info" to="user/create">
          Create
        </Link>
      </div>
      <div className=" mt-2">
        <table className="table table-hover ">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Slug</th>
              <th scope="col">Content</th>
              <th scope="col">View</th>
            </tr>
          </thead>
          <tbody>
            {listPost.length > 0 ? (
              listPost.map((post, index) => {
                return (
                  <tr key={"user-" + index}>
                    <td>{itemLimit * (currentPage - 1) + index + 1}</td>
                    <td>{post.title}</td>
                    <td>{post.slug}</td>
                    <td
                      className="d-inline-block text-truncate"
                      style={{ maxWidth: "250px" }}
                    >
                      {post.content}
                    </td>
                    <td>{post.view}</td>
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
    </div>
  );
};
export default Posts;
