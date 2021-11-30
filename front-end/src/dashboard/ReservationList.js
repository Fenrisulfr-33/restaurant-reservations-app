import Reservation from "./Reservation"

/**
 * 
 * @props {reservations, date}
 *  reservations list of objs, and todays date  
 * @returns {JSX.Element}
 *  a table with a list of rows
 */
function ReservationList({ reservations, date }) {
    let list;
    if (date) {
        // filter the reservations list for the current date
        const findDate = reservations.filter((obj) => obj.reservation_date === date);
        // map that list with reservation components
        list = findDate.map((obj) => <Reservation key={obj.reservation_id} reservation={obj} />);
    } else {
        // list made up of reservations by mobile number if date does not exist
        list = reservations.map((reservation) => <Reservation key={reservation.reservation_id} reservation={reservation} />)
    }
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
                {list}
            </tbody>
        </table>
    )
}

export default ReservationList
