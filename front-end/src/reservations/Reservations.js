import React, { useState } from "react";
import { useHistory } from "react-router";
import { createReservation } from "../utils/api";
import ErrorAlert from '../layout/ErrorAlert';

/**
 * Defines the reservations page.
 * All feilds are required and are not-nullable
 * After submitting return to the /dashbaord page which dispalys the date of the new reservation
 * If canceled, return the user to their previous page
 * Displays error if present from the API
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Reservations() {
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
            <h1>Reservations</h1>
            <ErrorAlert error={error} />
            <div className="d-md-flex mb-3 bg-secondary">
                <h4 className="mb-0">Reservations for date</h4>
                <div className='bg-dark'>
                    <form onSubmit={submitHandler}>
                        <label> First name:
                            <input
                                id='first_name' 
                                name="first_name"
                                required
                                value={formData.first_name}
                                onChange={changeHandler}
                            />
                        </label>
                        <label> Last name:
                            <input
                                id='last_name' 
                                name="last_name"
                                required
                                value={formData.last_name}
                                onChange={changeHandler}
                            />
                        </label>
                        <label> Mobile number:
                            <input
                                type='tel' 
                                name="mobile_number"
                                placeholder='000-000-0000'
                                minLength='7'
                                maxLength='12'
                                required
                                value={formData.mobile_number}
                                onChange={changeHandler}
                            />
                        </label>
                        <label> Reservation date:
                            <input 
                                type='date'
                                name="reservation_date"
                                required
                                value={formData.reservation_date} 
                                onChange={changeHandler}
                            />
                        </label>
                        <label> Reservation time:
                            <input 
                                type='time'
                                name="reservation_time"
                                required
                                value={formData.reservation_time}
                                onChange={changeHandler}
                            />
                        </label>
                        <label> Amount of people:
                            <input 
                                id='people'
                                name="people"
                                type='number'
                                value={formData.people}
                                onChange={changeHandler} 
                            />
                        </label>
                        <button
                            type="submit"
                            className="btn btn-primary mr-2"
                        >Submit</button>
                        <button
                            type="button"
                            className="btn btn-secondary mr-2"
                            onClick={cancelHandler}
                        >Cancel</button>
                    </form>
                </div>
            </div>  
        </main>
    );
}

export default Reservations;