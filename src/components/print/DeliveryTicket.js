import React from "react";
import store from "store";
import * as utils from "utils";
import { moneyMask } from "utils/masks";

import "./styles.css";

class DeliveryTicket extends React.Component {
    render() {
        const deliveryDate = utils.formattedDate(store.getState().orderState.order.DateOrder);
        const orderItems = store.getState().orderState.orderItems;
        const totalProductsOrder = moneyMask(store.getState().orderState.order.TotalProductsOrder);
        const shippingAmountOrder = moneyMask(store.getState().orderState.order.ShippingAmountOrder);
        const totalOrder = moneyMask(store.getState().orderState.order.TotalOrder);

        const changeValueOrder = moneyMask(store.getState().orderState.order.ChangeValueOrder);
        const totalOrder2 = moneyMask(store.getState().orderState.order.TotalOrder / 2);
        const totalOrder3 = moneyMask(store.getState().orderState.order.TotalOrder / 3);
        const totalOrder4 = moneyMask(store.getState().orderState.order.TotalOrder / 4);
        const totalOrder5 = moneyMask(store.getState().orderState.order.TotalOrder / 5);

        return (
            <section id="DeliveryTicket" className="print-content">
                <div className="ticket-content">
                    <div className="ticket-header">
                        <h3>{store.getState().defaultState.appTitle}</h3>
                        <h4>
                            <b>PEDIDO: {store.getState().orderState.order.IdOrder}</b>
                        </h4>
                        <h5>ENTREGA : Delivery para {deliveryDate}</h5>
                        <h5>
                            PAGAMENTO: {store.getState().orderState.order.PaymantTypeOrder}
                        </h5>
                    </div>
                    <hr />
                    <div className="delivery-info">
                        <h4>
                            Bairro:{" "}
                            {store.getState().orderState.order.CustomerNeighborhoodOrder}
                        </h4>
                        <p>
                            ENDEREÇO: {store.getState().orderState.order.CustomerAddressOrder}
                        </p>
                        <h5>
                            Cliente: {store.getState().orderState.order.CustomerNameOrder}
                        </h5>
                    </div>
                    <hr />
                    {orderItems.map((item) => {
                        const total = moneyMask( item.priceOrderItem );
                        return (
                            <div className="table-item" key={item.idProductOrderItem}>
                                <span 
                                    className="column-left"
                                    style={{ width: "10%" }}
                                >
                                    {item.quantityOrderItem}
                                </span>

                                <span
                                    className="column-left product-description"
                                    style={{ width: "65%" }}
                                >
                                    {item.DescricaoVinho}
                                </span>

                                <span
                                    className="column-right"
                                    style={{ width: "25%" }}
                                >
                                    {total}
                                </span>
                            </div>
                        );
                    })}
                    <hr />
                    <div className="total">
                        <span className="column-left">TOTAL DOS PRODUTOS</span>
                        <span className="column-right">{totalProductsOrder}</span>
                    </div>
                    <div className="total">
                        <span className="column-left">FRETE</span>
                        <span className="column-right">{shippingAmountOrder}</span>
                    </div>
                    <div
                        className="total"
                        style={{ fontWeight: "bold", fontSize: "1.2rem" }}
                    >
                        <span className="column-left">TOTAL A PAGAR</span>
                        <span className="column-right">{totalOrder}</span>
                    </div>
                    <div className="total">
                        <span className="column-left">TROCO</span>
                        <span className="column-right">{changeValueOrder}</span>
                    </div>

                    <hr />

                    <div className="qtty-persons">
                        <span className="column-left">2 pessoas: {totalOrder2}</span>
                        <span className="column-left">4 pessoas: {totalOrder4}</span>
                    </div>
                    <div className="qtty-persons">
                        <span className="column-left">3 pessoas: {totalOrder3}</span>
                        <span className="column-left">5 pessoas: {totalOrder5}</span>
                    </div>

                    <hr />

                    <div className="ticket-footer">
                        <h3>{store.getState().defaultState.appTitle}</h3>
                        <h4>
                            <b>PEDIDO: {store.getState().orderState.order.IdOrder}</b>
                        </h4>
                        <h5>
                            {utils.formatttedToday()} {utils.formatttedCurrentTime()}
                        </h5>
                    </div>

                    <hr />
                </div>
            </section>
        );
    }
}

export default DeliveryTicket;
