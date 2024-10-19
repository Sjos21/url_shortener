const express=require("express");
const path=require("path")
const {connecttomongodb}=require("./connect")

const urlroute=require("./routes/url");
const staticRoute=require("./routes/staticrouter")
const userRoute=require("./routes/user")

const app=express();
const URL=require('./models/url')
const PORT=8007;


connecttomongodb("mongodb://localhost:27017/short-url")
.then(()=>console.log("mongodb connected"));


app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/url/:shortId', async (req,res)=>{
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

app.get('/test', async(req,res)=>{
    const allurls=await URL.find({});
    return res.render("home", {
        urls: allurls,
    })
});

app.use("/url", urlroute)
app.use("/", staticRoute);
app.use("/user", userRoute);
app.listen(PORT, ()=>console.log(`server started at PORT:${PORT}`));