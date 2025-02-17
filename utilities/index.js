//utilities to build the needed components that will be used multiple times over and over again.

const invModel = require("../models/inventory-model")
// const { link } = require("../routes/inventoryRoute")
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



/**
 * Build a form alyout for the login
 */
Util.buildLoginForm = async function(){
  return `
      <form class= "login_forms">
        <fieldset>
          <label>
            Email
            <input type="mail" name="email" placeholder="Email" id="account_email"/>
          </label>
          <label>
            Password
            <input type="password" name="password" placeholder="Password" id="account_password"/>
          </label>
        </fieldset>
        <fieldset>
          <input type="submit" name="submit" placeholder="Submit details"
        </fieldset>
      </form>
      <div class="signup_link">
        <a href="./register"> Sign Up</a>
      </div>
  `
}

Util.buildRegisterForms = async function(){
  return   `
  <form class= "login_forms" method="post" action="/account/register">
    <fieldset>
      <label>
        First Name
        <input type="text" name="account_firstname" placeholder="First Name" id="account_firstname"/>
      </label>
       <label>
        Last Name
        <input type="text" name="account_lastname" placeholder="Last Name" id="account_lastname"/>
      </label>
    </fieldset>
    <fieldset>
      <label>
        Email
        <input type="mail" name="account_email" placeholder="Email" id="account_email"/>
      </label>
      <label>
        Password
        <input type="password" name="account_password" placeholder="Password" id="account_password"/>
      </label>
    </fieldset>
    <fieldset>
      <input type="submit" name="submit" placeholder="Submit details"/>
    </fieldset>
  </form>
  <div class="signup_link">
    <a href="./login"> Sign In</a>
  </div>
`
}

Util.addClassificationForms =async function(){
  return `
  <span class="classification_noditce">Form Instructions</span>
    <form class= "add_classification" method="post" action="./add-classification">
      <fieldset>
        <label>
          Classification Name
          <input tpye="text" name="classification_name" placeholder="classification_name"/>
        </label>
      </fieldset>
      <fieldset>
        <input type="submit" name="submit" placeholder="Submit Details"/>
      </fieldset>
    </form>
  `
}


Util.ManagementLink = async function(){
  const links = `
    <div class="managementlinks">
        <a href="./add-classification"> Add New Classification</a>
        <a href="#"> Add New Inventory </a>
    </div>
  `
  return links
}


/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req,res,next) => Promise.resolve(fn(req,res,next)).catch(next)

module.exports = Util