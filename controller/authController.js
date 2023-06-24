const User = require('../model/User');
const jwt = require('jsonwebtoken');
const {requireAuth, checkUser} = require('../middleware/authenticationCheck')

const handleError = (error)=>{
    const data = {email:'', password:'', phone_number:''};
    if(error.message){
        //log error somewhere
        console.log(error.message)
    }
    return data;
}

/**COOKIE AGE**/
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id, email) => {
    return jwt.sign({ id, email}, process.env.SECRET, {
      expiresIn: maxAge
    });
  };


module.exports.login_get = (req, res)=>{
    res.status(200).send('LOGIN');
}
/**
 * 
 * Logging in user
 * 
 */
module.exports.login_post = async (req, res)=>{
    const {email, password} = req.body;
    try{
        const user = new User(email, password);
        const login_user = await user.login(email, password);
        if(login_user === 'Email or Password Incorrect.'){
            res.status(400).json({status:'false', 'msg':'Email/Password Incorrect'});
        }else if(login_user){
            const user_id = login_user[0].id;
            const user_email = login_user[0].email;

            const token = createToken(user_id, user_email)
            res.cookie('jwt',token,{httpOnly: true, sameSite: 'strict', maxAge: 3 * 24 * 60 * 60 * 1000})
            res.status(200).json({status:'success', 'msg':'User Logged in', 'data':login_user});
        }else{
            res.status(400).json({status:'false','msg':'Error occured while logging in.'})
        }

    }catch(err){
        console.log(err)
        const error = handleError(err);
        res.status(400).json({status:'false', 'error':error});
    }
}

module.exports.signup_get = (req, res)=>{
    res.status(200).send('SIGNUP');
}
/**
 * 
 * Signing up user using post request
 *  
 */
module.exports.signup_post = async (req, res)=>{
    const {email, password, phone_number} = req.body;
    try{
        const user = new User(email, password, phone_number);
        const signup_user =  await user.signup(email, password, phone_number);
        
        if(signup_user === 'Email Already Exists'){
            res.status(400).json({status:'false','msg':'Email Already Exists.'});
        }else if(signup_user){
            res.status(200).json({status:'success', 'msg':'User created', 'data':signup_user})
        }else{
            res.status(400).json({status:'false','msg':'Error creating user.'});
        }

    }catch(err){
        const error = handleError(err)
        res.status(400).json({status:'false', 'error':error})
    }  
}
/**
 * 
 * Logout by setting cookie to a very small time
 *  
 */
module.exports.logout= async (req, res)=>{
    res.cookie('jwt','logout',{maxAge:10});
    res.status(200).json({status:'success', 'msg':'User Logged out'});
}

/**
 * 
 * Get all the posts
 *  
 */

module.exports.posts_get = async (req, res)=>{
    const postId = req.params.postId;
    const user = res.locals.user;
    try{
        const post = new User(user.email, user.password, user.phone_number);
        const posts = await post.getPosts(postId);
        res.status(200).json({'msg':'success', data: posts[0]})
    }catch(err){
        const error = handleError(err)
        res.status(400).json({status:'false', 'error':error})
    }
}

/*
*
*   Post data to a record
*/
module.exports.posts_post = async (req, res)=>{
    const postIt = req.body.post;
    const user = res.locals.user
    try{
        const post = new User(user.email, user.password, user.phone_number);
        const postUpdate = await post.updatePost(postIt, user.id);
        res.status(200).json({'msg':'success', data: postUpdate[0]})
    }catch(err){
        const error = handleError(err)
        res.status(400).json({status:'false', 'error':error})
    }
}

/*
*
*   Delete post by post_id
*/
module.exports.post_delete = async (req, res)=>{
    const postId = req.params.postId;
    console.log(postId)
    const user = res.locals.user;
    try{
        const post = new User(user.email, user.password, user.phone_number);
        const postDelete = await post.deletePost(postId, user.id);
        res.status(200).json({'msg':'success', data:postDelete[0]})
    }catch(err){
        const error = handleError(err);
        res.status(400).json({status:'fail', 'error':error})
    }
}
/*
*
*   Update post
*/
module.exports.post_update = async(req, res)=>{
    const postId = req.params.postId;
    const toPost = req.body.post
    const user = res.locals.user;
    try{
        const post = new User(user.email, user.password, user.phone_number);
        const postUpdate = await post.editPost(toPost,postId, user.id);
        res.status(200).json({'msg':'success', data:postUpdate[0]})
    }catch(err){
        const error = handleError(err);
        res.status(400).json({status:'fail', 'error':error})
    }
}