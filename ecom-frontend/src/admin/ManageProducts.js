import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { NavLink } from "react-router-dom";
import { getProducts, deleteProduct } from "./apiAdmin";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const { user, token } = isAuthenticated();

  const productList = () => {
    getProducts().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };
  useEffect(() => {
    productList();
  }, []);

  const delPro = productId => {
    deleteProduct(productId, user._id, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        productList();
      }
    });
  };
  return (
    <Layout
      title="Mange products"
      description="Perform Curd on products"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-12">
          <h2>Total {products.length} Products</h2>

          <table className="table table-bordered">
            <thead>
              <tr>
                <td>Product Name</td>
                <td>Price</td>
                <td colspan="2">Action</td>
              </tr>
            </thead>
            <tbody>
              {products.map((p, i) => (
                <tr key={i}>
                  <td>{p.name}</td>
                  <td>{p.price}</td>
                  <td>
                    <NavLink to={`/admin/product/update/${p._id}`}>Update</NavLink>
                  </td>
                  <td>
                    <span
                      style={{cursor:'pointer'}}
                      onClick={() => {
                        delPro(p._id);
                      }}
                    >
                      Delete
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default ManageProducts;
