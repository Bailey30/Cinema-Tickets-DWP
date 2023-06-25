# Ticket Service

Implementation of TicketService that:

-   Calculates the correct amount for the requested tickets and makes a payment request to the `TicketPaymentService`.
-   Calculates the correct no of seats to reserve and makes a seat reservation request to the `SeatReservationService`.
-   Rejects any invalid ticket purchase requests.

## Installation

To install this app, simply clone it down to your local machine:

```bash
git clone https://github.com/Bailey30/MetricsAPI change_repo_name
```

Once you have cloned the app, navigate to the app's root directory:

```bash
cd change_repo_name
```

Then, install the app's dependencies using npm:

```bash
npm install
```

## Running the app

To run the app, use the following command:

```bash
node src/index.js
```

Returns 'success: true' if the ticket data is valid.

## Running Tests

To run tests, run the following command

```bash
  npm run test
```
