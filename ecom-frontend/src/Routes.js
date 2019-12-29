import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./core/Home";
import Shop from "./core/Shop";
import Cart from "./core/Cart";
import PrivateRoute from "./auth/PrivateRoute";
import Dashboard from "./user/UserDashboard";
import AdminRoute from "./auth/AdminRoute";
import AdminDashboard from "./user/AdminDashboard";
import Product from "./core/ProductDetail";
import Profile from "./user/Profile";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import Orders from "./admin/Orders";
import ManageProducts from "./admin/ManageProducts";
const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={Home} exact path="/" />
        <Route component={Shop} exact path="/shop" />
        <Route component={Signup} exact path="/signup" />
        <Route component={Signin} exact path="/signin" />
        <PrivateRoute component={Dashboard} exact path="/dashboard" />
        <Route exact path="/cart" component={Cart} />
        <PrivateRoute path="/profile/:userId" exact component={Profile} />
        <AdminRoute component={AdminDashboard} exact path="/admin/dashboard" />

        <AdminRoute component={AddCategory} exact path="/create/category" />
        <AdminRoute component={AddProduct} exact path="/create/product" />
        <AdminRoute component={Orders} exact path="/admin/orders" />

        <AdminRoute component={ManageProducts} path="/admin/products" exact />

        <Route component={Product} exact path="/product/:productId" />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
