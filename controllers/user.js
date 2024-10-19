const User=require('../models/user')
const {v4: uuidv4}=require('uuid')
const { setuser }=require("../service/auth")

async function usersignup(req,res){
    const {name, email, password}=req.body;
    await User.create({
        name,
        email,
        password,
    });
    return res.redirect('/');
}

async function userlogin(req,res){
    const {email, password}=req.body;
    const user=await User.findOne({ email,password });
    console.log('User', user);
    if(!user) return res.render('login',{
        error:'Invalid username or password',
    });
    const sessionid=uuidv4();
    setuser(sessionid, user);
    res.cookie('uid', sessionid);
    return res.redirect('/');
}

module.exports={
    usersignup,
    userlogin,
}