import React, { useState, useEffect } from "react";
import { FiRefreshCcw } from "react-icons/fi";
import ReactTooltip from "react-tooltip";
import StarRatings from 'react-star-ratings';
import { connect } from "react-redux";

import { moneyMask } from "utils/masks";
import * as orderService from "services/orderService";
import * as utils from "utils";
import * as actions from "store/actions";
import OrderDetails from "./components/order-details/OrderDetails";
import store from "store";

import "./styles.css";

//////////////////////////////////////////////////////////////////////////////
const Orders = ({ operation }) => {
    return (
        <>
            {operation === "list" && (
                <div id="orders">
                    <OrdersList />
                </div>
            )}

            {operation === "details" && (
                <div id="orderDetails">
                    <OrderDetails />
                </div>
            )}
        </>
    );
};

//////////////////////////////////////////////////////////////////////////////

const alertNewOrder = () => {
    (() => {
        let audio = new Audio("https://www.anrsistemas.com.br/dv/beep.mp3");
        audio.play();
    })();
    utils.message("Novo Pedido !!", 3);
};

const OrdersList = () => {
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const [lastOrderId, setLastOrderId] = useState(0);

    useEffect(() => {
        store.dispatch(actions.actionSetSelectedStatus("Pendente"));
        store.dispatch(actions.actionAdminModuleActivate());
        getOrdersList1();

        const timeoutID = window.setInterval(() => {
            getOrdersList1();
        }, 30000);

        return () => window.clearTimeout(timeoutID);

        async function getOrdersList1() {
            (async function loadOrders() {
                setLoading(true);
                const status = store.getState().orderState.selectedStatus;
                const response = await orderService.getOrders(status);
                setLoading(false);

                setOrders(response);

                if (response.length > 0) {
                    const atualOrderId = response[0].IdOrder;
                    if (atualOrderId > lastOrderId) {
                        if (lastOrderId > 0) alertNewOrder();
                        setLastOrderId(atualOrderId);
                    };
                };
            })()
        };
    
    }, [lastOrderId]);

    const refresh = React.useCallback( async () => {
        (async function loadOrders() {
            setLoading(true);
            const status = store.getState().orderState.selectedStatus;
            const response = await orderService.getOrders(status);
            if (response.length > 0) {
                const atualOrderId = response[0].IdOrder;
                if (atualOrderId > lastOrderId) {
                    if (lastOrderId > 0) alertNewOrder();
                    setLastOrderId(atualOrderId);
                };
            };
            setLoading(false);
            setOrders(response);
        })();
    }, [lastOrderId]);


    return (
        <div className="orders-list">
            <Header handleRefresh={refresh} />
            {loading && <Loading />}
            {!loading && <OrdersTable orders={orders} />}
        </div>
    );
};

//////////////////////////////////////////////////////////////////////////////
const Header = ({ handleRefresh }) => {
    return (
        <>
            <div className="orders-list-header">
                Painel Adminstrativo - Pedidos
            </div>
            <div className="orders-list-header">
                <div className="status-header">
                    {`Status: "${store.getState().orderState.selectedStatus}"`}
                </div>
                <div className="buttons-conteiner">

                    <div
                        className={btnClassName("Pendente", "pendente-button")}
                        data-tip="Pendentes"
                        onClick={() => {
                            store.dispatch(actions.actionSetSelectedStatus("Pendente"));
                            handleRefresh();
                        }}
                    >
                        P
                        <ReactTooltip place="bottom" effect="solid" className="tool-tip" />
                    </div>

                    <div
                        className={btnClassName("Saiu para entregar", "saiu-button")}
                        data-tip="Saiu para Entrega"
                        onClick={() => {
                            store.dispatch(
                                actions.actionSetSelectedStatus("Saiu para entregar")
                            );
                            handleRefresh();
                        }}
                    >
                        S
                        <ReactTooltip place="bottom" effect="solid" className="tool-tip" />
                    </div>

                    <div
                        className={btnClassName("Entregue", "entregue-button")}
                        data-tip="Entregues"
                        onClick={() => {
                            store.dispatch(actions.actionSetSelectedStatus("Entregue"));
                            handleRefresh();
                        }}
                    >
                        E
                        <ReactTooltip place="bottom" effect="solid" className="tool-tip" />
                    </div>

                    <div
                        className={btnClassName("Rejeitado", "rejeitado-button")}
                        data-tip="Rejeitados"
                        onClick={() => {
                            store.dispatch(actions.actionSetSelectedStatus("Rejeitado"));
                            handleRefresh();
                        }}
                    >
                        R
                        <ReactTooltip place="bottom" effect="solid" className="tool-tip" />
                    </div>

                    <div
                        className={btnClassName("Todos", "show-all-button")}
                        data-tip="Todos"
                        onClick={() => {
                            store.dispatch(actions.actionSetSelectedStatus("Todos"));
                            handleRefresh();
                        }}
                    >
                        T
                        <ReactTooltip place="bottom" effect="solid" className="tool-tip" />
                    </div>


                    <FiRefreshCcw
                        className="refresh-button"
                        data-tip="Refresh"
                        onClick={() => {
                            handleRefresh();
                        }}
                    />
                    <ReactTooltip place="bottom" effect="solid" className="tool-tip" />
                </div>
            </div>
        </>
    );
};

