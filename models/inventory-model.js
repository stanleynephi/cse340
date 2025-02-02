//code here is used to interact with our database.
//This code is used to interact with the tables in the database
//import the connection file from the database folder.
const pool = require("../database/index")

/* ***************************
 *  Get all classification data
 * ************************** */

//create an async function to send a query to the database.
async function getClassifications() {
  try{
    return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
  }
  catch(error){
    console.log(error);
  }
}


//create a function to query the database basaed of a single query
 async function getClassificationsbyID(classification_Id) {
  try{
    const data =  await pool.query(`SELECT * FROM public.inventory AS i 
      JOIN public.classification AS c 
      ON i.classification_id = c.classification_id 
      WHERE i.classification_id = $1`
      , [classification_Id])
      
      return data.rows
  }
  catch(error){
   console.error("getclassificationsbyid error " + error)
  }
}


//function to query the database for infomation about a single car
async function getCarDetails(inv_id) {
  try{
    console.log("query with inv_id", inv_id)
    const data =  await pool.query(
      `SELECT * FROM public.inventory WHERE inv_id = $1`, 
      [inv_id])
    return data.rows
  }

  catch (error){
    console.error("There is an error in the code" + error)
  }
}

module.exports = {getClassifications, getClassificationsbyID, getCarDetails}