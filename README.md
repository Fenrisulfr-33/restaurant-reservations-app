# Restaurant Reservation App

* **Link to current site**
https://restaurants-client-33.herokuapp.com/dashboard

* **What is it?** 
An application that lets you create reservations for a restaurant owner, with table seating, table availablity, and phone number look up.
* **Why create it?**
This is useful for any restaurant owner to give to their host staff so they can see what tables are already seated, tables available, table size, and which reservations were scheduled first and at what times. 

## Languages and Uses
* HTML
* CSS
* JavaScript
* Twitter Bootstrap - Easier for creating the cards and buttons.
* React
* Node.js
* PostgreSQL
* Express

## Preview
An entire view of the Dashboard of the app.

![Dashboard](https://github.com/Fenrisulfr-33/restaurant-reservations-app/blob/main/front-end/.screenshots/us-08-dont-cancel-reservation-after.png?raw=true)

Creating a new Table

![Dashboard](https://github.com/Fenrisulfr-33/restaurant-reservations-app/blob/main/front-end/.screenshots/us-04-short-table-name-before.png?raw=true)

Creating a new Reservation

![Dashboard](https://github.com/Fenrisulfr-33/restaurant-reservations-app/blob/main/front-end/.screenshots/us-02-reservation-is-future-before.png?raw=true)

## How to install

1. Open to a folder you wish to import the document into
2. git clone `https://github.com/Fenrisulfr-33/restaurant-reservations-app.git`
3. npm install
4. cd back-end/
5. npm install
6. cd ..
7. cd front-end/
8. npm install
9. Create an .env file in the back-end/ and make four postgreSQL DBs with the following format
  - DATABASE_URL=
  - DATABASE_URL_PREVIEW=
  - DATABASE_URL_TEST=
  - DATABASE_URL_DEVELPOMENT=
10. Your front-end/ .env will have the following
  - REACT_APP_API_BASE_URL=http://localhost:5000
11. You can then either 
  - `npx knex migrate:latest`
  - `npx knex seed:run`
  - (inside your root folder) `npm run start`
  Or if your are just running the tests
  - (inside your root folder) `npm run test`

## Future Goals
Change site to Aquaverde Restaurant and change formatting and color scheme.

## Reflection
Working through each indivdual tasks goes a long way when implementing new features, and while some stories require a bigger assessment of what your functions are doing it always ended up being, remove code and make one function do both to save efficeny instead of always piling more on top.