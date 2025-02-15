/* code here is the logic used to take client requests 
from the view and send them to the model 
to interact with the database.*/

const utitlities = require("../utilities")
const baseController = {}

baseController.buildHome = async function(req, res) {
  const nav = await utitlities.getNav()


  res.render("index", {title: "Home", nav})
 
}


module.exports = baseController

