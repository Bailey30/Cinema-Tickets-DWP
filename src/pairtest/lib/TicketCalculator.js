import TicketTypeRequest from "./TicketTypeRequest.js";

export default class TicketCalculator {
    // array of tickets instantiated from TicketTypeRequest
    #tickets;
    // calculated number o seats
    #numberOfSeats;
    // calculated total price
    #totalPrice;

    #Prices = { ADULT: 20, CHILD: 10, INFANT: 0 };

    constructor(ticketArray) {
        // Ensure ticketArray is an array
        this.#validateTicketArray(ticketArray);

        // Convert ticketArray into an array of TicketTypeRequest instances
        this.#tickets = ticketArray.map((ticket) => {
            return new TicketTypeRequest(ticket.type, ticket.noOfTickets);
        });

        // Calculate total ticket price and number of seats
        this.#totalPrice = this.#calculateTotalPrice(this.#tickets);
        this.#numberOfSeats = this.#totalNumberOfTickets(this.#tickets);

        //validate ticket rules
        if (this.#childOrInfantWithoutAdult(this.#tickets)) {
            throw new Error(
                "Child and Infant tickets cannot be purchased without purchasing an Adult ticket."
            );
        } else if (this.#moreInfantTicketsThanAdultTickets(this.#tickets)) {
            throw new Error(
                "Cannot purchase more Infant tickets than Adult tickets. Infants must sit on an adults lap and are not allocated a seat."
            );
        } else if (this.#numberOfSeats > 20) {
            throw new RangeError(
                "Maximum number of tickets that can be purchases at any time is 20"
            );
        }
    }

    get numberOfSeats() {
        return this.#numberOfSeats;
    }
    get totalPrice() {
        return this.#totalPrice;
    }

    #validateTicketArray(array) {
        if (!Array.isArray(array)) {
            throw new TypeError("ticketArray must be an array");
        } else if (array.length === 0) {
            throw new RangeError(
                "ticketArray must contain at least one ticket"
            );
        }
    }

    #calculateTotalPrice(array) {
        return array
            .filter((ticket) => {
                return ticket.getTicketType() !== "INFANT";
            })
            .reduce(
                (sum, ticket) =>
                    sum +
                    this.#Prices[ticket.getTicketType()] *
                        ticket.getNoOfTickets(),
                0
            );
    }

    #childOrInfantWithoutAdult(array) {
        return (
            array.find(
                (ticket) =>
                    ticket.getTicketType() === "CHILD" ||
                    ticket.getTicketType() === "INFANT"
            ) && !array.find((ticket) => ticket.getTicketType() === "ADULT")
        );
    }

    #moreInfantTicketsThanAdultTickets(array) {
        return array.find(
            (ticket, i, arr) =>
                ticket.getTicketType() === "INFANT" &&
                ticket.getNoOfTickets() >
                    arr
                        .find((ticket) => ticket.getTicketType() === "ADULT")
                        .getNoOfTickets()
        );
    }

    #totalNumberOfTickets(array) {
        // assumes that infant tickets don't contribute to the total number of tickets as they are free and don't require a seat
        return array
            .filter((ticket) => ticket.getTicketType() !== "INFANT")
            .reduce(
                (numberOfTickets, ticket) =>
                    numberOfTickets + ticket.getNoOfTickets(),
                0
            );
    }
}
