const express = require("express");
const router = express.Router();

//load controllers
const {
  create,
  categoryById,
  read,
  remove,
  update,
  list
} = require("../controllers/category");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

//get singel category
router.get("/category/:categoryId", read);

//create a new category
router.post("/category/create/:userId", requireSignin, isAuth, isAdmin, create);

//get user by id
router.param("userId", userById);

//get category by id
router.param("categoryId", categoryById);

//delete category
router.delete(
  "/category/:categoryId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  remove
);

//update category
router.put(
  "/category/:categoryId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  update
);

//get all categories
router.get("/categories", list);

module.exports = router;
