const utilities = require("../utilities")
const accountRegister = require("../models/account-models")



/**Deliver a log in view */
async function buildLogin(req,res,next){
    let nav = await utilities.getNav()
    let login = await utilities.buildLoginForm()
    res.render("account/login", {
        title: "Login",
        nav,
        login

    })
}

/** Deliver a register account in view */
async function buildRegister(req,res,next){
    let nav = await utilities.getNav()
    let registration = await utilities.buildRegisterForms()
    res.render("account/register", {
        title: "Register",
        nav,
        registration,
        errors: null
    })
}


//account registery code and rendering.
async function registerAccount(req,res){
    let nav = await utilities.getNav()
    let login = await utilities.buildLoginForm()
    let registration = await utilities.buildRegisterForms()
    const {account_firstname, account_lastname, account_email, account_password} = req.body

    const regResult = await accountRegister.registerAccount(
        account_firstname,
        account_lastname,
        account_email,
        account_password
    )

    if(regResult) {
        req.flash(
            "notice",
            "Congratulations, your account has successfully been created."
        )
        
        res.status(201).render ("account/login", {
            title: "Login",
            nav,
            login,
            errors: null
      
        })
    }

    else{
        req.flash(
            "notice",
            "Sorry account could not be created"
        )

        res.status(501).render("account/register", {
            title:"Register",
            nav,
            registration,
            errors: null
          
        })
    }
}

module.exports = {buildLogin, buildRegister,registerAccount}