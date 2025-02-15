/**This functions here uses the express-validator package to 
 * sanitize and validate user fomr informations.
 */


const utilities = require(".")
const { body, validationResult } = require("express-validator");
const validate = {}


/**Validate the registration Data Validation Rules */
validate.RegisterRules = () => {

    return [
        body("account_firstname")
        .notEmpty().withMessage("First name is required")
        .trim().escape().isLength({min:1}),

        body("account_lastname")
        .notEmpty().withMessage("Please Provide a Last Name")
        .trim().escape().isLength({min:1}),

        //validate email
        body("account_email")
        .notEmpty().withMessage("Please Provide and Email")
        .trim().escape().isEmail().normalizeEmail(),

        //validate the password
        body("account_password")
        .notEmpty().withMessage("Please Provide a Password that meet the requirements.")
        .trim().escape().isStrongPassword(
            {
                minLength:12,
                minUppercase:1,
                minNumbers:1,
                minLowercase:1,
                minSymbols:1
            }
        )
    ]
}


/**Checking the data againt the rules provided and return errors
 * or move to registration.
 */

validate.CheckRegistrationData = async (req,res,next) => {
    const { account_firstname, account_lastname, account_email} = req.body
    let errors = []
    errors = validationResult(req)
    if(!errors.isEmpty()){
        let nav = await utilities.getNav()
        let registration = await utilities.buildRegisterForms()
        res.render("account/register", {
            errors,
            title: "Registration",
            nav,
            registration,
            account_firstname,
            account_lastname,
            account_email

        })

        return
    }

    next()
}


module.exports = validate
