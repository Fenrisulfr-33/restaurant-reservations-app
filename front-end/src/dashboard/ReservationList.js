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
        <table className='table table-hover'>
            <thead>
                <tr>
                    <th scope='col'>ID</th>
                    <th scope='col'>First name</th>
                    <th scope='col'>Last name</th>
                    <th scope='col'>Mobile number</th>
                    <th scope='col'>Reservation Date</th>
                    <th scope='col'>Reservation Time</th>
                    <th scope='col'>People</th>
                    <th scope='col'>Status</th>
                    <th scope='col'>Seat</th>
                </tr>
            </thead> 
            <tbody>
                {list}
            </tbody>
        </table>
    )
}

export default ReservationList
