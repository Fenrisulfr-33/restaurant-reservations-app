import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { listReservations, listTables, freeTable } from "../utils/api";
import { next, previous, today } from '../utils/date-time'
import ErrorAlert from "../layout/ErrorAlert";
import ReservationList from "./ReservationList";
import TablesList from "./TablesList";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  // load the dashboard
  useEffect(loadDashboard, [date]);

  // get the list of reservations for the day and tables list
  function loadDashboard() {
    const ac = new AbortController();
    setReservationsError(null);
    listReservations({ date }, ac.signal)
      .then(setReservations)
      .catch(setReservationsError);
    listTables().then(setTables);
    return () => ac.abort();
  }

  useEffect(loadTables, []);

  function loadTables() {
    const ac = new AbortController();
    setTablesError(null);
      listTables()
        .then(setTables)
        .catch(setTablesError);
    return () => ac.abort();
  }

  function finish(table) {
    const ac = new AbortController();
    freeTable(table.table_id, ac.signal)
    .then(loadDashboard)
    .catch(setReservationsError);
  }

  return (
    <main>
      <h1>Reservations by date</h1>
      <ErrorAlert error={reservationsError} />
      <ErrorAlert error={tablesError} />
      <nav className='btn-group mb-2'>
        <Link to={`/dashboard?date=${previous(date)}`}>
          <button className='btn btn-secondary'>Previous</button>
        </Link>
        <Link to={`/dashboard?date=${today()}`}>
          <button className='btn btn-primary ml-2'>Today</button>
        </Link>
        <Link to={`/dashboard?date=${next(date)}`}>
          <button className='btn btn-secondary ml-2'>Next</button>
        </Link>
      </nav>
      <ReservationList reservations={reservations} date={date}/>
      <TablesList tables={tables} finish={finish} />
    </main>
  );
}

export default Dashboard;
