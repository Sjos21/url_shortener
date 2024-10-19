const sessionidtouser= new Map();

function setuser(id, user){
    sessionidtouser.set(id, user)
}

function getuser(id){
    return sessionidtouser.get(id);
}

module.exports={
    setuser,
    getuser,
}