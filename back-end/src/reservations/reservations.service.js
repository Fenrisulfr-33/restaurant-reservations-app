const knex = require("../db/connection");

/**
 * Create function
 *  creates a new reservation
 * @param {newReservation} 
 *  the new reservation data
 * @returns {Promise<Error/any>}}
 *  a promise that resolve to the `json` data or an error
 */
function create(newReservation) {
  return knex("reservations")
    .insert(newReservation, '*')
    .then(data => data[0]);
}

/**
 * Read function
 *  finds a specific reservation
 * @param {reservation_id} 
 *  the reservation id number
 * @returns {Promise<Error/any>}}
 *  a promise that resolve to the `json` data or an error
 */
function read(reservation_id) {
  return knex('reservations')
      .where({'reservation_id': reservation_id})
      .first();
}

/**
 * Update function
 *  updates a specific reservation, status only
 * @param {reservation_id} 
 *  the reservations id number
 * @returns {Promise<Error/any>}}
 *  a promise that resolve to the `json` data or an error
 */
 function update(reservation_id, status) {
  return knex('reservations')
      .where({ 'reservation_id': reservation_id })
      .update({ 'status': status })
      .returning('*')
      .then(data => data[0]);
}

/**
 * List function
 *  lists all reservations by a specific date
 * @param {date} 
 *  the current date
 * @returns {Promise<Error/any>}}
 *  a promise that resolve to the `json` data or an error
 */
function list(date){
  if (date) {
    return knex('reservations')
      .where('reservation_date', date)
      .orderBy('reservation_time');
  }
  return knex('reservations');
}

module.exports = {
  create,
  read,
  update,
  list,
};