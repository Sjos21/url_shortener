const express=require("express");
const {usersignup, userlogin}=require("../controllers/user");


const router=express.Router();

router.post("/",usersignup);

router.post("/login", userlogin);

module.exports=router;