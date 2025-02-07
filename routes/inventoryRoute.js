//creating three new requirement process.
/* create a new instance for the express app
create a new instance for the express router
and a new instance for the inventory controller.*/
const express = require('express');
const router = express.Router()
const Util = require("../utilities/")

//inventory controller
const invntoryController = require("../Contoller/inventoryController")


//build the route to build the inventory by classification view
router.get('/type/:classificationId', Util.handleErrors(invntoryController.buildInventoryByClassification))
router.get("/detail/:inv_Id",Util.handleErrors(invntoryController.buildInventoryByCarDetails))

//export the router instance
module.exports = router
