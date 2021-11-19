const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./reservations.service");

/* Middleware functions */
/**
 * Verifies wether or not the new dish has all the correct information inputted into the form
 * @returns an error message for an incorrect property 
 */
 function createReservationRequirements(request, response, next){
  const { data: { first_name, last_name, mobile_number, reservation_date, reservation_time, people } = {} } = request.body;
  // automatically makes the variable the key and the atcual value the value
  const data = {
      first_name,
      last_name,
      mobile_number,
      reservation_date,
      reservation_time,
      people,
  }
  // all feilds must meet strict requirements
  if (!data.first_name || data.first_name === "") {
    next({
      status: 400,
      message: `To submit a reservation, input a first name`,
    });
    // a resonable standard is the firstName cannot be more then 20 chars and must be a string
  } else if (data.first_name.length > 20 || typeof(data.first_name) !== 'string') {
    next({
      status: 400,
      message: `First name is more then 20 characters or includes unwanted characters, only letters allowed`,
    });
  } else if (!data.last_name || data.last_name === "") {
    next({
      status: 400,
      message: `To submit a reservation, input a last name`,
    });
  } else if (data.last_name.length > 20 || typeof(data.last_name) !== 'string') {
    next({
      status: 400,
      message: `Last name is more then 20 characters or includes unwanted characters, only letters allowed`,
    });
  } else if (!data.mobile_number || typeof(data.mobile_number) !== 'string') {
    next({
      status: 400,
      message: `Must enter a mobile number, and must be only numbers`,
    });
  } else if (!data.reservation_date) {
    next({
      status: 400,
      message: `Must enter a reservation date`,
    });
  } else if (!data.reservation_time) {
    next({
      status: 400,
      message: `Must enter a reservation time`,
    });
  } else if (!data.people) {
    next({
      status: 400,
      message: `Must enter the amount of people in your party`,
    });
  }
  response.locals.data = data;
  next();
}

/* CRUDL */
/**
 * Create function
 *  create a reservation that fufills all the key requirements 
 * @param {request}
 *  request to server
 * @param {response}
 *  response from the server  
 * @param {next}
 *  jump to next function
 */
async function create(request, response, next){
  // get the data object from locals after it passes its checks
  const data = response.locals.data;
  // insert the push into the database here
  const information = await service.create(data);
  // send a 201 status and show the data sent to the db
  response.status(201).json({ data: information });
}

/**
 * List function
 *  show a list of all reservations in the db
 * @param {request} 
 *  a request to the server
 * @param {response} 
 *  a response from the server 
 */
async function list(request, response) {
  const data = await service.list();
  response.json({ data });
}

module.exports = {
  create: [createReservationRequirements, asyncErrorBoundary(create)],
  list: [asyncErrorBoundary(list)],
};
