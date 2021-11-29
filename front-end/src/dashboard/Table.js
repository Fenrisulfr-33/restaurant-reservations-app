import { deleteReservation, listTables } from "../utils/api";
import { useHistory } from 'react-router-dom';

/**
 * 
 * @param {reservation}
 *  a reservation object 
 * @returns 
 *  a row with the reservation data
 */
 function Table({ table, finish }) {
    const history = useHistory();
    async function handleFinish(event) {
        const result = window.confirm(`Is this table ready to seat new guests? This cannot be undone`);
        if (result) {
            finish(table.table_id);
            history.push('/');
        }
    }

    return (
        <tr>
            <td>{table.table_id}</td>
            <td>{table.table_name}</td>
            <td>{table.capacity}</td>
            <td data-table-id-status={table.table_id}>{table.reservation_id ? 'Occupied' : 'Free'}</td>
            <td>{table.reservation_id ? 
                (
                    <button data-table-id-finish={table.table_id} 
                    className='btn btn-danger'
                    onClick={handleFinish}>
                    Finish
                   </button>
                ) : (
                    ''
                )}</td>
           
        </tr>
    )
}

export default Table;
