import React, {FC, useEffect} from 'react';
import {orderAPI} from "../services/APIService";
import {IOrder} from "../models/IOrder";
import OrderItem from "./OrderItem";
import Table from 'react-bootstrap/Table'

const OrderList = ({orders}: { orders: IOrder[] }) => {

    return (
        <div>
            <Table className='d-flex justify-content-center bg-light' bordered hover>
                <div>
                    <thead>
                        <tr className='d-flex justify-content-evenly'>
                            <th className='ms-1 me-5 mt-1 mb-1'>BUY -`{">"}` SELL</th>
                            <th className='ms-1 me-5 mt-1 mb-1'>Asset</th>
                            <th className='ms-1 me-5 mt-1 mb-1'>Buy Price</th>
                            <th className='ms-1 me-5 mt-1 mb-1'>Sell Price</th>
                            <th className='ms-1 me-5 mt-1 mb-1'>Spread</th>
                        </tr>
                    </thead>
                    <tbody className='d-flex flex-column'>
                        {orders.map(order => <tr className='d-flex justify-content-evenly' key={order.id}><OrderItem order={order}/></tr>)}
                    </tbody>
                </div>
            </Table>
        </div>
    )
};

export default OrderList;