//////////////////////////////////////////////////////////////////////////////
const Loading = () => {
    const [loadingText] = useState(store.getState().defaultState.loadingText);
    return (
        <div id="loading">
            <h5>{loadingText}</h5>
        </div>
    );
};

//////////////////////////////////////////////////////////////////////////////

const trClassName = (statusOrder) => {
    switch (statusOrder) {
        case "Pendente":
            return "tr-black";
        case "Entregue":
            return "tr-blue";
        case "Rejeitado":
            return "tr-red";
        case "Saiu para entregar":
            return "tr-green";
        case "A caminho":
            return "tr-green";
        default:
            return "tr-black";
    }
};
const btnClassName = (statusBtn, classBtn) => {
    const defaultClassName = "status-button " + classBtn;
    const selectedStatus = store.getState().orderState.selectedStatus;

    if (statusBtn !== selectedStatus)
        return defaultClassName
    else
        return defaultClassName + " selected-button";
};

const OrdersTable = ({ orders }) => {
    return (
        <>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Pedido</th>
                        <th>Nome</th>
                        <th>Avaliação</th>
                        <th>Data</th>
                        <th>Status</th>
                        <th>Entregador</th>
                        <th>Pagamento</th>
                        <th>Total</th>
                    </tr>
                </thead>

                <tbody>
                    {orders &&
                        orders.map((order) => (
                            <tr
                                className={trClassName(order.StatusOrder)}
                                key={order.IdOrder}
                                onClick={() => {
                                    orderService.getOrderItems(order.IdOrder);
                                    orderService.getOrderHistory(order.IdOrder);
                                    store.dispatch(actions.actionStoreOrder(order));
                                    store.dispatch(actions.actionSetOrderOperation("details"));
                                }}
                            >
                                <td>
                                    {order.IdOrder}
                                </td>
                                <td>
                                    {order.CustomerNameOrder}
                                </td>
                                <td>
                                    <Stars rating={order.EvaluationOrder}/>
                                </td>
                                <td>
                                    {utils.formattedDateTime(order.DateOrder, order.TimeOrder)}
                                </td>
                                <td>
                                    {order.StatusOrder}
                                </td>
                                <td>
                                    {order.DeliveryManOrder}
                                </td>
                                <td>
                                    {order.PaymantTypeOrder}
                                </td>
                                <td>
                                    {moneyMask(order.TotalOrder)}
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </>
    );
};

function Stars( {rating} ) {
    return (
        <StarRatings
            rating={rating}
            numberOfStars={5}
            starDimension="15px"
            starSpacing="1px"
            starRatedColor={rating > 2? "blue": "red"}
            starEmptyColor="silver"
            isAggregateRating="true"
            name='rating'
        />
    );
};

export default connect((state) => ({
    operation: state.orderState.operation,
}))(Orders);
