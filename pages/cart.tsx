import Layout from "@/components/Layout/layout";

import BookCart from '../components/BookCart/bookCart';
// import { data } from "../mock"
import { RootState, useAppDispatch } from "@/pages/_app";
import { setCart, setQuantity, } from '@/pages/store/slices';
import { useSelector } from 'react-redux';
import { useState } from "react";

// import styles from './styles/register.css";
export default function Cart() {
    const dispatch = useAppDispatch();
    
    const cart = useSelector((state: RootState) => {
        return state.cartSlice.cart;
    })
    const quantity = useSelector((state: RootState) => {
        return state.cartSlice.quantity;
    })

    const calculateTotal = (newcart:{item:Item,quantity:number}[]) => {
        let totals = [] as { amount: number, curency: string }[];
        newcart.forEach((cartElem) => {
            let index = totals.findIndex(totalsElem => { return totalsElem.curency === cartElem.item.curency.name });

            if (index === (-1))
                totals.push({ amount: cartElem.item.price * cartElem.quantity, curency: cartElem.item.curency.name })
            else
                totals.splice(index, 1, {
                    amount: totals[index].amount + cartElem.item.price * cartElem.quantity, curency: cartElem.item.curency.name
                })
        });

        let totalStr = "";
        for (let i = 0; i < totals.length; i++) {
            if (totalStr !== "") { totalStr = totalStr + ` ,`; }

            totalStr = totalStr + `${totals[i].amount.toFixed(2)} ${totals[i].curency}`;
        }

        return totalStr;
    }
    const [totalString, setTotalString] = useState(calculateTotal(cart));

    const onMinus = (item: Item) => {
        let newcart = [...cart];
        let index = newcart.findIndex(elem => { return elem.item.id === item.id });
        //  если 1 и менее удаляем словсем а если больше  -  заменяем
        if (newcart[index].quantity <= 1)
            newcart.splice(index, 1);
        else
            newcart.splice(index, 1, { item: newcart[index].item, quantity: newcart[index].quantity - 1 })

        dispatch(setCart(newcart))
        dispatch(setQuantity(quantity - 1))
        setTotalString(calculateTotal(newcart));
    };


    const onPlus = (item: Item) => {
        let newcart = [...cart];
        let index = newcart.findIndex(elem => { return elem.item.id === item.id });
        if (index === (-1))
            newcart.push({ item: item, quantity: 1 })
        else
            newcart.splice(index, 1, { item: newcart[index].item, quantity: newcart[index].quantity + 1 })

        dispatch(setCart(newcart))
        dispatch(setQuantity(quantity + 1))
        setTotalString(calculateTotal(newcart));

    };

    let itemsReactNodes = cart.map(elem => (<BookCart key={elem.item.id} item={elem.item} minus={(item) => onMinus(item)} plus={(item) => onPlus(item)} quantity={elem.quantity} />));

    return (
        <Layout>

            <div className="cart-container">
                <div className="h1"> CARD</div>
                <table className="cart-table">

                    <thead className="cart-thead">
                        <tr>
                            <th className="cart-table-th">name</th>
                            <th className="cart-table-th">price</th>
                            <th className="cart-table-th">curency</th>
                            <th className="cart-table-th">quantity</th>
                            <th className="cart-table-th buttons">

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {itemsReactNodes}
                    </tbody>
                </table>
            </div>
            <div className="h1 totals"> Total: {totalString}</div>
            <div className="h1 totals"> Quantity: {quantity}</div>

        </Layout>
    );
}