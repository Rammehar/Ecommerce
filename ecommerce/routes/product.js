const express = require("express");
const router = express.Router();

//load the controllers
const {
  create,
  productById,
  read,
  remove,
  update,
  list,
  listRelated,
  listCategories,
  listBySearch,
  photo,
  listSearch
} = require("../controllers/product");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

//get all products
router.get("/product", read);
//get singel product
router.get("/product/:productId", read);
//save product
router.post("/product/create/:userId", requireSignin, isAuth, isAdmin, create);
//delete product
router.delete(
  "/product/:productId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  remove
);
//update product
router.put(
  "/product/:productId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  update
);
//list related products
router.get("/products/related/:productId", listRelated);

//all products
router.get("/products", list);
//get products by category or search query
router.get("/products/search", listSearch);
//list related
router.get("/products/related/:productId", listRelated);
//get product categories
router.get("/products/categories", listCategories);
// route - make sure its post
router.post("/products/by/search", listBySearch);
//get product photo
router.get("/product/photo/:productId", photo);
//get user by id
router.param("userId", userById);
//get product by id
router.param("productId", productById);
module.exports = router;
