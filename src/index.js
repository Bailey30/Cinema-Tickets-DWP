import TicketService from "./pairtest/TicketService.js";

const ticketService = new TicketService();

const accountId = 2;
const ticketData = [
    {
        type: "ADULT",
        noOfTickets: 2,
    },
    {
        type: "CHILD",
        noOfTickets: 2,
    },
    {
        type: "INFANT",
        noOfTickets: 2,
    },
];

const { success } = ticketService.purchaseTickets(accountId, ...ticketData);
