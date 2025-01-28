const express=require("express");

const userController=require("../controllers/user")

const CartDetails = require("./cart");
const { CartGet } = require("../controllers/cartdisplay");
const { CartPut } = require("../controllers/cartremove");
const { authenticateToken } = require("../utils/authMiddeleware");

const router=express.Router();

router.route("/cart").post(authenticateToken,CartDetails);
router.get("/users",authenticateToken,userController.getUsers);
router.route("/cartget").get(authenticateToken,CartGet)
router.route("/cartput").post(authenticateToken,CartPut)
// router.route("/image").get(authenticateToken,AdminGEt)

module.exports=router;