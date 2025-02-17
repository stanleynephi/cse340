/**This function handles the sanitization process and 
 * vaidation process for the classification forms using the 
 * express-validator package
 */

const utilities = require(".")
const {body, validationResult} = require("express-validator")
const validate = {}


/**Validate the data sent from the classification forms */
validate.AddClassificationRules = () => {

    return [
        body("classification_name")
        .notEmpty().withMessage("Classification Name is required")
        .trim().escape().isLength({min:5})
    ]
}


/**Check if the data is okay to be passed into the database per the rules given */
validate.CheckAddClassificationData = async (req,res,next) => {
    const { classification_name} = req.body
    let errors = []
    errors = validationResult(req)
    if(!errors.isEmpty()){
        let nav = await utilities.getNav()
        let buildclassificationForm = await utilities.buildaddClassificationForms()
        res.render("add-classification",{
            errors,
            nav,
            buildclassificationForm,
            classification_name,
        })

        return
    }

    next()
}

module.exports = validate