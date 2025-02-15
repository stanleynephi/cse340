/**
 * This code allows us to write user account data into our database
 */

const pool = require("../database/index")  /** This establishes a connection with our database */



/** Create a fcuntion to send data into our database using the registration
 * form data
 */

async function registerAccount(account_firstname,account_lastname,account_email,account_password){
    try{
        const sql = "insert into account (account_firstname,account_lastname,account_email,account_password) values ($1, $2, $3, $4) RETURNING *"
        const result = await pool.query(sql,[account_firstname,account_lastname,account_email,account_password])
        return result
    }
    catch(error){
        console.log(error.message)
    }
}


module.exports = {registerAccount}