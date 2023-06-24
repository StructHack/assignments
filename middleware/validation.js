const {check, validationResult} = require('express-validator');

/*
User Signup validation
validate email
validate password
*/
module.exports.validateUserSignUp=[
    check('email').normalizeEmail().isEmail().withMessage('Invalid Email'),
    check('password').trim().not().isEmpty().isLength({min:6, max:20}).withMessage('Password\'s length must be greater than 6')
]

/*
User Login validation
validate email
validate password
*/
module.exports.validateUserLogin = [
    check('email').normalizeEmail().isEmail().withMessage('InvalidEmail'),
    check('password').trim().not().isEmpty().withMessage('Please Enter a password')
]

module.exports.checkValidationResult = (req, res, next)=>{
    const result = validationResult(req);
    if (result.isEmpty()) {
        return next();
    }

    const data = {email:[], password:[]}
    const errors = result.errors;

    for(let i=0; i<errors.length; i++){
        data[errors[i].path].push(errors[i].msg)
    }
    res.status(400).json({success:'false', data});
}