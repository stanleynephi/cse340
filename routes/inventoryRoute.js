//creating three new requirement process.
/* create a new instance for the express app
create a new instance for the express router
and a new instance for the inventory controller.*/
const express = require('express');
const router = express.Router()
const Util = require("../utilities/")
const classificationValidation = require("../utilities/classification-validation")

//inventory controller
const invntoryController = require("../Contoller/inventoryController")


//build the route to build the inventory by classification view
router.get('/type/:classificationId',invntoryController.buildInventoryByClassification)
router.get("/detail/:inv_Id",invntoryController.buildInventoryByCarDetails)
router.get("/management", invntoryController.buildManagementlinks)
router.get("/add-classification",invntoryController.addtoClassificationView)

//create the router post
router.post("/add-classification",
    classificationValidation.AddClassificationRules(),
    classificationValidation.CheckAddClassificationData,
    invntoryController.registerClassification
)

//export the router instance
module.exports = router
