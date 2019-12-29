import React, { useState, useEffect } from "react";
import { getCategories, list } from "./apiCore";
import CardProduct from "./CardProduct";

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: "",
    search: "",
    results: [],
    searched: false
  });
  const { categories, category, search, results, searched } = data;

  const loadCategories = () => {
    getCategories().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData({ ...data, categories: data });
      }
    });
  };
  useEffect(() => {
    loadCategories();
  }, []);

  const searchSubmit = e => {
    e.preventDefault();
    searchData();
  };
  const searchData = () => {
    if (search) {
      list({ search: search || undefined, category: category }).then(
        response => {
          if (response.error) {
            console.log(response.error);
          } else {
            setData({ ...data, results: response, searched: true });
          }
        }
      );
    }
  };

  const handleChange = name => event => {
    setData({ ...data, [name]: event.target.value, searched: false });
  };

  const searchProducts = (results = []) => {
    return (
      <>
        <div className="container">
          <h4 className="mt-4 mb-4">{searchMessage(searched, results)}</h4>
        </div>
        <div className="row">
          {results.map((product, i) => (
            <div key={i} className="col-3 mb-3">
              <CardProduct product={product} />
            </div>
          ))}
        </div>
      </>
    );
  };

  const searchMessage = (searched, results) => {
    if (searched && results.length > 0) {
      return `Found ${results.length} products`;
    }
    if (searched && results.length < 1) {
      return `No product found`;
    }
  };

  const searchForm = () => (
    <form onSubmit={searchSubmit}>
      <span className="input-group-text">
        <div className="input-group input-group-lg">
          <div className="input-group-prepend">
            <select className="btn mr-2" onChange={handleChange("category")}>
              <option value="">Select Category</option>

              {categories.map((c, i) => (
                <option key={i} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <input
            onChange={handleChange("search")}
            type="search"
            className="form-control"
            placeholder="Search by name"
          />
        </div>
        <div className="btn input-group-append" style={{ border: "none" }}>
          <button className="input-grouptext">Search</button>
        </div>
      </span>
    </form>
  );

  return (
    <div className="row">
      <div className="container mb-3">{searchForm()}</div>
      <div className="container-fluid mb-3">{searchProducts(results)}</div>
    </div>
  );
};

export default Search;
