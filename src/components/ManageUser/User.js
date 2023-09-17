import ReactPaginate from "react-paginate";
import React, { useEffect, useState } from "react";
import { getData } from "../../service/userService";

const UserList = (props) => {
  const [listUser, setListUser] = useState([]);
  const [currentPage, setICurrentPage] = useState(1);
  const [itemLimit, setItemLimit] = useState(2);
  const [totalPages, setTotalPages] = useState(1);

  // call api
  const fetchData = async (page) => {
    let res = await getData(page ? page : currentPage, itemLimit);

    if (res && res.data && res.data.Code === 1) {
      console.log(res);
      setListUser(res.data.Data.ListUsers);
      setTotalPages(res.data.Data.totalPages);
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
      <div className="container mt-5">
        <table className="table table-hover ">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            {listUser &&
              listUser.map((user, index) => {
                return (
                  <tr key={"user-" + index}>
                    <td>{user.userName}</td>
                    <td>{user.phone}</td>
                    <td>{user.email}</td>
                    <td>{user.sex}</td>
                  </tr>
                );
              })}
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
