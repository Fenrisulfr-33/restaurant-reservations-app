import React, { useState } from "react";
import { useHistory } from "react-router";
/* Utilites */
import { createTable } from "../utils/api";
/* Componenets */
import ErrorAlert from '../layout/ErrorAlert';

/**
 * A form for submitting a new table
 * @returns {JSX.Element}
 *  a updated tables list
 */
export default function NewTable() {
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
    // on submit return the user to the dashboard and shows their reservations
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
            <h1>Create a new table</h1>
            <ErrorAlert error={error} />
            <div className="d-md-flex mb-3">
                <div className=''>
                    <form onSubmit={submitHandler}>
                        <label className='form-label mt-2'>Table name:</label>
                        <input
                            name="table_name"
                            required
                            minLength={2}
                            value={formData.table_name}
                            onChange={changeHandler}
                            className='form-control'
                        />
                        <label className='form-label mt-2'>Capacity:</label>
                        <input 
                            type='number'
                            name="capacity"
                            required
                            value={formData.capacity}
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