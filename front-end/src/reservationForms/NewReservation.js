import React, { useState } from "react";
import { useHistory } from "react-router";
/* Utilities */
import { createReservation } from "../utils/api";
/* Components */
import ReservationForm from "./ReservationForm";

/**
 * A form for submitting a new reservation
 * @returns {JSX.Element}
 *  an updated reservations list
 */
export default function NewReservation() {
    // grab the users history
    const history = useHistory();
    // handle errors from the backend
    const [error, setError] = useState(null);
    // create an inital empty form data
    const initalFormData = {
        first_name: '',
        last_name: '',
        mobile_number: '',
        reservation_date: '',
        reservation_time: '',
        people: '',
    };
    // set the formData
    const [formData, setFormData] = useState({ ...initalFormData });
    // on submit return the user to the dashboard and shows their reservations
    const submitHandler = async (event) => {
        event.preventDefault();
        const ac = new AbortController();
        try {
            formData.people = Number(formData.people);
            await createReservation(formData, ac.signal);
            history.push(`/dashboard?date=${formData.reservation_date}`);
        } catch (error) {
            setError(error);
        }
    }
    
    return (
        <ReservationForm formData={formData} setFormData={setFormData} error={error} submitHandler={submitHandler} />
    );
}