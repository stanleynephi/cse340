/* ******************************************
 * This server.js file is the primary file of the
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const env = require("dotenv").config()
const app = express()
const static = require("./routes/static")
const baseController = require("./Contoller/baseController")
//require the inventoryRoute.js just built
const inventoryRoute = require("./routes/inventoryRoute")
const Util = require("./utilities")


/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout")




/* ***********************
 * Routes
 *************************/
app.use(static)


//Index Route
app.get("/",Util.handleErrors( baseController.buildHome))

//inventory routes app.use directes the express application to use the resource provided as parameter.
// /inv being used suggest that any file starting with inv will  be directed to the inventory.js file
app.use("/inv", inventoryRoute)

//add a 404 route to handle any unknown routes
app.use(async(req,res,next) => {
  next({status: 404, message: "Sorry we dont know what you are looking for...🤷‍♂️🤷‍♀️"})
})




/** We use the express built in error handlers to 
 * handle errors in the code and also that from the promise recieved from 
 * our database.
 * Placed abouve all middlewear
 */
app.use(async (err,req,res,next) => {
  let nav = await Util.getNav()
  console.error(`Error at: "${req.originalUrl}" : ${err.message}`)
  if(err.status == 404){ message = err.message} else { message = "Well guess what?  The Server is broken Sorry !" }
  res.render("errors/errors", {
    title:err.status || "Server Error",
    message: err.message,
    nav
  })
})



/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT
const host = process.env.HOST

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})
