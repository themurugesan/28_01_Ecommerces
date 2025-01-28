const express =require("express");
const singupController=require("../controllers/signup")

const router=express.Router();

router.post("/register",singupController.createUser)

module.exports=router
