import TicketCalculator from "../src/pairtest/lib/TicketCalculator.js";

describe("TicketCalculator tests", () => {
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
    const ticketCalculator = new TicketCalculator(ticketData);

    test("numberOfSeats getter returns expected value - infants do not count towards total number of seats", () => {
        const requiredNumberOfSeats = ticketCalculator.numberOfSeats;
        expect(requiredNumberOfSeats).toBe(4);
    });

    test("Correct payment amount is calculated", () => {
        const totalPrice = ticketCalculator.totalPrice;
        expect(totalPrice).toBe(60);
    });

    test('expect that "child and infant tickets cannot be purchased without purchasing an adult ticket" error is thrown', () => {
        const ticketsWithoutAdult = [
            {
                type: "CHILD",
                noOfTickets: 2,
            },
            {
                type: "INFANT",
                noOfTickets: 2,
            },
        ];

        expect(() => new TicketCalculator(ticketsWithoutAdult)).toThrow(
            "Child and Infant tickets cannot be purchased without purchasing an Adult ticket."
        );
    });

    test("throws an error when more Infant tickets than Adult tickets are purchased", () => {
        const ticketArray = [
            { type: "ADULT", noOfTickets: 2 },
            { type: "CHILD", noOfTickets: 1 },
            { type: "INFANT", noOfTickets: 3 },
        ];

        expect(() => new TicketCalculator(ticketArray)).toThrow(
            "Cannot purchase more Infant tickets than Adult tickets. Infants must sit on an adults lap and are not allocated a seat."
        );
    });

    test("throw an error when more than 20 tickets are purchased", () => {
        const ticketArray = [
            { type: "ADULT", noOfTickets: 20 },
            { type: "CHILD", noOfTickets: 1 },
            { type: "INFANT", noOfTickets: 3 },
        ];
        expect(() => new TicketCalculator(ticketArray)).toThrow(
            "Maximum number of tickets that can be purchases at any time is 20"
        );
    });
});
