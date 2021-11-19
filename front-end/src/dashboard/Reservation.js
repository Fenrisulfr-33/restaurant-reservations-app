/**
 * 
 * @param {reservation}
 *  a reservation object 
 * @returns 
 *  a row with the reservation data
 */
function Reservation({ data: { reservation_id, first_name, last_name, mobile_number, reservation_date, reservation_time, people } }) {

    return (
        <tr>
            <td>{reservation_id}</td>
            <td>{first_name}</td>
            <td>{last_name}</td>
            <td>{mobile_number}</td>
            <td>{reservation_date}</td>
            <td>{reservation_time}</td>
            <td>{people}</td>
        </tr>
    )
}

export default Reservation
