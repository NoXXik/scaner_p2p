import React, {useEffect, useState} from 'react';
import {useFetchOrdersMutation} from "../services/APIService";
import {IOrder} from "../models/IOrder";
import OrderList from "../components/OrderList";
import "../App.css"
import {Button} from "react-bootstrap";

const ICON_WIDTH = '32'
const ICON_HEIGHT = '32'


interface Icon {
    payment: string;
    imgSRC: string;
}

const P2P = () => {
    const [orders, {data}] = useFetchOrdersMutation()
    const [fiat, setFiat] = useState('USD')
    const [asset, setAsset] = useState<string[]>(["BTC"])
    const [payments, setPayments] = useState<string[]>(['Rosbank'])
    const [lp, setLp] = useState(true)
    // const iconsList: Icon[] = [{payment: "QIWI", imgSRC: "./images/qiwi.svg"},
    //     {payment: "TinkoffNew", imgSRC: "./images/tinkoffnew.svg"},
    //     {payment: "ABank", imgSRC: "./images/abank.svg"},
    //     {payment: "Rosbank", imgSRC: "./images/rosbank.svg"},
    //     {payment: "Advcash", imgSRC: "./images/advcash.svg"}]

    useEffect(() => {
        orders({limit: 10, fiat: fiat, assets: asset, payments: payments})
    }, [lp])

    const fiatSelect = (e: any) => {
        console.log(fiat)
        setFiat(e.target.value)
    }
    const assetSelect = (e: any) => {
        if (asset.find(i => i === e.target.value)) {
            setAsset(asset.filter((n) => n != e.target.value))
        } else {
            setAsset(asset.concat(e.target.value))
        }
    }

    const paymentSelect = (e: any) => {
        if (payments.find(i => i === e.target.value)) {
            setPayments(payments.filter((n) => n != e.target.value))
        } else {
            setPayments(payments.concat(e.target.value))
        }
    }

    const accepted = () => {
        orders({limit: 10, fiat: fiat, assets: asset, payments: payments})
    }

    setTimeout(() => {
         setLp(!lp)
    }, 10000)

    if (data) {
        console.log(data)
        return (
            <div>
                P2P
                <div>
                    <h5>Фиаты</h5>
                    <input type="button" className={fiat === "RUB" ? "p2p-fiat-switcher-active me-2 ms-1" : "p2p-fiat-switcher me-2 ms-1"}
                           value="RUB" onClick={(e) => fiatSelect(e)}/>
                    <input type="button" className={fiat === "USD" ? "p2p-fiat-switcher-active me-2 ms-2" : "p2p-fiat-switcher me-2 ms-2"}
                           value="USD" onClick={(e) => fiatSelect(e)}/>
                    <input type="button" className={fiat === "EUR" ? "p2p-fiat-switcher-active me-2 ms-2" : "p2p-fiat-switcher me-2 ms-2"}
                           value="EUR" onClick={(e) => fiatSelect(e)}/>
                    <input type="button" className={fiat === "UAH" ? "p2p-fiat-switcher-active me-2 ms-2" : "p2p-fiat-switcher me-2 ms-2"}
                           value="UAH" onClick={(e) => fiatSelect(e)}/>
                    <h5>Активы</h5>
                    <input type="button"
                           className={asset.find(i => i === 'BTC') ? "p2p-fiat-switcher-active me-2 ms-1" : "p2p-fiat-switcher me-2 ms-1"}
                           value="BTC" onClick={(e) => assetSelect(e)}/>
                    <input type="button"
                           className={asset.find(i => i === 'ETH') ? "p2p-fiat-switcher-active me-2 ms 2" : "p2p-fiat-switcher me-2 ms-2"}
                           value="ETH" onClick={(e) => assetSelect(e)}/>
                    <input type="button"
                           className={asset.find(i => i === 'BNB') ? "p2p-fiat-switcher-active me-2 ms 2" : "p2p-fiat-switcher me-2 ms-2"}
                           value="BNB" onClick={(e) => assetSelect(e)}/>
                    <input type="button"
                           className={asset.find(i => i === 'USDT') ? "p2p-fiat-switcher-active me-2 ms 2" : "p2p-fiat-switcher me-2 ms-2"}
                           value="USDT" onClick={(e) => assetSelect(e)}/>
                    <input type="button"
                           className={asset.find(i => i === 'BUSD') ? "p2p-fiat-switcher-active me-2 ms 2" : "p2p-fiat-switcher me-2 ms-2"}
                           value="BUSD" onClick={(e) => assetSelect(e)}/>
                    <h5>Платежки</h5>
                    <input type="button"
                           className={payments.find(i => i === 'QIWI') ? "p2p-fiat-switcher-active me-2 ms-1" : "p2p-fiat-switcher me-2 ms-1"}
                           value="QIWI" onClick={(e) => paymentSelect(e)}/>
                    <input type="button"
                           className={payments.find(i => i === 'TinkoffNew') ? "p2p-fiat-switcher-active me-2 ms 2" : "p2p-fiat-switcher me-2 ms-2"}
                           value="TinkoffNew" onClick={(e) => paymentSelect(e)}/>
                    <input type="button"
                           className={payments.find(i => i === 'Rosbank') ? "p2p-fiat-switcher-active me-2 ms 2" : "p2p-fiat-switcher me-2 ms-2"}
                           value="Rosbank" onClick={(e) => paymentSelect(e)}/>
                    <input type="button"
                           className={payments.find(i => i === 'Advcash') ? "p2p-fiat-switcher-active me-2 ms 2" : "p2p-fiat-switcher me-2 ms-2"}
                           value="Advcash" onClick={(e) => paymentSelect(e)}/>
                    <input type="button"
                           className={payments.find(i => i === 'ABank') ? "p2p-fiat-switcher-active me-2 ms 2" : "p2p-fiat-switcher me-2 ms-2"}
                           value="ABank" onClick={(e) => paymentSelect(e)}/>
                </div>
                <Button className='me-3 ms-1 mt-2 mb-2' variant="outline-primary" onClick={accepted}>Применить</Button>
                <OrderList orders={data}/>
            </div>
        );
    }
    return <div>P2P</div>

};

export default P2P;