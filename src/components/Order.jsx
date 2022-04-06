import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Order() {
  const [total, setTotal] = useState(0);
  const [data, setdata] = useState();
  const state = useSelector((state) => state.handleCart);

  useEffect(() => {
    let a;
    if (localStorage.getItem("UserAdmin")) {
      setdata(JSON.parse(localStorage.getItem("UserAdmin")));
    }
    if (state.length >= 2) {
      a = state.reduce((a, b) => {
        return a.qty * a.price + b.qty * b.price;
      });
    } else {
      a = state[0].qty * state[0].price;
    }
    setTotal(a);
    localStorage.setItem("order", JSON.stringify(state));
  }, [state]);

  console.log(total);
  console.log(data);
  return (
    <>
      <div className="container">
        <h2 className="text-center my-5">Confirm Order</h2>
        <h4 className="my-4">Name: {data?.username}</h4>
        <h4 className="my-4">Email: {data?.email}</h4>
        <h4 className="my-4">Total Payment: ${total}</h4>
        <h5>Payment Mothod:</h5>
        <select
          className="form-select form-select-lg mb-3"
          aria-label=".form-select-lg example"
        >
          <option value={1}>Cash</option>
          <option value={2}>Visa/MasterCard</option>
          <option value={3}>E-Wallet</option>
        </select>
        <button className="btn btn-lg btn-outline-dark mt-4 mb-5">
          Payment
        </button>
        <Link to="/" className="btn btn-lg btn-dark mt-4 mb-5 mx-4">
          Cancel
        </Link>
      </div>
    </>
  );
}
