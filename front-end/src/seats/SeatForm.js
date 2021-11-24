import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { useHistory } from "react-router";
import { listTables, updateTable } from "../utils/api";
import TablesDropDown from "./TablesDropDown";
import ErrorAlert from '../layout/ErrorAlert';

function SeatForm() {
    const history = useHistory();
    // set the tables list
    const [tables, setTables] = useState([]);
    const [tablesError, setTablesError] = useState(null);
    // grab the reservation id from params
    const reservation_id = useParams();
    const initalFormData = {
        table_id: '',
        table_name: '',
        capacity: '',
        reservation_id: reservation_id,
    };
    const [table, setTable] = useState({ ...initalFormData });
    // load form
    useEffect(loadForm, []);
    // grab list of tables
    function loadForm() {
      const abortController = new AbortController();
      listTables(abortController.signal)
        .then(setTables)
        .catch(setTablesError);
      return () => abortController.abort();
    }
    // when canceled go back to the users previous page
    const cancelHandler = () => {
        history.goBack();
    }
    // when selected changes adjust value
    const handleChange = ({ target: { name, value } }) => {
        setTable({
            ...table,
            [name]: value,
        });
    }
    // on submit return the user to the dashboard and shows their reservations
    const submitHandler = async (event) => {
        event.preventDefault();
        const ac = new AbortController();
        try {
            await updateTable(table.table_id, reservation_id, ac.signal);
            history.push(`/dashboard`);
        } catch (error) {
            setTablesError(error);
        }
    }
    // map tables for selected
    const list = tables.map((obj) => <TablesDropDown key={obj.table_id} table={obj} />);

    return (
        <>
            <div>   
                Seat Form
            </div>
            <ErrorAlert error={tablesError} />
            <form onSubmit={submitHandler}>
                <select className="form-select" 
                    aria-label="Default select example"
                    name='table_id'
                    required
                    onChange={handleChange}
                >
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

export default SeatForm
