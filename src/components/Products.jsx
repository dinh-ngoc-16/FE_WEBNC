import axios from "axios";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link, useLocation } from "react-router-dom";

export default function Products() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  const [cate, setcate] = useState("");
  const [page, setpage] = useState(0);

  const location = useLocation();
  let componentMounted = true;

  useEffect(() => {
    let getProducts = async () => {
      setLoading(true);
      let urls;
      if (cate === "") {
        urls = `https://store-backend-dinh.herokuapp.com/api/products?page=${page}`;
      } else {
        urls = `https://store-backend-dinh.herokuapp.com/api/products?category=${cate}&page=${page}`;
      }
      const res = await axios({
        url: urls,
        method: `get`,
      });
      if (componentMounted) {
        setData(await res.data);
        setFilter(await res.data.data);
        setLoading(false);
        console.log(filter);
      }
      return () => {
        componentMounted = false;
      };
    };
    getProducts();
  }, [cate, page]);

  const onNext = (pages) => {
    if (Number.isInteger(pages)) {
      setpage(pages - 1);
    }
    if (pages === "next") {
      setpage(page + 1);
    } else if (pages === "previous") {
      if (page === 0) {
        setpage(page);
      } else {
        setpage(page - 1);
      }
    }
  };

  const renderPage = () => {
    let page = [];
    let calcu = 0;
    let temp = data.totalRecol;
    for (let i = 0; i < data.totalRecol; i++) {
      calcu = (temp / 10).toFixed();
      if (calcu >= 0) {
        page.push(
          <li className="page-item" onClick={() => onNext(i + 1)}>
            <span className="page-link">{i + 1}</span>
          </li>,
        );
      }
      temp = temp - 10;
    }
    return page;
  };

  const Loading = () => {
    return (
      <>
        <div className="row">
          <div className="col-md-3">
            <Skeleton height={300} />
          </div>
          <div className="col-md-3">
            <Skeleton height={300} />
          </div>
          <div className="col-md-3">
            <Skeleton height={300} />
          </div>
          <div className="col-md-3">
            <Skeleton height={300} />
          </div>
        </div>
      </>
    );
  };

  const filterProduct = (cat) => {
    console.log(cat);
    setcate(cat);
  };

  const Showproducts = () => {
    return (
      <>
        <div className="product d-flex py-5 flex-wrap">
          {filter.map((item) => {
            return (
              <div key={item._id}>
                <div className="col-md-3 mb-4 mx-3">
                  <div
                    className="card h-100 text-center p-4"
                    key={item._id}
                    style={{ width: "18rem" }}
                  >
                    <img
                      src={item.img}
                      className="card-img-top"
                      alt="product"
                      height="200px"
                    />
                    <div className="card-body">
                      <h5 className="card-title mb-0">
                        {item.title?.substring(0, 12)}
                      </h5>
                      <p className="card-text">${item.price}</p>
                      <Link
                        to={`/product/${item._id}`}
                        className="btn btn-outline-dark"
                      >
                        Buy now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  };

  return (
    <div>
      <div className="container my-5 py-5">
        <div className="row">
          <div className="col-12 mb-5">
            <h1 className="display-6 fw-bolder text-center">Latst Products</h1>
            <hr />
          </div>
        </div>
        <div className="d-flex justify-content-center flex-column">
          {loading ? (
            <Loading />
          ) : (
            [
              <div className="buttons d-flex justify-content-center">
                <button
                  className="btn btn-outline-dark me-2"
                  onClick={() => filterProduct("")}
                >
                  All
                </button>
                <button
                  className="btn btn-outline-dark me-2"
                  onClick={() => filterProduct("man")}
                >
                  Men's Clothing
                </button>
                <button
                  className="btn btn-outline-dark me-2"
                  onClick={() => filterProduct("women")}
                >
                  Women's Clothing
                </button>
                <button
                  className="btn btn-outline-dark me-2"
                  onClick={() => filterProduct("kid")}
                >
                  Kid's Clothing
                </button>
                <button
                  className="btn btn-outline-dark me-2"
                  onClick={() => filterProduct("shoe")}
                >
                  Shoe
                </button>
              </div>,
              <Showproducts />,
            ]
          )}
        </div>
        {location.pathname === "/" ? (
          ""
        ) : (
          <nav aria-label="Page navigation example">
            <ul className="pagination pagination-lg justify-content-end">
              <li className="page-item" onClick={() => onNext("previous")}>
                <span className="page-link" aria-label="Previous">
                  <span aria-hidden="true">«</span>
                </span>
              </li>
              {
                /* <li className="page-item">
              <a className="page-link" href="#">
                1
              </a>
            </li> */ renderPage()
              }
              <li className="page-item" onClick={() => onNext("next")}>
                <span className="page-link" aria-label="Next">
                  <span aria-hidden="true">»</span>
                </span>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
}
