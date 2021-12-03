import { useHistory } from 'react-router-dom';

/**
 * 
 * @props {table, finish}
 *  a table obj, a finish function
 * @returns 
 *  a row with the table data
 */
 export default function Table({ table, finish }) {
    const history = useHistory();
    let color = '';
    if (table.reservation_id) {
        color = 'table-danger';
    }

    /**
     * @returns {JSX.Element}
     *  an update table and reservations list
     */
    const handleFinish = async (event) => {
        const result = window.confirm(`Is this table ready to seat new guests? This cannot be undone`);
        if (result) {
            await finish(table);
            history.push('/');
        }
    }

    return (
        <tr className={color}>
            <th scope='row'>{table.table_id}</th>
            <td>{table.table_name}</td>
            <td>{table.capacity}</td>
            <td data-table-id-status={table.table_id}>{table.reservation_id ? 'Occupied' : 'Free'}</td>
            <td>{table.reservation_id ? 
                (
                    <button data-table-id-finish={table.table_id} 
                    className='btn btn-danger'
                    type='button'
                    onClick={handleFinish}>
                    Finish
                   </button>
                ) : (
                    ''
                )}</td>
           
        </tr>
    )
}