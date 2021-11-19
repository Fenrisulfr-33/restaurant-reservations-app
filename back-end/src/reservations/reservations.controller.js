const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./reservations.service");

/* Middleware functions */

/**
 * Verifies wether or not the new dish has all the correct information inputted into the form
 * @returns an error message for an incorrect property 
 */
 function createReservationRequirements(request, response, next){
  const { data: { first_name, last_name, mobile_number, reservation_date, reservation_time, people } = {} } = request.body;
  const data = {
    first_name,
    last_name,
    mobile_number,
    reservation_date,
    reservation_time,
    people,
  };
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
  // send data format to rest of functions
  response.locals.data = data;
  next();
}

/**
 * 
 * @returns 
 *  an error message if the date is in the past or on a tuesday
 */
 function checkDatePast(request, response, next){
  const data = response.locals.data;
  // format the date and time into UTC
  const format = data.reservation_date + ' ' + data.reservation_time;
  const formatDate = new Date(format);
  // format arguments from the request date and time
  const reqTime = formatDate.getTime(), reqDate = formatDate.getDate(), reqMonth = formatDate.getMonth(), reqYear = formatDate.getFullYear(); 
  const today = new Date();
  // format arguments from todays date and time
  const nowTime = today.getTime(), nowDate = today.getDate(), nowMonth = today.getMonth(), nowYear = today.getFullYear();
  // check to see if the date is in the past
  if (reqYear < nowYear) {
    next({
      status: 400,
      message: `The year you are trying to make a reservation in is in the past`
    });
  } else if ((reqYear >= nowYear) && (reqMonth < nowMonth)) {
    next({
      status: 400,
      message: `The month you are trying to make a reservation in is in the past`
    });
  } else if ((reqYear >= nowYear) && (reqMonth >= nowMonth) && (reqDate < nowDate)) {
    next({
      status: 400,
      message: `The day you are trying to make a reservation in is in the past`
    });
  } else if ((reqYear >= nowYear) && (reqMonth >= nowMonth) && (reqDate >= nowDate) && (reqTime < nowTime)) {
    next({
      status: 400,
      message: `The time you are trying to make a reservation in is in the past`
    });
  }
  // if the reservation is in the future but on a tuesday
  const tuesday = new Date(data.reservation_date).getUTCDay();
  if (tuesday === 2){
    next({
      status: 400,
      message: `You cannot make a reservation on a Tuesday`
    });
  }
  next();
}

/**
 * 
 * @returns
 *  an error message if the future reservation is not within hours of operation
 */
function checkTime(request, response, next){
  const data = response.locals.data;
  const format = data.reservation_date + ' ' + data.reservation_time;
  const formatDate = new Date(format);
  const getHours = formatDate.getHours(), getMins = formatDate.getMinutes();
  if ((getHours <= 10 && getMins < 30) || (getHours >= 21 && getMins > 30)){
    next({
      status: 400,
      message: `You cannot make a reservation on a before 10:30AM or after 9:30PM`
    });
  }

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
  create: [asyncErrorBoundary(createReservationRequirements), asyncErrorBoundary(checkDatePast), asyncErrorBoundary(checkTime), asyncErrorBoundary(create)],
  list: [asyncErrorBoundary(list)],
};
