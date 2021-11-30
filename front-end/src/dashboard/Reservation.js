/**
 * 
 * @param {reservation}
 *  a reservation object 
 * @returns 
 *  a row with the reservation data
 */
function Reservation({ reservation }) {
        return (
            <tr>
                <td>{reservation.reservation_id}</td>
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

export default Reservation
