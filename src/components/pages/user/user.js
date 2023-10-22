import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
import { getUser } from "../../../service/userService";

const UserList = (props) => {
  const [listUser, setListUser] = useState([]);
  const [currentPage, setICurrentPage] = useState(1);
  const [itemLimit, setItemLimit] = useState(2);
  const [totalPages, setTotalPages] = useState(0);

  // call api
  const fetchData = async (page) => {
    try {
      let res = await getUser(page ? page : currentPage, itemLimit);
      if (res && res.data && res.data.code === 1) {
        setListUser(res.data.data.userList);
        setTotalPages(res.data.data.totalPages);
      } else {
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
      <div className="mt-2 container">
        <Link className="btn btn-info" to="user/create">
          Create
        </Link>
      </div>
      <div className="container mt-2">
        <table className="table table-hover ">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">userName</th>
              <th scope="col">phone</th>
              <th scope="col">email</th>
              <th scope="col">sex</th>
              <th scope="col">group</th>
            </tr>
          </thead>
          <tbody>
            {listUser.length > 0 ? (
              listUser.map((user, index) => {
                return (
                  <tr key={"user-" + index}>
                    <td>{itemLimit * (currentPage - 1) + index + 1}</td>
                    <td>{user.userName}</td>
                    <td>{user.phone}</td>
                    <td>{user.email}</td>
                    <td>{user.sex}</td>
                    <td>{user.groupId}</td>
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
export default UserList;
