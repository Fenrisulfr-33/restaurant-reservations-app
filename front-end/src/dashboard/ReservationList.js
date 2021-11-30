import Reservation from "./Reservation"

/**
 * 
 * @props {reservations, date}
 *  reservations list of objs, and todays date  
 * @returns {JSX.Element}
 *  a table with a list of rows
 */
function ReservationList({ reservations, date }) {
    // filter the reservations list for the current date
    const findDate = reservations.filter((obj) => obj.reservation_date === date);
    // map that list with reservation components
    const listByDate = findDate.map((obj) => <Reservation key={obj.reservation_id} reservation={obj} />);
    // table with the rows being the map
    return (
        <table className='table'>
            <thead>
                <tr>
                    <td>ID</td>
                    <td>First name</td>
                    <td>Last name</td>
                    <td>Mobile number</td>
                    <td>Reservation Date</td>
                    <td>Reservation Time</td>
                    <td>People</td>
                    <td>Status</td>
                    <td>Seat</td>
                </tr>
            </thead> 
            <tbody>
                {listByDate}
            </tbody>
        </table>
    )
}

export default ReservationList
