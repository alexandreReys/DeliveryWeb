import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { moneyMask } from "utils/masks";
import * as orderService from "services/orderService";
import * as utils from "utils";
import OrderDetails from "./components/order-details/OrderDetails";
import store from "store";
import {
  actionAdminModuleActivate,
  actionSetOrderOperation,
  actionStoreOrder,
} from "store/actions";

import "./styles.css";

const Header = () => {
  return (
    <div className="orders-list-header">
      <div>Painel de Administração - Histórico</div>
    </div>
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
const OrdersTable = ({ orders }) => {
  return (
    <>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Pedido</th>
            <th>Nome</th>
            <th>Avaliaçao</th>
            <th>Data</th>
            <th>Status</th>
            <th>Entregador</th>
            <th>Pagamento</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr
              key={order.IdOrder}
              onClick={() => {
                orderService.getOrderItems(order.IdOrder);
                orderService.getOrderHistory(order.IdOrder);
                store.dispatch(actionStoreOrder(order));
                store.dispatch(actionSetOrderOperation("details"));
              }}
            >
              <td>{order.IdOrder}</td>
              <td>{order.CustomerNameOrder}</td>
              <td>{order.EvaluationOrder}</td>
              <td>
                {utils.formattedDateTime(order.DateOrder, order.TimeOrder)}
              </td>
              <td>{order.StatusOrder}</td>
              <td>{order.DeliveryManOrder}</td>
              <td>{order.PaymantTypeOrder}</td>
              <td>{moneyMask(order.TotalOrder)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

//////////////////////////////////////////////////////////////////////////////
const OrdersList = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    store.dispatch(actionAdminModuleActivate());
    getOrdersList();
  }, []);

  async function getOrdersList() {
    async function loadOrders() {
      setLoading(true);
      const response = await orderService.getOrders();
      setLoading(false);
      setOrders(response);
    }
    loadOrders();
  }

  return (
    <div className="orders-list">
      <Header />
      {loading && <Loading />}
      {!loading && <OrdersTable orders={orders} />}
    </div>
  );
};

//////////////////////////////////////////////////////////////////////////////
const Orders = ({ operation }) => {
  return (
    <>
      {operation === "list" && (
        <div id="orders">
          <OrdersList />
        </div>
      )}

      {operation === "details" && <OrderDetails />}
    </>
  );
};

export default connect((state) => ({
  operation: state.orderState.operation,
}))(Orders);
