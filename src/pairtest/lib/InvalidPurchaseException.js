export default class InvalidPurchaseException extends Error {
    static handle(error) {
        const stackTrace = error.stack;

        console.error("Error occurred:");
        console.error(stackTrace);

        const topFrame = stackTrace.split("\n")[1].trim();
        console.error("Error occurred at:", topFrame);
    }
}
