import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
/* Utilities */
import { listReservation, updateReservation } from "../utils/api";
/* Componenets */
import ReservationForm from "./ReservationForm";

/**
 * A form for editing a current reservation
 * @returns {JSX.Element}
 *  a updated reservation in the list
 */
export default function EditReservation() {
    // grab the users history
    const history = useHistory();
    // get reservation_id from params
    const { reservation_id } = useParams();
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
    // get the reservation info to prefill the form
    useEffect(() => {
    const getReservation = async () => {
        const ac = new AbortController();
        try {
        const reservation = await listReservation(reservation_id, ac.signal);
        const { first_name, last_name, mobile_number, reservation_date, reservation_time, people } = reservation;
        setFormData({
            first_name,
            last_name,
            mobile_number,
            reservation_date,
            reservation_time,
            people
        })
        } catch (error) {
        setError(error);
        }
    }
    getReservation();
    }, [reservation_id])
    // on submit return the user to the dashboard and shows their reservations
    const submitHandler = async (event) => {
        event.preventDefault();
        const ac = new AbortController();
        try {
            formData.people = Number(formData.people);
            await updateReservation(reservation_id, formData, ac.signal);
            history.push(`/dashboard?date=${formData.reservation_date}`);
        } catch (error) {
            setError(error);
        }
    }
    
    return (
        <ReservationForm formData={formData} setFormData={setFormData} error={error} submitHandler={submitHandler} />
    );
}