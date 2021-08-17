import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import * as orderService from "services/orderService";
import store from "store";
import { moneyMask } from "utils/masks";
import * as utils from "utils";
import * as actions from "store/actions";

import { useReactToPrint } from "react-to-print";
import DeliveryTicket from "components/print/DeliveryTicket";

import "./styles.css";

////////////////////////////////////////////////////////////////////////////////////
const OrderDetails = ({ orderItems, orderHistory }) => {
    const [order] = useState(store.getState().orderState.order);

    useEffect(() => {
        store.dispatch(actions.actionAdminModuleActivate());
    }, []);

    const dateTime = utils.formattedDateTime2(order.DateOrder, order.TimeOrder);

    const totalProducts = moneyMask(order.TotalProductsOrder);
    const shippingAmount = moneyMask(order.ShippingAmountOrder);
    const changeOfMoney = moneyMask(order.ChangeValueOrder);
    const totalOrder = moneyMask(order.TotalOrder);

    // const orderDateTime = utils.formattedDateTime3(
    //     order.DateOrder,
    //     order.TimeOrder
    // );

    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    
    const handleAccept = () => {
        if (order.StatusOrder === 'Novo') {
            orderService.acceptOrder(order.IdOrder);
            store.dispatch(actions.actionSetOrderOperation("list"));
        };
    };

    const handleReject = () => {
        if (order.StatusOrder === 'Novo') {
            orderService.rejectOrder(order.IdOrder);
            store.dispatch(actions.actionSetOrderOperation("list"));
        };
    };

    const btnAcceptActive = () => {
       return order.StatusOrder === 'Novo' ? 'btn-aceitar-active' : 'btn-aceitar-disabled';
    };

    const btnRejectActive = () => {
       return order.StatusOrder === 'Novo' ? 'btn-rejeitar-active' : 'btn-rejeitar-disabled';
    };

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
                    <div 
                        className={ `btn status-button btn-aceitar ${btnAcceptActive()}` }
                        onClick={handleAccept}
                    >
                        Aceitar
                    </div>

                    <div
                        className={ `btn status-button btn-rejeitar ${btnRejectActive()}` }
                        onClick={handleReject}
                    >
                        Rejeitar
                    </div>
                    
                    <div
                        className="status-button btn-imprimir"
                        onClick={handlePrint}
                    >
                        Imprimir
                    </div>
                </div>
            </content>

            <aside>
                <div className="order-details">
                    <div className="order-details-left">

                        <b>Pedido por</b>
                        <br />
                        {order.CustomerNameOrder}
                        <br />
                        {!!order.CustomerDocumentOrder && order.CustomerDocumentOrder.toString() !== ''
                            ? 'Doc.: ' + order.CustomerDocumentOrder
                            : "Doc: Não informado"
                        }
                        <br />
                        {`Tel: ${order.CustomerPhoneNumberOrder}`}
                        <br />
                        <br />

                    </div>
                </div>
                    
                <div className="order-details">
                    <div className="order-details-left">

                        <b>Endereço de entrega</b>
                        <div>
                            {`${order.CustomerStreetOrder}, ${order.CustomerNumberOrder}`}
                        </div>
                        <div>
                            {!!order.CustomerComplementOrder && order.CustomerComplementOrder.toString() === ''
                                ? "Complemento :"
                                : `Complemento : ${order.CustomerComplementOrder}` }
                        </div>
                        <div>
                            {`Bairro: ${order.CustomerNeighborhoodOrder}`}
                        </div>
                        <div>
                            {order.CustomerCityOrder}
                        </div>
                        <div>
                            {`UF: ${order.CustomerStateOrder}`}
                        </div>
                        <div style={{marginBottom: '10px'}}>
                            {`CEP: ${order.CustomerPostalCodeOrder}`}
                        </div>
    
    
                        <b>Forma de pagamento</b>
                        <div style={{marginBottom: '10px'}}>
                            {order.PaymantTypeOrder}
                        </div>


                        <b>Comentários</b> <br/>
                        <div style={{marginBottom: '10px'}}>
                            {!order.CommentsOrder ? "( Não informado )" : order.CommentsOrder}
                        </div>

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
