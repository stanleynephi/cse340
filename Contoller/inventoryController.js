const invModel = require("../models/inventory-model")
const utility = require("../utilities")

const invCont = {}
// const carInfo = {}

/** Build the  inventory by classification view*/
invCont.buildInventoryByClassification = async function (req, res, next ){
    try{
        const classification_id = req.params.classificationId
        const data = await invModel.getClassificationsbyID(classification_id)
        const grid = await utility.buildClassificationGrid(data)
        let nav = await utility.getNav()
        const className = data[0].classification_name
        res.render("./inventory/classification", {
        title: " " + className +" "+"Vehicle",
        nav,
        grid,
        })
    }

    catch(error){
        console.log("there is an error "+ error)
    }
}


/** Build an inventory by car details view */
invCont.buildInventoryByCarDetails = async function (req, res, next ){
    try{
        const carDetails = req.params.inv_Id
        const data = await invModel.getCarDetails(carDetails)
        const details = await utility.buildCarDetails(data)
        let nav = await utility.getNav()
        res.render("./cars/cars", {
            title: `${data[0].inv_make} ${data[0].inv_model}`,
            nav,
            details,
        })
        console.log(data)
    }
    catch(error){
        console.log("There is an error building the car details" + error)
    }
}




//export the model
module.exports = invCont