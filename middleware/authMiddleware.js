const jwt=require("jsonwebtoken")
//const user=require("../models/users");

const SECRET_KEY=process.env.SECRET_KEY

const requireauth=(req,res,next)=>{
    const token = req.cookies.jwt
    if(token){
        jwt.verify(token, SECRET_KEY,(err, decodedToken) => {
            
            if(err){
                res.redirect("/login")
            }
            else{
                req.user = decodedToken;
                next();
            }
        })
    }
    else{
        res.redirect("/login");
    }
}

module.exports= {requireauth};