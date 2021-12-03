/**
 * @returns {JSX.Element}
 *  a table drop down menu
 */
export default function TablesDropDown({ table: { table_id, table_name, capacity} }) {
    return (
            <option value={table_id}>{table_name} - {capacity}</option>
    )
}