import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getData } from "../../../service/userService";
import "./user.scss";

const UserLayout = () => {
  const [posts, setPosts] = useState([]);
  let history = useHistory();

  let token = localStorage.getItem("access_token");
  if (!token) {
    history.push("/login");
  }

  let callApi = async () => {
    let kq = await getData();
    console.log(kq);
    setPosts(kq.data.posts);
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

  return (
    <section className="container my-5" id="user-layout">
      <div className="d-flex flex-wrap justify-content-between g-4">
        {posts.map((post) => {
          return (
            <div className="col-12 col-md-6 col-lg-4 p-4" key={post.id}>
              <div className="card">
                <img
                  className="card-img-top "
                  src="https://images.unsplash.com/photo-1696790857863-e41b641311be?auto=format&fit=crop&q=80&w=1374&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text">{post.content}</p>
                  <div className="card-footer text-muted">
                    {formatDate(post.createdAt)}
                  </div>
                </div>

                <div className="card-body">
                  <a href={"/post/" + post.id} className="card-link">
                    View
                  </a>
                  <a href="/" className="card-link">
                    Another link
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default UserLayout;
