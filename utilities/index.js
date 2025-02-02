//utilities to build the needed components that will be used multiple times over and over again.

const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'

  //loop thtough the contents of the data.row
  data.rows.forEach((row) => {
    list += "<li>"
    list += 
    '<a href="/inv/type/' +
        row.classification_id +
        '" title="See our inventory of ' +
        row.classification_name +
        ' vehicles">' +
        row.classification_name +
        "</a>"
      list += "</li>"
  })
  list += "</ul>"
  return list
}



/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function (data) {
  let grid
  if(data.length > 0) {
    grid = '<ul id="inv-display">'
    data.forEach(vehicle => {
      grid += '<li>'
      grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
      + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
      + 'details"><img src="' + vehicle.inv_thumbnail 
      +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
      +' on CSE Motors" /></a>'
      grid += '<div class="namePrice">'
      grid += '<hr />'
      grid += '<h2>'
      grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
      grid += '</h2>'
      grid += '<span>$' 
      + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      grid += '</div>'
      grid += '</li>'
  })
  grid += '</ul>'
  }
  else {
     grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}

/**This block of code takes the data sent from the database about the car and then
 * wraps it up in an HTML element ready for the view
 */
Util.buildCarDetails = async function (data){
    if (!data || data.length === 0) {
      return '<p class="notice">Sorry, no matching vehicles could be found.</p>'
    }

    const car = data[0]
    
    return `
    <div class="car-details">
      <img src="${car.inv_image}" alt="Image of ${car.inv_make} ${car.inv_model}" />
      <div class="details">
      <p><strong>Price:</strong> $${car.inv_price.toLocaleString()}</p>
      <p><strong>Year:</strong> ${car.inv_year}</p>
      <p><strong>Color:</strong> ${car.inv_color}</p>
      <p><strong>Milage:</strong> ${car.inv_miles}ml</p>
      <p><strong>Description:</strong> ${car.inv_description}</p>
      </div>
    </div>
  `;
}


/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req,res,next) => Promise.resolve(fn(req,res,next)).catch(next)

module.exports = Util