import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { fetchReg } from "./action";

export default function Register() {
  const [username, setuser] = useState("");
  const [password, setpassword] = useState("");
  const [confrimPassword, setconfrimPassword] = useState("");
  const [email, setemail] = useState("");

  const dispatch = useDispatch();
  const submitRegis = () => {
    console.log(username, email, password);
    if (confrimPassword === password) {
      dispatch(fetchReg({ username, email, password }));
    }
    setuser("");
    setpassword("");
    setconfrimPassword("");
    setemail("");
  };
  const auth = useSelector((state) => state.fetchReg);
  if (auth.data) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div className="container my-5">
        <div className="col-md-12 mb-3">
          <h3>REGISTER FOR SHOPPING</h3>
        </div>
        <div className="col-md-12">
          <label htmlFor="inputEmail4" className="form-label">
            User
          </label>
          <input
            type="text"
            className="form-control"
            id="inputEmail4"
            onChange={(e) => setuser(e.target.value)}
            required
          />
        </div>
        <div className="col-md-12">
          <label htmlFor="inputPassword4" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="inputPassword4"
            onChange={(e) => setpassword(e.target.value)}
            required
          />
        </div>
        <div className="col-md-12">
          <label htmlFor="confrimPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="confrimPassword"
            onChange={(e) => setconfrimPassword(e.target.value)}
            required
          />
        </div>
        <div className="col-md-12">
          <label htmlFor="inputAddress" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="inputAddress"
            placeholder="abc@abc.com"
            onChange={(e) => setemail(e.target.value)}
            required
          />
        </div>
        <div className="col-12">
          <button
            type="submit"
            className="btn btn-outline-dark mt-3"
            onClick={submitRegis}
          >
            Sign up for free
          </button>
        </div>
      </div>
    </>
  );
}
