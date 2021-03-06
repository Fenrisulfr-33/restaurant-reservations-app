import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { useHistory } from "react-router";
/* Utilities */
import { listTables, updateReservationStatus, updateTable } from "../utils/api";
/* Components */
import TablesDropDown from "./TablesDropDown";
import ErrorAlert from '../layout/ErrorAlert';

export default function SeatForm() {
    const history = useHistory();
    // set the tables list
    const [tables, setTables] = useState([]);
    const [error, setError] = useState(null);
    const [tableId, setTableId] = useState('');
    // grab the reservation id from params
    const { reservation_id } = useParams();
    // load form
    useEffect(() => {
        const ac = new AbortController();
        const getTables = async () => {
            try {
                const tables = await listTables(ac.signal);
                setTables(tables)
            } catch (error) {
                setError(error)
            }
        }
        getTables();
    }, [])
    // when canceled go back to the users previous page
    const cancelHandler = () => {
        history.goBack();
    }
    // when selected changes adjust value 
    const handleChange = ({ target: { value } }) => {
        setTableId(value);
    }
    // on submit return the user to the dashboard and shows their reservations
    const submitHandler = async (event) => {
        event.preventDefault();
        const ac = new AbortController();
        try {
            await updateTable(tableId, reservation_id, ac.signal);
            await updateReservationStatus(reservation_id, 'seated', ac.signal);
            history.push(`/dashboard`);
        } catch (error) {
            setError(error);
        }
    }
    // map tables for selected
    const list = tables.map((obj) => <TablesDropDown key={obj.table_id} table={obj} />);

    return (
        <>
            <div>   
                Seat Form
            </div>
            <ErrorAlert error={error} />
            <form onSubmit={submitHandler}>
                <select className="form-select" 
                    aria-label="Default select example"
                    name='table_id'
                    required
                    onChange={handleChange}
                >
                    <option valeue=''>Select a table</option>
                    {list}
                </select>
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
            
        </>
    )
}