const knex = require("../db/connection");

/**
 * Create function
 *  creates a new table
 * @param {newTable} 
 *  the new table data
 * @returns {Promise<Error/any>}}
 *  a promise that resolve to the `json` data or an error
 */
function create(newTable) {
    return knex("tables")
        .insert(newTable, '*')
        .then(data => data[0]);
}

/**
 * Read function
 *  finds a specific table
 * @param {table_id} 
 *  the tables id number
 * @returns {Promise<Error/any>}}
 *  a promise that resolve to the `json` data or an error
 */
function read(table_id) {
    return knex('tables')
        .where({'table_id': table_id})
        .first();
}

/**
 * Update function
 *  updates a specific table reservation_id only
 * @param {table_id} 
 *  the table id number
 * @param {reservation_id} 
 *  the reservations id number
 * @returns {Promise<Error/any>}}
 *  a promise that resolve to the `json` data or an error
 */
function update(table_id, reservation_id) {
    return knex('tables')
        .select('*')
        .where({'table_id': table_id })
        .update({'reservation_id': reservation_id })
        .then(data => data[0]);
}

/**
 * Delete function
 *  replaces reservation on table to null
 * @returns {Promise<Error/any>}}
 *  a promise that resolve to the `json` data or an error
 */
 function destroy(table_id){
    return knex('tables')
        .where({ 'table_id': table_id })
        .update({ 'reservation_id': null });
}

/**
 * List function
 *  list of all tables by table name
 * @returns {Promise<Error/any>}}
 *  a promise that resolve to the `json` data or an error
 */
function list(){
    return knex('tables')
        .orderBy('table_name');
}

module.exports = {
    create,
    read,
    update,
    delete: destroy,
    list,
};