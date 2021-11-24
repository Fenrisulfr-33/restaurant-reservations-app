const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const reservationsService = require("./reservations.service");

/* Middleware functions */

/**
 * Check to see if as reservation_id param shows up in the list of reservations
 * @param {request}
 *  request from client
 * @param {response}
 *  response from the server  
 * @param {next}
 *  jump to next function, or error message
 * @returns {Promise<Error/any>}
 *  a reservation object if found
 */
async function reservationExists(request, response, next) {
  const { reservation_id } = request.params;
  const reservation = await reservationsService.read(reservation_id);
  if (reservation) {
    response.locals.reservation = reservation;
    return next();
  }
  next({ status: 404, message: `Reservation number: ${reservation_id}, is not in our system.` });
}

/**
 * Verify all request object variables satify all the restaurants requirments
 * @param {request}
 *  request from client
 * @param {response}
 *  response from the server  
 * @param {next}
 *  jump to next function, or error message
 * @returns {Promise<Error/any>}
 *  a reservation object in locals with proper values
 */
function createReservationRequirements(request, response, next){
  const { data: { first_name, last_name, mobile_number, reservation_date, reservation_time, people } = {} } = request.body;
  const time = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/;
  if (!first_name || first_name === '') {
    next({ status: 400, message: `To submit a reservation, input a first_name.` });
  } else if (!last_name || last_name === "") {
    next({ status: 400, message: `To submit a reservation, input a last_name.` });
  } else if (!mobile_number || typeof(mobile_number) !== 'string') {
    next({ status: 400, message: `To submit a reservation, input a mobile_number.` });
  } else if (!reservation_date || !Date.parse(reservation_date)) {
    next({ status: 400, message: `To submit a reservation, input a reservation_date.` });
  } else if (!reservation_time || !reservation_time.match(time)) {
    next({ status: 400, message: `To submit a reservation, input a reservation_time.` });
  } else if (!people || typeof(people) !== typeof(0) || !Number.isInteger(people) || people === 0) {
    next({ status: 400, message: `To submit a reservation, input the amount of people in your party.` });
  }

  const reservation = {
    first_name,
    last_name,
    mobile_number,
    reservation_date,
    reservation_time,
    people,
  };
  response.locals.reservation = reservation;
  next();
}

/**
 * Verify the request date and time are in the future
 * @param {request}
 *  request from client
 * @param {response}
 *  response from the server  
 * @param {next}
 *  jump to next function, or error message
 * @returns {Promise<Error/any>}
 *  A reservation date and time
 */
 function checkDatePast(request, response, next){
  const { reservation_date, reservation_time } = response.locals.reservation;
  if (Date.now() < new Date(reservation_date + ' ' + reservation_time)) {
    const tuesday = new Date(reservation_date).getUTCDay();
    if (tuesday === 2){
      next({ status: 400, message: `We are closed on tuesdays.` });
    }
    return next();
  } else {
    next({ status: 400, message: `reservation_date and reservation_time must be made in the future.` });
  }
  next();
}

/**
 * Verify the request time are within hours of operation
 * @param {request}
 *  request from client
 * @param {response}
 *  response from the server  
 * @param {next}
 *  jump to next function, or error message
 * @returns {Promise<Error/any>}
 *  A reservation time
 */
function checkTime(request, response, next){
  const { reservation_time } = response.locals.reservation;
  const time = reservation_time.split(':').join('');
  if ((time <= 1030) || (time > 2130)){
    next({ status: 400, message: `You cannot make a reservation on a before 10:30AM or after 9:30PM.` });
  }
  next();
}

/* CRUDL functions */

/**
 * Create function
 *  create a reservation that fufills all the key requirements 
 * @param {request}
 *  request to server
 * @param {response}
 *  response from the server  
 * @returns {JSON}
 *  a newly created reservation
 */
async function create(request, response){
  const reservation = await reservationsService.create(response.locals.reservation);
  response.status(201).json({ data: reservation });
}

/**
 * Read function
 *  reads an individual reservation based upon id 
 * @param {request}
 *  request to server
 * @param {response}
 *  response from the server 
 * @returns {JSON}
 *  a specific reservation
 */
async function read(request, response) {
  const reservation = response.locals.reservation;
  response.status(200).json({ data: reservation })
}

/**
 * List function
 *  show a list of all reservations in the db
 * @param {request} 
 *  a request to the server
 * @param {response} 
 *  a response from the server
 * @returns {JSON}
 *  a list of all reservations
 */
async function list(request, response) {
  const date = request.query.date;
  const data = await reservationsService.list(date);
  response.json({ data });
}

module.exports = {
  create: [asyncErrorBoundary(createReservationRequirements), asyncErrorBoundary(checkDatePast), asyncErrorBoundary(checkTime), asyncErrorBoundary(create)],
  read: [reservationExists, asyncErrorBoundary(read)],
  list: [asyncErrorBoundary(list)],
};
