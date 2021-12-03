import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { today } from "../utils/date-time";
import Dashboard from "../dashboard/Dashboard";
import NewReservation from "../reservationForms/NewReservation";
import NotFound from "./NotFound";
import useQuery from '../utils/useQuery';
import NewTable from "../newTable/NewTable";
import SeatForm from "../seatForm/SeatForm";
import SearchPage from "../search/SearchPage";
import EditReservation from "../reservationForms/EditReservation";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  const query = useQuery();
  const date = query.get('date');

  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/dashboard">
        <Dashboard date={date || today()} />
      </Route>
      <Route path="/tables/new">
        <NewTable />
      </Route>
      <Route path="/reservations/new">
        <NewReservation />
      </Route>
      <Route path='/reservations/:reservation_id/seat'>
        <SeatForm />
      </Route>
      <Route path='/reservations/:reservation_id/edit'>
        <EditReservation />
      </Route>
      <Route path='/search'>
        <SearchPage />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
