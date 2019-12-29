import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { read, listRelated } from "./apiCore";
import ShowImage from "./ShowImage";
import moment from "moment";
import CardProduct from "./CardProduct";

const Product = props => {
  //states
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [error, setError] = useState(false);
  /*****/

  const loadSingleProduct = productId => {
    read(productId).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        //set product detail
        setProduct(data);
        //fetch related products
        listRelated(data._id).then(dt => {
          if (dt.error) {
            setError(dt.error);
          } else {
            setRelatedProduct(dt);
          }
        });
      }
    });
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, [props]);

  return (
    <Layout
      title={product && product.name}
      description={
        product && product.description && product.description.substring(0, 100)
      }
      className="container-fluid"
    >
      <div className="card">
        <div className="card-body">
          <ShowImage item={product} url="product" />
          <h4>{product.name}</h4>
          <p>{product.description}</p>
          <p>Price: {product.price}</p>
          <p className="black-9">
            Category: {product.category && product.category.name}
          </p>
        </div>
      </div>
      <hr />
      <div className="container-fluid">
        <h4>Related Products</h4>

        <div className="row">
          {relatedProduct.map((product, i) => (
            <div key={i} className="col-3 mb-3">
              <CardProduct product={product} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};
export default Product;
