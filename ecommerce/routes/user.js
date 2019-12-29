const express = require("express");
const router = express.Router();
//import controllers
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");

const {
  userById,
  read,
  update,
  purchaseHistory
} = require("../controllers/user");

router.get("/secret/:userId", requireSignin, isAuth, isAdmin, (req, res) => {
  res.json({
    user: req.profile
  });
});

router.get("/orders/by/user/:userId", requireSignin, isAuth, purchaseHistory);

//get user profile details
router.get("/user/:userId", requireSignin, isAuth, read);
//update user
router.put("/user/:userId", requireSignin, isAuth, update);
router.param("userId", userById);

module.exports = router;
