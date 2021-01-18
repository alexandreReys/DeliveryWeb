import React, { useState, useEffect, useMemo } from "react";
import { BsArrowLeft } from "react-icons/bs";
import store from "store";
import { history } from "routes/history";
import { moneyMask } from "utils/masks";
import * as orderServices from "../../../services/orderService";
import StarRatings from 'react-star-ratings';
import "./styles.css";

const OrderConfirmation = () => {
    const [orderId, setOrderId] = useState(0);
    const [customerNameOrder, setCustomerNameOrder] = useState("");
    const [paymantTypeOrder, setPaymantTypeOrder] = useState("");
    const [quantityItemsOrder, setQuantityItemsOrder] = useState(0);
    const [totalProductsOrder, setTotalProductsOrder] = useState(0);
    const [shippingAmountOrder, setShippingAmountOrder] = useState(0);
    const [totalOrder, setTotalOrder] = useState(0);
    const [rating, setRating] = useState(0);

    const deliveryAddress = useMemo(() => {
        return store.getState().deliveryAddressState
    }, []);

    const deliveryAddressCompact = useMemo( () => {
        return orderServices.getAddress(store.getState().deliveryAddressState);
    }, []);

    useEffect(() => {
        setOrderId(store.getState().orderState.orderId);
        setCustomerNameOrder(store.getState().orderState.customerNameOrder);
        setPaymantTypeOrder(store.getState().orderState.paymantTypeOrder);
        setQuantityItemsOrder(store.getState().orderState.quantityItemsOrder);
        setTotalProductsOrder(store.getState().orderState.totalProductsOrder);
        setShippingAmountOrder(store.getState().orderState.shippingAmountOrder);
        setTotalOrder(store.getState().orderState.totalOrder);
    }, []);

    return (
        <div id="orderConfirmation" className="order-confirmation-container">
            <div className="header-container">
                <BsArrowLeft 
                    className="back-button" 
                    onClick={() => {
                        orderServices.updateRatingOrder(orderId, rating);
                        history.push("/");
                    }}
                />
                <div className="header-title-box">
                    <div className="header-title">
                        Pedido Confirmado !!!
                    </div>
                </div>
            </div>

            <main className="boxes-container">

                <section className="info box">
                    <div className="box-title">
                        <span>Informações do Pedido</span>
                    </div>

                    <div className="box-content">
                        <div style={{ marginBottom: 5 }}>
                            <span>
                                <b>Pedido :</b> {orderId}
                            </span>

                            <span style={{ marginLeft: 40 }}>
                                <b>Pagamento :</b> {paymantTypeOrder}
                            </span>
                        </div>

                        <div style={{ marginBottom: 5 }}>
                            <b>Itens :</b> {quantityItemsOrder}
                        </div>

                        <div style={{ marginBottom: 5 }}>
                            <b>Total dos Produtos :</b> {moneyMask(totalProductsOrder)}
                        </div>

                        <div style={{ marginBottom: 5 }}>
                            <b>Frete :</b> {moneyMask(shippingAmountOrder)}
                        </div>

                        <div>
                            <b> Total a Pagar : {moneyMask(totalOrder)} </b>
                        </div>
                    </div>
                </section>

                <section className="address box">
                    <div className="box-title">
                        <span>Entrega</span>
                    </div>
                    <div className="box-content">
                        <div style={{ marginBottom: 5 }}>
                            <b>Nome :</b> {customerNameOrder}
                        </div>

                        <div style={{ marginBottom: 5 }}>
                            {deliveryAddressCompact}
                        </div>

                        <div>
                            <b>Ponto de referencia :</b> {deliveryAddress.info}
                        </div>
                    </div>
                </section>

                <section className="rating box">
                    <div className="box-title">
                        <span>Avaliação</span>
                    </div>
                    <div className="box-content">
                        <div>
                            Mostre o quanto foi agradavel sua compra !!
                        </div>

                        <div style={{ marginTop: 25 }}>
                            <Stars/>
                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
    
    function Stars() {
        function changeRating(newRating, name) {
            setRating(newRating);
        };
    
        return (
            <StarRatings
                rating={rating}
                changeRating={changeRating}
                numberOfStars={5}
                starRatedColor="blue"
                starEmptyColor="grey"
                starHoverColor="blue"
                isAggregateRating="true"
                name='rating'
            />
        );
    };
};


export default OrderConfirmation;
