import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";

export default function Product() {
  const { id } = useParams();
  const [product, setPorduct] = useState([]);
  const [loading, setloading] = useState(false);

  const dispatch = useDispatch();
  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    const getProduct = async () => {
      setloading(true);
      const res = await axios({
        url: `https://store-backend-dinh.herokuapp.com/api/products/find/${id}`,
        method: `get`,
      });
      setPorduct(await res.data);
      setloading(false);
    };

    getProduct();
  }, [id]);

  const Loading = () => {
    return (
      <>
        <div className="col-md-6">
          <Skeleton height={400} />
        </div>
        <div className="col-md-6">
          <Skeleton height={50} width={300} />
          <Skeleton height={75} />
          <Skeleton height={25} width={150} />
          <Skeleton height={100} />
        </div>
      </>
    );
  };

  const Showproducts = (props) => {
    return (
      <>
        <div className="col-md-6">
          <img
            src={product.img}
            alt={product.title}
            height="400px"
            width="400px"
          />
        </div>
        <div className="col-md-6">
          <div className="d-flex align-items-centers">
            <h4 className="m-2">Categories:</h4>
            {product.categories?.map((item, index) => (
              <h4 className="text-uppercase text-black-50 m-2" key={index}>
                {item},
              </h4>
            ))}
          </div>
          <h1 className="display-5">{product.title}</h1>
          <h3 className="display-6 fw-bold my-4">${product.price}</h3>
          <p className="lead text-wrap" style={{ overflowWrap: "break-word" }}>
            {product.desc}
          </p>
          <button
            className="btn btn-outline-dark px-4 py-2"
            onClick={() => addProduct(product)}
          >
            Add to Cart
          </button>
          <Link className="btn btn-dark ms-2 px-3 py-2" to="/cart">
            Go to Cart
          </Link>
        </div>
      </>
    );
  };

  return (
    <div>
      <div className="container py-5">
        <div className="row py-4">
          {loading ? <Loading /> : <Showproducts />}
        </div>
      </div>
    </div>
  );
}
