import { faNewspaper, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./dashboard.scss";

const Dashboard = () => {
  return (
    <div id="dashboard" className="d-flex justify-content-evenly">
      <a href="/users" className="card col-4 bg-primary p-2">
        <FontAwesomeIcon icon={faUser} />
        User manager
      </a>
      <a href="/posts" className="card col-4 bg-primary p-2">
        <FontAwesomeIcon icon={faNewspaper} />
        Post manager
      </a>
    </div>
  );
};

export default Dashboard;
