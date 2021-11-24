import React, { useState } from "react";
import { useHistory } from "react-router";
import { createTable } from "../utils/api";
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
function Tables() {
    // grab the users history
    const history = useHistory();
    // handle errors from the backend
    const [error, setError] = useState(null);
    // create an inital empty form data
    const initalFormData = {
        table_name: '',
        capacity: '',
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
    // on submit retunr the user to the dashboard and shows their reservations
    const submitHandler = async (event) => {
        event.preventDefault();
        const ac = new AbortController();
        try {
            formData.capacity = Number(formData.capacity);
            await createTable(formData, ac.signal);
            history.push(`/`);
        } catch (error) {
            setError(error);
        }
    }
    return (
        <main>
            <h1>Tables</h1>
            <ErrorAlert error={error} />
            <div className="d-md-flex mb-3 bg-secondary">
                <h4 className="mb-0">Table name and capacity</h4>
                <div className='bg-dark'>
                    <form onSubmit={submitHandler}>
                        <label> Table name:
                            <input
                                name="table_name"
                                required
                                minLength={2}
                                value={formData.table_name}
                                onChange={changeHandler}
                            />
                        </label>
                        <label> Capacity:
                            <input 
                                type='number'
                                name="capacity"
                                required
                                value={formData.capacity}
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

export default Tables;