const knex = require("../db/connection");

/**
 * 
 * @param newReservation 
 *  the new reservation data
 * @returns {Promise<Error/any>}}
 *  a promise that resolve to the `json` data or an error
 */
function create(newReservation) {
  return knex("reservations")
    .insert(newReservation)
    .returning("*");
}
/**
 * 
 * @returns {json data}
 *  a data object with all reservations
 */
function list(){
  return knex('reservations')
    .select('*');
}

module.exports = {
  create,
  list,
};