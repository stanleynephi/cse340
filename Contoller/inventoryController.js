const invModel = require("../models/inventory-model")
const utility = require("../utilities")

const invCont = {}

/** Build the  inventory by classification view*/
invCont.buildInventoryByClassification = async function (req, res, next ){
    try{
        const classification_id = req.params.classificationId
        const data = await invModel.getClassificationsbyID(classification_id)
        const grid = await utility.buildClassificationGrid(data)
        let nav = await utility.getNav()
        const className = data[0].classification_name
        res.render("./inventory/classification", {
        title: className +" "+"Vehicle",
        nav,
        grid,
        })
    }

    catch(error){
        console.log("there is an error "+ error)
    }
}

//export the model
module.exports = invCont