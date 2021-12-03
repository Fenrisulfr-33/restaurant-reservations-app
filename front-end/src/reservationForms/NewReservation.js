import React, { useState } from "react";
import { useHistory } from "react-router";
/* Utilities */
import { createReservation } from "../utils/api";
/* Components */
import ErrorAlert from '../layout/ErrorAlert';

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
    // change handler for keeping the current text on screen
    const changeHandler = ({ target: { name, value } }) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    }
    // when canceled go back to the users previous page
    const cancelHandler = () => {
        history.goBack();
    }
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
        <main>
            <h1>Create a new reservation</h1>
            <ErrorAlert error={error} />
            <div className="d-md-flex mb-3">
                <div className=''>
                    <form onSubmit={submitHandler}>
                        <label className='form-label mt-2'>First name:</label>
                        <input
                            id='first_name' 
                            name="first_name"
                            required
                            value={formData.first_name}
                            onChange={changeHandler}
                            className='form-control'
                        /> 
                        <label className='form-label mt-2'>Last name:</label>
                        <input
                            id='last_name' 
                            name="last_name"
                            required
                            value={formData.last_name}
                            onChange={changeHandler}
                            className='form-control'
                        />
                        <label className='form-label mt-2'>Mobile number: </label>
                        <input
                            type='tel' 
                            name="mobile_number"
                            placeholder='000-000-0000'
                            minLength='7'
                            maxLength='12'
                            required
                            value={formData.mobile_number}
                            onChange={changeHandler}
                            className='form-control'
                        />
                        <label className='form-label mt-2'>Reservation date: </label>
                        <input 
                            type='date'
                            name="reservation_date"
                            required
                            value={formData.reservation_date} 
                            onChange={changeHandler}
                            className='form-control'
                        />
                        <label className='form-label mt-2'>Reservation time:</label>
                        <input 
                            type='time'
                            name="reservation_time"
                            required
                            value={formData.reservation_time}
                            onChange={changeHandler}
                            className='form-control'
                        />
                        <label className='form-label mt-2'>Amount of people:</label>
                        <input 
                            id='people'
                            name="people"
                            type='number'
                            value={formData.people}
                            onChange={changeHandler} 
                            className='form-control'
                        />
                        <button
                            type="submit"
                            className="btn btn-primary mt-4"
                        >Submit</button>
                        <button
                            type="button"
                            className="btn btn-secondary mt-4 ml-2"
                            onClick={cancelHandler}
                        >Cancel</button>
                    </form>
                </div>
            </div>  
        </main>
    );
}