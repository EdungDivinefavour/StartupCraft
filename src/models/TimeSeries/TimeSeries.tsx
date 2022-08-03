export default class TimeSeries {
    timestamp: number;
    price: number;

    constructor(timestamp: number, price: number) {
        this.timestamp = timestamp;
        this.price = price;
    }
}