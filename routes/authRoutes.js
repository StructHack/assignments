const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const {validateUserSignUp, checkValidationResult, validateUserLogin} = require('../middleware/validation');
const {requireAuth, checkUser} = require('../middleware/authenticationCheck')

// LOGIN AND SIGNUP ROUTES
router.get('/signup', authController.signup_get);
router.post('/signup', validateUserSignUp,checkValidationResult, authController.signup_post);
router.get('/login', authController.login_get);
router.post('/login',validateUserLogin,checkValidationResult,authController.login_post);

// ADD POSTS ROUTES
router.get('/posts',requireAuth, checkUser,authController.posts_get)
router.get('/posts/:postId',requireAuth, checkUser,authController.posts_get)
router.post('/posts',requireAuth, checkUser,authController.posts_post)

// DELETE POST ROUTES
router.get('/deletePost/:postId',requireAuth, checkUser, authController.post_delete)
router.get('/logout',requireAuth, checkUser, authController.logout)

//UPDATE DATA
router.post('/updateData/:postId',requireAuth, checkUser, authController.post_update);

module.exports = router;