import { useState, useEffect } from "react";
import ReservationList from "../dashboard/ReservationList";
import { listReservations } from '../utils/api';
import ErrorAlert from "../layout/ErrorAlert";

export default function SearchPage() {

    const [reservations, setReservations] = useState([]);
    const [reservationsError, setReservationsError] = useState(null);
    const [mobile, setMobile] = useState('');
    const [notFound, setNotFound] = useState(false);

    useEffect(loadNumbers, [mobile]);

    // get the list of reservations for the day and tables list
    function loadNumbers() {
      const ac = new AbortController();
      setReservationsError(null);
      listReservations({ mobile_number: mobile }, ac.signal)
        .then(setReservations)
        // .then(() => setNumbers(true))
        .catch(setReservationsError);
      return () => ac.abort();
    }

    const handleChange = ({ target: { value } }) => {
		setMobile(value);
        console.log(reservations.length);
	}

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     console.log(reservations.length);
    // }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const ac = new AbortController();
        try {
            const data = await listReservations({ mobile_number: mobile }, ac.signal);
            setReservations(data);
            if (reservations.length === 0) {
                // window.alert('No reservations found');
                setNotFound(true);
            }
        } catch (error) {
            setReservationsError(error);
        }
    }

    return (
        <>
        <div className="navbar navbar-light bg-light">
            <div className="container-fluid">
                <form onSubmit={handleSubmit} className="d-flex" >
                <input className="form-control me-2" 
                    name='mobile_number'
                    type="search" 
                    placeholder="Enter a customer's phone number" 
                    aria-label="Enter a customer's phone number" 
                    onChange={handleChange}/>
                <button className="btn btn-outline-success" type="submit">Find</button>
                </form>
            </div>
        </div>
        <ErrorAlert error={reservationsError} />
        <div>{mobile ? <ReservationList reservations={reservations} /> : ('')}</div>
        <div>{notFound ? (<h4>No reservations found</h4>) : ('')}</div>
        </>
    )
}
