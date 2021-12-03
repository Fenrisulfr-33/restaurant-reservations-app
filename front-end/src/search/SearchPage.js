import { useState, useEffect } from "react";
/* Utilities */
import { listReservations } from '../utils/api';
/* Components */
import ErrorAlert from "../layout/ErrorAlert";
import ReservationList from '../dashboard/reservationList/ReservationList';

export default function SearchPage() {
    // set an array of reservations to empty
    const [reservations, setReservations] = useState([]);
    const [error, setError] = useState(null);
    const [mobile, setMobile] = useState('');
    const [notFound, setNotFound] = useState(false);
    // get the list of reservations by mobile number
    useEffect(() => {
        const ac = new AbortController();
        setError(null);
        const getReservations = async () => {
            try {
                const reservations = await listReservations({ mobile_number: mobile }, ac.signal);
                setReservations(reservations);
            } catch (error) {
    
            }
        }
        getReservations();
    }, [mobile])

    const handleChange = ({ target: { value } }) => {
		setMobile(value);
        console.log(reservations.length);
	}

    const handleSubmit = async (event) => {
        event.preventDefault();
        const ac = new AbortController();
        try {
            const data = await listReservations({ mobile_number: mobile }, ac.signal);
            setReservations(data);
            if (reservations.length === 0) {
                setNotFound(true);
            }
        } catch (error) {
            setError(error);
        }
    }

    return (
        <main>
            <h1>Find a reservation by phone number</h1>
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
            <ErrorAlert error={error} />
            <div>{mobile ? <ReservationList reservations={reservations} /> : ( '' )}</div>
            <div>{notFound ? ( <h4>No reservations found</h4> ) : ( ' ')}</div>
        </main>
    )
}