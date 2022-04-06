import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Navbar() {
  const state = useSelector((state) => state.handleCart);
  const auth = useSelector((state) => state.authReducer);
  //   const [useName, setuseName] = useState("");

  //   useEffect(() => {
  //     const auth = JSON.parse(localStorage.getItem("UserAdmin"));
  //     if (auth != null) {
  //       setuseName(auth.username);
  //     }
  //   }, [useName]);
  if (auth.data) {
    <Navigate to="/" />;
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 shadow-sm">
        <div className="container">
          <Link className="navbar-brand fw-bold fs-2" to="/">
            DNH
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/products">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact
                </Link>
              </li>
            </ul>
            {/* <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form> */}
            <div className="buttons">
              {auth.data == null
                ? [
                    <Link to="/login" className="btn btn-outline-dark">
                      <i className="fa fa-sign-in me-1"></i> Login
                    </Link>,
                    <Link to="/register" className="btn btn-outline-dark ms-2">
                      <i className="fa fa-user-plus me-1"></i> Register
                    </Link>,
                  ]
                : ""}

              <Link to="/cart" className="btn btn-outline-dark ms-2">
                <i className="fa fa-shopping-cart me-1"></i> Cart (
                {state.length})
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
