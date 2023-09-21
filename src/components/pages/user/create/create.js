import { useEffect, useState } from "react";
import { createUser } from "../../../../service/userService";

const CreateUser = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    await createUser()
      .then((res) => {
        console.log(res);
        setUser(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div className="container border border-1 border-black">
      <h1>this is home page</h1>
      <div className="card text-start">
        <div className="card-body">
          <h4 className="card-title">{user.userName}</h4>
          <p className="card-text">{user.Group}</p>
        </div>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </div>
  );
};

export default CreateUser;
