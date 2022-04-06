import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addCart, delCart } from "../redux/action";

export default function Cart() {
  const [total, setTotal] = useState(0);
  const state = useSelector((state) => state.handleCart);

  useEffect(() => {
    let a;
    if (state != null || state != []) {
      if (state.length >= 2) {
        a = state.reduce((a, b) => {
          return a.qty * a.price + b.qty * b.price;
        });
      } else {
        a = state[0]?.qty * state[0]?.price;
      }
    }
    if (a >= 0) {
      setTotal(a);
    }
    localStorage.setItem("order", JSON.stringify(state));
  }, [state]);
  console.log(state);
  console.log(total);
  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };
  const delProduct = (product) => {
    dispatch(delCart(product));
  };
  return (
    <>
      <div className="container d-flex flex-column">
        {state.map((product) => {
          return (
            <div className="row bg-light my-5" key={product._id}>
              <div className="col-md-4">
                <img
                  src={product.img}
                  alt={product.title}
                  height="200px"
                  width="250px"
                />
              </div>
              <div className="col-md-4">
                <h3>{product.title}</h3>
                <p className="lead fw-bold">
                  {product.qty} X ${product.price} = ${" "}
                  {product.qty * product.price}
                </p>
                <button
                  className="btn btn-outline-dark me-4"
                  onClick={() => delProduct(product)}
                >
                  <i className="fa fa-minus"></i>
                </button>
                <button
                  className="btn btn-outline-dark me-4"
                  onClick={() => addProduct(product)}
                >
                  <i className="fa fa-plus"></i>
                </button>
              </div>
            </div>
          );
        })}
        <h2 className="totalAmount">Total Amount: ${total}</h2>
        {state.length == 0 ? (
          <Link to="/" className="btn btn-outline-dark my-5">
            Go To Home Page To Continue Shopping
          </Link>
        ) : (
          <Link to="/order" className="btn btn-outline-dark my-5">
            Process To Payment
          </Link>
        )}
      </div>
    </>
  );
}
