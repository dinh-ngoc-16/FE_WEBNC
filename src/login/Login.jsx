import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { fetchLogin } from "./action";

export default function Login() {
  const [username, setuser] = useState("");
  const [password, setpass] = useState("");
  const location = useLocation();
  const dispatch = useDispatch();
  const submitLogin = () => {
    console.log(username, password);
    dispatch(fetchLogin({ username, password }, location));
    console.log(location);
    setuser("");
    setpass("");
  };
  const auth = useSelector((state) => state.authReducer);
  if (auth.data || localStorage.getItem("UserAdmin")) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <div className="container my-5">
        <div className="col-md-12 mb-3">
          <h3 color="red">LOG IN</h3>
        </div>
        <div className="col-md-12">
          <label htmlFor="inputUser4" className="form-label">
            User
          </label>
          <input
            type="text"
            className="form-control"
            id="inputUser4"
            value={username}
            onChange={(e) => setuser(e.target.value)}
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
            value={password}
            onChange={(e) => setpass(e.target.value)}
          />
        </div>
        {auth.err ? (
          <h3 className="mt-3" style={{ color: "red" }}>
            Something wrong please check your user or password again!
          </h3>
        ) : (
          ""
        )}
        <div className="col-12">
          <button className="btn btn-outline-dark mt-3" onClick={submitLogin}>
            Log in
          </button>
        </div>
      </div>
    </>
  );
}
