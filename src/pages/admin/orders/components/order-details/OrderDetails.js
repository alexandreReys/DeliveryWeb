import React, { useState, useEffect, useRef } from "react";
import { history } from "routes/history";
import { connect } from "react-redux";

import * as orderService from "services/orderService";

import store from "store";
import { moneyMask } from "utils/masks";
import * as utils from "utils";
import {
  actionAdminModuleActivate,
  actionSetOrderOperation,
} from "store/actions";

import { useReactToPrint } from "react-to-print";
import DeliveryTicket from "components/print/DeliveryTicket";

import "./styles.css";

////////////////////////////////////////////////////////////////////////////////////
const OrderDetails = ({ orderItems, orderHistory }) => {
  const [order] = useState(store.getState().orderState.order);

  useEffect(() => {
    store.dispatch(actionAdminModuleActivate());
  }, []);

  const dateTime = utils.formattedDateTime2(order.DateOrder, order.TimeOrder);

  const totalProducts = moneyMask(order.TotalProductsOrder);
  const shippingAmount = moneyMask(order.ShippingAmountOrder);
  const changeOfMoney = moneyMask(order.ChangeValueOrder);
  const totalOrder = moneyMask(order.TotalOrder);

  const orderDateTime = utils.formattedDateTime3(
    order.DateOrder,
    order.TimeOrder
  );

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const handleReject = () => {
    orderService.rejectOrder(order.IdOrder);
    store.dispatch(actionSetOrderOperation("list"));
  };
  const handleCancel = () => {
    history.push("/orders");
    store.dispatch(actionSetOrderOperation("list"));

  };
  // const handleDelivering = () => {
  //   orderService.deliveringOrder(order.IdOrder);
  //   store.dispatch(actionSetOrderOperation("list"));
  // };
  // const handleDelivered = () => {
  //   orderService.deliveredOrder(order.IdOrder);
  //   store.dispatch(actionSetOrderOperation("list"));
  // };

  return (
    <div id="order-details" className="container-order-details">
      <content>
        <DeliveryTicket ref={componentRef} />

        <div className="order-date-time">
          <div>
            Pedido: {order.IdOrder} - {dateTime}
          </div>
        </div>

        <div className="order-items-group">
          <div className="order-items-header">
            <div className="c1">Produto</div>
            <div className="c3">Qtde</div>
            <div className="c5">Preço</div>
          </div>

          {orderItems.map((orderItemsProduct) => {
            var itemTotal = moneyMask(
              orderItemsProduct.priceOrderItem *
                orderItemsProduct.quantityOrderItem
            );
            return (
              <div
                className="order-items"
                key={orderItemsProduct.idProductOrderItem}
              >
                <div className="c1">{orderItemsProduct.DescricaoVinho}</div>
                <div className="c3">{orderItemsProduct.quantityOrderItem}</div>
                <div className="c5">{itemTotal}</div>
              </div>
            );
          })}
        </div>

        <div className="order-sumary">
          <div className="subtotal">
            <span className="col1">SUB-TOTAL</span>
            <span className="col2">{totalProducts}</span>
          </div>

          <span className="col1">ENVIO</span>
          <span className="col2">{shippingAmount}</span>

          <div className="total">
            <span className="col1">TOTAL</span>
            <span className="col2">{totalOrder}</span>
          </div>
          <br />

          <div className="changeValue">
            <span className="col1">TROCO</span>
            <span className="col2">{changeOfMoney}</span>
          </div>
        </div>

        <div className="status-button-group">
          <div className="status-button status-button-20" onClick={handleReject}>
            Rejeitar
          </div>
          <div className="status-button status-button-20" onClick={handleCancel}>
            Cancelar
          </div>
          <div className="status-button btn-imprimir status-button-40" onClick={handlePrint}>
            Imprimir
          </div>
          {/* <div className="status-button " onClick={handleDelivering}>
            Entregar
          </div>
          <div className="status-button " onClick={handleDelivered}>
            Entregue
          </div> */}
        </div>
      </content>

      <aside>
        <div className="order-details">
          <div className="order-details-left">

            <b>Pedido por</b>
            <br />
            {order.CustomerNameOrder}
            <br />
            Doc:
            { !order.CustomerDocumentOrder
                ? " Não informado"
                : order.CustomerDocumentOrder
            }
            <br />
            {`Tel: ${order.CustomerPhoneNumberOrder}`}
            <br />
            <br />
            <b>Dia e hora</b>
            <br />
            {orderDateTime}
            <br />
            <br />
            <b>Comentários</b>
            <br />
            {!order.CommentsOrder ? "( Não informado )" : order.CommentsOrder}

            {/* <br />
            <br />
            <b>Avaliação</b> */}
            {/* <br />
            {order.EvaluationOrder} */}

          {/* </div> */}
          {/* <div className="order-details-right"> */}

            
            <br />
            <br />
            <b>Endereço de entrega</b>
            <br />
            {`${order.CustomerStreetOrder}, ${order.CustomerNumberOrder}`}
            <br />
            {order.CustomerComplementOrder
              ? order.CustomerComplementOrder
              : "Complemento :"}
            <br />
            {`Bairro: ${order.CustomerNeighborhoodOrder}`}
            <br />
            {order.CustomerCityOrder}
            <br />
            {`UF: ${order.CustomerStateOrder}`}
            <br />
            {`CEP: ${order.CustomerPostalCodeOrder}`}
            <br />
            <br />
            <b>Forma de pagamento</b>
            <br />
            {order.PaymantTypeOrder}
            <br />
            <br />

          </div>
        </div>

        <div className="order-historic">
          <b>Histórico</b>
          <br />

          {orderHistory.map((orderHistoryItem, index) => {
            const orderHistoryDateTime = utils.formattedDateTime(
              orderHistoryItem.Date_OrderHistory,
              orderHistoryItem.Time_OrderHistory
            );
            return (
              <>
                <div
                  className="order-historic-left"
                  key={orderHistoryItem.Id_OrderHistory}
                >
                  {index + 1}.{orderHistoryItem.Status_OrderHistory}
                </div>
                <div className="order-historic-right">
                  {orderHistoryDateTime}
                </div>
                <br />
              </>
            );
          })}
        </div>
      </aside>
    </div>
  );
};

export default connect((state) => ({
  orderItems: state.orderState.orderItems,
  orderHistory: state.orderState.orderHistory,
}))(OrderDetails);
