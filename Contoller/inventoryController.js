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


/** Build the management view controller */
invCont.buildManagementlinks = async function (req, res, next ){
    try{
        let nav = await utility.getNav()
        const links = await utility.ManagementLink()

        res.render("./inventory/management", {
            title: "Management",
            nav,
            links,
        })
    }

    catch(error){
        console.log("There is an error building the management links")
    }
}



/**Deliver add to classification view */
invCont.addtoClassificationView = async function(req,res,next) {
    try{
        let nav = await utility.getNav()
        const forms = await utility.addClassificationForms()
        res.render("./inventory/add-classification", {
            title: "Add Classification",
            nav,
            forms,
        })
    }

    catch(error){
        console.log("There is an error building the add classification view" + error)
    }
}

//classification registration process
invCont.registerClassification = async function (req,res){
    try{
        let nav = await utility.getNav()
        let forms = await utility.addClassificationForms()
        const {classification_name} = req.body

        const regResult = await invModel.addNewClassification(
            classification_name
        )

        if(regResult){
            req.flash(
                "success",
                "Classification has been added successfully"
            )

            res.status(201).render ("inventory/add-classification", {
                title: "Add Classification",
                nav,
                forms,
            })
        }

        else{
            req.flash(
                "error",
                "Classification has not been added"
            )
            res.status(501).render(
                "inventory/add-classification",{
                    title: "Add Classification",
                    nav,
                    forms
                }
            )
        }
    }

    catch(error){
        console.log("There is an error registering the classification" + error)
    }
}



//export the model
module.exports = invCont