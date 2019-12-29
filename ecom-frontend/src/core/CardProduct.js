import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import moment from "moment";
import ShowImage from "./ShowImage";
import { addItem, removeItem, updateItem } from "./cartHelper";

const CardProduct = ({ product, setRun = f => f, run = undefined }) => {
  const [redirect, setRedirect] = useState(false);

  const showStock = quantity => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill">In Stock</span>
    ) : (
      <span className="badge badge-primary badge-pill">Out of Stock</span>
    );
  };

  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true);
    });
  };
  const shouldRedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };
  return (
    <div className="card">
      <div className="card-header"> {product.name}</div>
      <div className="card-body">
        {shouldRedirect(redirect)}
        <ShowImage item={product} url="product" />
        <p>{product.description}</p>
        <p>Rs.{product.price}</p>
        <p className="black-9">
          Category: {product.category && product.category.name}
        </p>
        <p>Added On {moment(product.createdAt).fromNow()}</p>
        {showStock(product.quantity)}
        <br />
        <Link to={`/product/${product._id}`} className="mr-2">
          <button className="btn btn-outline-primary mt-2 mb-2">
            View Product
          </button>
        </Link>
        <button
          onClick={addToCart}
          className="btn btn-outline-danger mt-2 mb-2"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default CardProduct;
