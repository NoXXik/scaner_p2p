export interface IOrder {
    id: number;
    token: string;
    buy_payment: string;
    sell_payment: string;
    buy_price: number;
    sell_price: number;
    spread: number;
}
