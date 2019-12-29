import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import { getCart, removeItem, updateItem } from "./cartHelper";
import Checkout from "./Checkout";

const Cart = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getCart());
  }, []);

  const handleChange = productId => event => {
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
      setItems(getCart());
    }
  };

  const removeProductFromCart = productId => {
    removeItem(productId);
    setItems(getCart());
  };
  const showItems = items => {
    return (
      <div className="table-responsive">
        <h2>Your cart has {`${items.length}`} items</h2>
        <hr />
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((product, i) => (
              <tr key={i}>
                <td>{product.name}</td>

                <td>{product.price}</td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    value={product.count}
                    onChange={handleChange(product._id)}
                  />
                </td>
                <td>{product.total}</td>
                <td>
                  <Link to={`/product/${product._id}`} className="mr-2">
                    <span className="badge badge-danger">View Product</span>
                  </Link>
                  <button
                    onClick={() => removeProductFromCart(product._id)}
                    className="button btn-xs btn-primary"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const noItemsMessage = () => (
    <h2>
      Your cart is empty. <br /> <Link to="/shop">Continue shopping</Link>
    </h2>
  );

  return (
    <Layout
      title="Shopping Cart"
      description="Manage your cart items. Add remove checkout or continue shopping."
      className="container-fluid"
    >
      <div className="row">
        <div className="col-6">
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>

        <div className="col-6 mb-5">
          <h2 className="mb-4">Your cart summary</h2>
          <hr />
          <Checkout products={items} />
        </div>
      </div>
    </Layout>
  );
};
export default Cart;
