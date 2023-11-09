import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  changePass,
  getUserById,
  updateUser,
} from "../../../service/userService";
import "./profile.scss";

const Profile = () => {
  let { id } = useParams();

  const [userData, setUserData] = useState({});
  const [userName, setUserName] = useState(userData.userName);
  const [userAddress, setUserAddress] = useState(userData.address);
  const [email, setEmail] = useState(userData.email);
  const [gender, setGender] = useState(userData.sex);
  const [phone, setPhone] = useState(userData.phone);
  const [dob, setDob] = useState(userData.dob);
  const [curPass, setCurPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [cfrPass, setCfrPass] = useState("");

  const getData = async () => {
    let res = await getUserById(id);

    setUserData(res.data);
    setUserName(res.data.userName);
    setEmail(res.data.email);
    setUserAddress(res.data.address);
    setGender(res.data.sex);
    setDob(res.data.dob);
    setPhone(res.data.phone);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    let newData = {
      userName,
      address: userAddress,
      email,
      gender,
      phone,
      dob,
      sex: gender,
    };
    let kq = await updateUser(id, newData);
    toast.success("successfully updated");
    console.log(kq);
  };

  const ChangePass = async (e) => {
    if (cfrPass == "" || newPass == "" || cfrPass == "") {
      toast.warning("you must to fill all the fields");
    } else if (cfrPass !== newPass) {
      toast.warning("password is not match!");
    } else {
      let result = await changePass(id, curPass, newPass);
      if (result.code == 1) {
        toast.success(result.message);
        setCfrPass("");
        setCurPass("");
        setNewPass("");
      } else {
        toast.error(result.message);
      }
    }
  };

  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const formattedDate = date.toISOString().slice(0, 10);

    return formattedDate;
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <section className="container rounded bg-white mt-5 mb-5" id="profile">
      <div className="row">
        <div className="col-md-3 border-right">
          <div className="d-flex flex-column align-items-center text-center p-3 py-5">
            <img
              className="rounded-circle mt-5"
              alt="avatar"
              width="150px"
              src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
            />
            <span className="font-weight-bold">{userName}</span>
            <span className="text-black-50">{email}</span>
            <span> </span>
          </div>
        </div>
        <div className="col-md-5 border-right">
          <form action="/" className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-right">Profile Settings</h4>
            </div>
            <div className="row mt-2">
              <div className="col-md-12">
                <label className="labels h6 mt-3">Name</label>
                <input
                  type="text"
                  value={userName ? userName : ""}
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                  className="form-control"
                  placeholder="first name"
                />
              </div>
            </div>

            <div className="col-md-12">
              <label className="labels h6 mt-3">Mobile Number</label>
              <input
                type="text"
                value={phone ? phone : ""}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                className="form-control"
                placeholder="enter phone number"
              />
            </div>

            <div className="col-md-12">
              <label className="labels h6 mt-3">Address </label>
              <input
                type="text"
                value={userAddress ? userAddress : ""}
                onChange={(e) => {
                  setUserAddress(e.target.value);
                }}
                className="form-control"
                placeholder="enter address "
              />
            </div>

            <div className="col-md-12">
              <label className="labels h6 mt-3">Dob</label>
              <input
                type="date"
                value={dob ? formatDate(dob) : ""}
                onChange={(e) => {
                  setDob(e.target.value);
                }}
                className="form-control"
                placeholder="enter dob"
              />
            </div>

            <div className="col-md-12">
              <label className="labels h6 mt-3">Email </label>
              <input
                type="text"
                value={email ? email : ""}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="form-control"
                placeholder="enter email "
              />
            </div>

            <div className="col-md-12">
              <label className="labels h6 mt-3">Gender</label>
              <div className="form-check">
                <input
                  type="radio"
                  id="male"
                  value="male"
                  name="sex"
                  checked={gender === "male"}
                  onChange={() => setGender("male")}
                  className="form-check-input"
                />
                <label htmlFor="male" className="form-check-label">
                  Male
                </label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  name="sex"
                  id="female"
                  value="female"
                  checked={gender === "female"}
                  onChange={() => setGender("female")}
                  className="form-check-input"
                />
                <label htmlFor="female" className="form-check-label">
                  Female
                </label>
              </div>
              <div className="mt-5 text-center">
                <button
                  className="btn btn-primary profile-button"
                  onClick={(e) => handleUpdateProfile(e)}
                >
                  Save Profile
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="col-md-4">
          <div className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center experience">
              <span>Change password</span>
            </div>

            <div className="col-md-12">
              <label className="labels h6 mt-3">Current password</label>
              <input
                type="text"
                value={curPass ? curPass : ""}
                onChange={(e) => {
                  setCurPass(e.target.value);
                }}
                className="form-control"
                placeholder="current pass"
              />
            </div>

            <div className="col-md-12">
              <label className="labels h6 mt-3">New password</label>
              <input
                type="text"
                value={newPass ? newPass : ""}
                onChange={(e) => {
                  setNewPass(e.target.value);
                }}
                className="form-control"
                placeholder="new password"
              />
            </div>

            <div className="col-md-12">
              <label className="labels h6 mt-3">Confirm password</label>
              <input
                type="text"
                value={cfrPass ? cfrPass : ""}
                onChange={(e) => {
                  setCfrPass(e.target.value);
                }}
                className="form-control"
                placeholder="confirm your password"
              />
            </div>
            <div className=" p-2 mt-3">
              <button
                onClick={(e) => ChangePass(e)}
                className="btn btn-primary"
              >
                Change
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
