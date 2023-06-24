const jwt = require('jsonwebtoken');
const User = require('../model/User')
const dotenv = require('dotenv')

dotenv.config()
const requireAuth = (req, res, next) =>{
    const token = req.cookies.jwt;
    // check if the token in valid or not
    if(token){
        jwt.verify(token, process.env.SECRET,(err, decodedToken)=>{
            if(err){
                console.log(err.message);
                res.redirect('/login');
            }else{
                console.log(decodedToken);
                next();
            }
        })
    }else{
        res.redirect('/login')
    }
}

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, process.env.SECRET, async (err, decodedToken)=>{
            if(err){
                res.locals.user = null;
                next();
            }else{
                let user = new User(decodedToken.email, '');
                const data = await user.emailExists(decodedToken.email);
                res.locals.user = data[0];
                next();
            }
        })
    }else{
        res.locals.user = null;
        next();
    }
}

module.exports = {requireAuth, checkUser};