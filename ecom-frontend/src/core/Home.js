import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import CardProduct from "./CardProduct";
import Search from "./Search";

const Home = () => {
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [productBySold, setProductBySold] = useState([]);
  const [error, setError] = useState(false);

  const loadProductByArrival = () => {
    getProducts("createdAt").then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };
  const loadProductBySold = () => {
    getProducts("sold").then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductBySold(data);
      }
    });
  };

  useEffect(() => {
    loadProductByArrival();
    loadProductBySold();
  }, []);

  return (
    <Layout
      title="Home Page"
      description="Node React Ecommerce Project"
      className="container-fluid"
    >
      <Search />
      <h2 className="mb-4">New Arrivals</h2>
      <div className="row">
        {productsByArrival.map((product, i) => (
          <div key={i} className="col-3 mb-3">
            <CardProduct product={product} />
          </div>
        ))}
      </div>
      <h2 className="mb-4">Products By Sold</h2>
      <div className="row">
        {productBySold.map((product, i) => (
          <div key={i} className="col-3 mb-3">
            <CardProduct product={product} />
          </div>
        ))}
        ;
      </div>
    </Layout>
  );
};

export default Home;
