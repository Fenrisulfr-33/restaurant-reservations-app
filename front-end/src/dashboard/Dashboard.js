import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { listReservations, listTables, freeTable, updateReservationStatus } from "../utils/api";
import { next, previous, today } from '../utils/date-time'
import ErrorAlert from "../layout/ErrorAlert";
import ReservationList from './reservationList/ReservationList';
import TablesList from './tableList/TablesList'

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
    listTables()
      .then(setTables)
      .catch(setTablesError);
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

  const finish = async (table) => {
    const ac = new AbortController();
    try {
      await freeTable(table.table_id, ac.signal);
    } catch(error) {
      setReservationsError(error);
    }
  }

  const cancel = async (reservation) => {
    const ac = new AbortController();
    try {
      await updateReservationStatus(reservation.reservation_id, 'cancelled', ac.signal)
    } catch (error) {
      setReservationsError(error);
    }
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
      <ReservationList reservations={reservations} date={date} cancel={cancel}/>
      <TablesList tables={tables} finish={finish} />
    </main>
  );
}

export default Dashboard;
