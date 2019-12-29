import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { isAuthenticated } from "../auth";
import Layout from "../core/Layout";
import { createCategory } from "./apiAdmin";

const AddCategory = () => {
  const [ name, setName ] = useState("");
  const [ error, setError ] = useState(false);
  const [success, setSuccess] = useState(false);

  //destructure user and token from localstorage
  const { user, token } = isAuthenticated();

  const clickSubmit = e => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    //make request to api to create category
    createCategory(user._id, token, { name }).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setError("");
        setName("");
        setSuccess(true);
      }
    });
  };
  const handleChange = e => {
    setError("");
    setName(e.target.value);
  };
  const newCategoryForm = () => {
    return (
      <form onSubmit={clickSubmit}>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            type="text"
            className="form-control"
            onChange={handleChange}
            value={name}
            autoFocus
            required
          />
        </div>
        <button className="btn btn-outline-primary">Create Category</button>
      </form>
    );
  };

  const showSuccess = () => {
    if (success) {
      return <h2 className="text-success">{name} is created!</h2>;
    }
  };
  const showError = () => {
    if (error) {
      return <h2 className="text-danger">Catgegory shold be unique</h2>;
    }
  };
  const goBack = () => {
    return (
      <div className="mt-5">
        <NavLink to="/admin/dashboard" className="text-warning">
          Back to Dashboard
        </NavLink>
      </div>
    );
  };
  return (
    <Layout title="Add a New Category" description={`G day ${user.name}`}>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showSuccess()}
          {showError()}
          {newCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Layout>
  );
};

export default AddCategory;
