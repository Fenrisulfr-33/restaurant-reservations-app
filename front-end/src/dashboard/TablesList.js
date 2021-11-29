import Table from "./Table"

/**
 * 
 * @props {reservations, date}
 *  reservations list of objs, and todays date  
 * @returns {JSX.Element}
 *  a table with a list of rows
 */
function TablesList({ tables, finish }) {

    // list out all tables
    const list = tables.map((obj) => <Table key={obj.table_name} table={obj} finish={finish} />);

    return (
        <table className='table'>
            <thead>
                <tr>
                    <td>Table id</td>
                    <td>Table name</td>
                    <td>Capacity</td>
                    <td>Occupied?</td>
                    <td>Finish</td>
                </tr>
            </thead> 
            <tbody>
                {list}
            </tbody>
        </table>
    )
}

export default TablesList
