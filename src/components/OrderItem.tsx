import React, {FC} from 'react';
import {IOrder} from "../models/IOrder";

interface OrdersItemProps {
    order: IOrder
}

const ICON_WIDTH = '32'
const ICON_HEIGHT = '32'


const OrderItem: FC<OrdersItemProps> = ({order}) => {

    return (
        <>
            <td className='ms-1 me-5 mt-1 mb-1'><img title={order.buy_payment} src={`./images/${(order.buy_payment).toLowerCase()}.svg`} width={ICON_WIDTH} height={ICON_HEIGHT}/> -`{'>'}`
                <img title={order.sell_payment} src={`./images/${(order.sell_payment).toLowerCase()}.svg`} width={ICON_WIDTH} height={ICON_HEIGHT}/></td>
            <td className='ms-1 me-5 mt-1 mb-1'>{order.token}</td>
            <td className='ms-1 me-5 mt-1 mb-1'>{order.buy_price}</td>
            <td className='ms-1 me-5 mt-1 mb-1'>{order.sell_price}</td>
            <td className='ms-1 me-5 mt-1 mb-1'>{order.spread}</td>
        </>
    );
};

export default OrderItem;