const express=require("express");
const router=express.Router();
const {generatenewshorturl, generatenoofclicks}=require("../controllers/url");
const { ModifiedPathsSnapshot } = require("mongoose");
const {}=require("../controllers/url");

router.post('/', generatenewshorturl);

router.get('/analytics/:shortId',generatenoofclicks);

module.exports=router;