const { check, validationResult, checkSchema } = require('express-validator')


exports.signupValidator = [
    check('firstName')
        .notEmpty()
        .withMessage('Fisrt name is required'),

    check('lastName')
        .notEmpty()
        .withMessage("Last name is required"),

    check('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Inavalid Email'),

    check('password')
        .notEmpty()
        .withMessage('password is required')
        .isLength({ min: 3 })
        .withMessage("password should contain minimum 3 characters")


]

exports.signinValidator = [
    check('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Inavalid Email'),


    check('password')
        .notEmpty()
        .withMessage('password is required')
        
]

exports.isRequestValid = (req, res, next) => {
    const errors = validationResult(req);
    const err = errors.array()
    if (err.length > 0) return res.status(400).json({ err: err[0].msg })
    next();
}