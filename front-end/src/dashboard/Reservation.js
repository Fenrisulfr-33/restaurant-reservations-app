/**
 * 
 * @param {reservation}
 *  a reservation object 
 * @returns 
 *  a row with the reservation data
 */
export default function Reservation({ reservation }) {
    // change row color based upon status
    let color = '';
    if (reservation.status === 'finished') {
        color = 'table-danger';
    } else if (reservation.status === 'seated'){
        color = 'table-success';
    }
    return (
        <tr className={color}>
            <th scope='row'>{reservation.reservation_id}</th>
            <td>{reservation.first_name}</td>
            <td>{reservation.last_name}</td>
            <td>{reservation.mobile_number}</td>
            <td>{reservation.reservation_date}</td>
            <td>{reservation.reservation_time}</td>
            <td>{reservation.people}</td>
            <td data-reservation-id-status={reservation.reservation_id}>{reservation.status}</td>
            <td>
            {reservation.status === 'booked' ?
                (
                    <a className="btn btn-secondary"
                    href={`/reservations/${reservation.reservation_id}/seat`}>
                    Seat
                    </a>
                ) : (
                    ''
                )}
            </td>
        </tr>
    )
}