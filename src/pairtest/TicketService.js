import InvalidPurchaseException from "./lib/InvalidPurchaseException.js";
import TicketCalculator from "./lib/TicketCalculator.js";
import TicketPaymentService from "../thirdparty/paymentgateway/TicketPaymentService.js";
import SeatReservationService from "../thirdparty/seatbooking/SeatReservationService.js";

// ## constraint - - The TicketService interface CANNOT be modified. (For Java solution only) - therefore can be modified

export default class TicketService {
    /**
     * Should only have private methods other than the one below.
     */

    purchaseTickets(accountId, ...ticketTypeRequests) {
        try {
            if (!Number.isInteger(accountId) || accountId === 0) {
                throw new TypeError("Invalid account number");
            }

            const tickets = new TicketCalculator(ticketTypeRequests);
            const requiredNumberOfSeats = tickets.numberOfSeats;
            const totalPrice = tickets.totalPrice;

            const paymentSuccess = new TicketPaymentService().makePayment(
                accountId,
                totalPrice
            );
            const seatReservationSuccess =
                new SeatReservationService().reserveSeat(
                    accountId,
                    requiredNumberOfSeats
                );

            return {
                success: true,
            };
        } catch (error) {
            throw new InvalidPurchaseException(error);
        }
    }
}
