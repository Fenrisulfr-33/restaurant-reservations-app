/**
 * 
 * @param {reservation}
 *  a reservation object 
 * @returns 
 *  a row with the reservation data
 */
 function Table({ table }) {
    return (
        <tr>
            <td>{table.table_id}</td>
            <td>{table.table_name}</td>
            <td>{table.capacity}</td>
            <td data-table-id-status={table.table_id}>{table.reservation_id ? 'Occupied' : 'Free'}</td>
        </tr>
    )
}

export default Table;