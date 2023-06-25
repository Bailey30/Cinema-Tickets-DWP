import TicketService from "../src/pairtest/TicketService.js";
import TicketPaymentService from "../src/thirdparty/paymentgateway/TicketPaymentService";
import SeatReservationService from "../src/thirdparty/seatbooking/SeatReservationService";

describe("TicketService tests", () => {
    const ticketService = new TicketService();
    const validTicketData = [
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

    test("invalid accountId throws an error", () => {
        const accountId = "";

        expect(() =>
            ticketService.purchaseTickets(accountId, ...validTicketData)
        ).toThrow("Invalid account number");
    });

    test("calls makePayment method of TicketPaymentService", () => {
        const accountId = 123;

        const mockMakePayment = jest.fn();
        jest.spyOn(
            TicketPaymentService.prototype,
            "makePayment"
        ).mockImplementation(mockMakePayment);

        ticketService.purchaseTickets(accountId, ...validTicketData);

        expect(mockMakePayment).toHaveBeenCalledWith(accountId, 60);
    });

    test("calls reserveSeat method of SeatReservationService", () => {
        const accountId = 123;
        const totalSeatsToAllocate = 4;

        const mockReserveSeat = jest.fn();
        jest.spyOn(
            SeatReservationService.prototype,
            "reserveSeat"
        ).mockImplementation(mockReserveSeat);

        ticketService.purchaseTickets(accountId, ...validTicketData);

        expect(mockReserveSeat).toHaveBeenCalledWith(
            accountId,
            totalSeatsToAllocate
        );
    });
});
