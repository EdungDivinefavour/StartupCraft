export default class Asset {
    id: string;
    name: string;
    price: number;
    isFavorite: boolean;

    constructor(id: string, name: string, price: number, isFavorite: boolean) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.isFavorite = isFavorite;
    }
}