import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
/* Utilities */
import { listReservations, listTables, freeTable, updateReservationStatus } from "../utils/api";
import { next, previous, today } from '../utils/date-time'
/* Components */
import ErrorAlert from "../layout/ErrorAlert";
import ReservationList from './reservationList/ReservationList';
import TablesList from './tableList/TablesList'

/**
 * Defines the dashboard page.
 * @props {date}
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
export default function Dashboard({ date }) {
  // all list states and error
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [error, setError] = useState(null);
  // load the dashboard
  useEffect(() => {
    const ac = new AbortController();
    const getReservations = async () => {
      try {
        const reservations = await listReservations({ date }, ac.signal);
        const tables = await listTables(ac.signal);
        setReservations(reservations);
        setTables(tables);
      } catch (error) {
        setError(error);
      }

    }
    getReservations();
  }, [date])
  // finish off a table via seat
  const finish = async (table) => {
    const ac = new AbortController();
    try {
      await freeTable(table.table_id, ac.signal);
    } catch(error) {
      setError(error);
    }
  }
  // cancel a reservation via cancel button
  const cancel = async (reservation) => {
    const ac = new AbortController();
    try {
      await updateReservationStatus(reservation.reservation_id, 'cancelled', ac.signal)
    } catch (error) {
      setError(error);
    }
  }

  return (
    <main>
      <h1>Reservations by date</h1>
      <ErrorAlert error={error} />
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