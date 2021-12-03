import Table from "./Table"

/**
 * 
 * @props {tables, finish}
 *  ra list of table objs, a finish function 
 * @returns {JSX.Element}
 *  a table with a list of rows
 */
 export default function TablesList({ tables, finish }) {
    // list out all tables
    const list = tables.map((obj) => <Table key={obj.table_name} table={obj} finish={finish} />);

    return (
        <table className='table table-hover'>
            <thead>
                <tr>
                    <th scope='col'>Table id</th>
                    <th scope='col'>Table name</th>
                    <th scope='col'>Capacity</th>
                    <th scope='col'>Occupied?</th>
                    <th scope='col'>Finish</th>
                </tr>
            </thead> 
            <tbody>
                {list}
            </tbody>
        </table>
    )
}