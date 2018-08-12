export class Delivery {
    id: string;
    coto: string;
    home: string;
    total: number;
    lineOrders: {
        price: number;
        qty: number;
        product: {
            id: string;
            name: string;
        };
    }[];
}
