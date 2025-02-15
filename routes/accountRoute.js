/**Required files
 * express package
 * express.Router
 * utilities index
 * accounts controller
 */

const express = require('express');
const router = express.Router();
const utilities = require('../utilities/index');
const accountController = require ("../Contoller/accountController")
const accountValidation = require ("../utilities/account-validation")


//build the route to build the login classification view
router.get("/login", utilities.handleErrors(accountController.buildLogin))
router.get("/register",utilities.handleErrors(accountController.buildRegister))
//build the route to build the registration classification view
router.post("/register", 
    //add the validation rules to this code.
    accountValidation.RegisterRules(),
    accountValidation.CheckRegistrationData,
    utilities.handleErrors(accountController.registerAccount)
)


module.exports = router