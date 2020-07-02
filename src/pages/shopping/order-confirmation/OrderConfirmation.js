import React, { useState, useEffect } from "react";
import store from "store";
import { history } from "routes/history";
import { moneyMask } from "utils/masks";
import "./styles.css";

const OrderConfirmation = () => {
  const [orderId, setOrderId] = useState(0);
  const [customerNameOrder, setCustomerNameOrder] = useState("");
  const [paymantTypeOrder, setPaymantTypeOrder] = useState("");
  const [quantityItemsOrder, setQuantityItemsOrder] = useState(0);
  const [totalProductsOrder, setTotalProductsOrder] = useState(0);
  const [shippingAmountOrder, setShippingAmountOrder] = useState(0);
  const [totalOrder, setTotalOrder] = useState(0);

  const deliveryAddress = store.getState().deliveryAddressState;

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
      <header>
        <div className="title1">
          <span>Pedido Confirmado !!!</span>
        </div>
      </header>

      <aside>
        <div className="title2">
          <span>Endereço de Entrega</span>
        </div>
        <div className="delivery-address">
          <span>Tipo de Entrega : {deliveryAddress.addressType}</span>
          <br />
          <span>
            Endereço : {deliveryAddress.street}, {deliveryAddress.number}
          </span>
          <br />
          <span>Complemento : {deliveryAddress.complement}</span>
          <br />
          <span>Bairro : {deliveryAddress.neighborhood}</span>
          <br />
          <span>Cidade : {deliveryAddress.city}</span>
          <br />
          <span>Estado : {deliveryAddress.state}</span>
          <br />
          <span>Ponto de referencia : {deliveryAddress.info}</span>
          <br />
        </div>
      </aside>

      <content>
        <div className="title2">
          <span>Informações do Pedido</span>
        </div>
        <div className="orderInfo">
          <span>Numero do Pedido : {orderId}</span>
          <br />
          <br />
          <span>Nome : {customerNameOrder}</span>
          <br />
          <br />
          <span>Tipo de Pagamento : {paymantTypeOrder}</span>
          <br />
          <br />
          <span>Quantidade de Itens Pedidos : {quantityItemsOrder}</span>
          <br />
          <span>Total dos Produtos : {moneyMask(totalProductsOrder)}</span>
          <br />
          <span>Frete : {moneyMask(shippingAmountOrder)}</span>
          <br />
          <span>
            <b> Total do Pedido : {moneyMask(totalOrder)} </b>
          </span>
          <br />
        </div>
      </content>

      <footer>
        <div className="button-container">
          <span
            className="button-sair"
            onClick={() => {
              history.push("/");
            }}
          >
            Sair
          </span>
        </div>
      </footer>
    </div>
  );
};

export default OrderConfirmation;
