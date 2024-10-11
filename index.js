const express=require("express");
const urlroute=require("./routes/url");
const {connecttomongodb}=require("./connect")
const app=express();
const URL=require('./models/url')
const PORT=8007;

connecttomongodb("mongodb://localhost:27017/short-url")
.then(()=>console.log("mongodb connected"));

app.use(express.json());
app.get('/:shortId', async (req,res)=>{
    const shortId=req.params.shortId;
    const entry=await URL.findOneAndUpdate({
        shortId

    },{$push:{
        visitHistory:{
            timestamp:Date.now(),
        }
    }});
    res.redirect(entry.redirectURL);

})

app.use("/url", urlroute)
app.listen(PORT, ()=>console.log(`server started at PORT:${PORT}`));