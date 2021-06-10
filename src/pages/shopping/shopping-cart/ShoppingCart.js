import React from "react";
import { connect } from "react-redux";
import { moneyMask } from "utils/masks";
import { BsTrash } from "react-icons/bs";
import { FaMinusCircle } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import { history } from "routes/history";
import store from "store";
import {
  actionAddToCart,
  actionSubFromCart,
  actionRemoveFromCart,
} from "store/actions";

import "./styles.css";

const ShoppingCart = ({
  addedItems, quantityOfItems, subtotal, shipping, total,
}) => {
  const cartSubtotal = moneyMask(subtotal);
  const cartShipping = moneyMask(shipping);
  const cartTotal = moneyMask(total);

  return (
    <div id="cart" className="container-shopping-cart">
      <content>
        <h1>Carrinho de Compras</h1>

        <div className="selected-Product-header ">
          <div className="c1">Produto</div>
          <div className="c2"> </div>
          <div className="t3">Qtde</div>
          <div className="c4"> </div>
          <div className="c5">Total</div>
          <div className="c6"> </div>
        </div>

        {addedItems.map((item) => {
          var itemTotal = moneyMask(item.price * item.quantity);

          return (
            <div className="selected-Product" key={item.id}>
              <div className="c1">{item.description}</div>

              <FaMinusCircle
                className="c4"
                onClick={() => {
                  const itemToSub = {
                    id: item.id,
                    quantity: 1,
                    price: item.price,
                    productPrice: item.productPrice,
                    quantityProductVariation: item.quantityProductVariation,
                    priceProductVariation: item.priceProductVariation,
                    shippingTax: store.getState().defaultState.shippingTaxSettings,
                  };
                  store.dispatch(actionSubFromCart(itemToSub));
                }}
              />

              <div className="c3">{item.quantity}</div>

              <FaPlusCircle
                className="c2"
                onClick={() => {
                  const itemToAdd = {
                    id: item.id,
                    description: item.description,
                    quantity: 1,
                    price: item.price,
                    productPrice: item.productPrice,
                    image: null,
                    quantityProductVariation: item.quantityProductVariation,
                    priceProductVariation: item.priceProductVariation,
                    shippingTax: store.getState().defaultState.shippingTaxSettings,
                  };
                  store.dispatch(actionAddToCart(itemToAdd));
                }}
              />

              <div className="c5">{itemTotal}</div>
              <BsTrash
                className="c6"
                onClick={() => {
                  const itemToRemove = { id: item.id };
                  store.dispatch(actionRemoveFromCart(itemToRemove));
                }}
              />
            </div>
          );
        })}
      </content>

      <aside>
        <h1 className="resumo-title">Resumo</h1>
        <div className="resumo">
          <p>
            <span className="col1">{quantityOfItems} produto(s)</span>
            <span className="col2">{cartSubtotal}</span>
          </p>
          <p>
            <span className="col1">Frete</span>
            <span className="col2">{cartShipping}</span>
          </p>
        </div>
        <hr />

        <div className="resumo-total">
          <p>
            <strong>
              <span className="col1">Total</span>
              <span className="col2">{cartTotal}</span>
            </strong>
          </p>
        </div>
        <hr />

        <label
          className="bt-continue"
          onClick={() => {
            if (!store.getState().deliveryAddressState.street) {
              history.push({
                pathname: "/delivery-address",
                nextPath: "/purchase-confirmation",
              });
            } else {
              history.push("/purchase-confirmation");
            }
            return;
          }}
        >
          Continuar
        </label>

        <label
          className="bt-backToShopping"
          onClick={() => {
            history.push("/");
            return false;
          }}
        >
          Continuar Comprando
        </label>
      </aside>
    </div>
  );
};

export default connect((state) => ({
  addedItems: state.cartState.addedItems,
  quantityOfItems: state.cartState.quantityOfItems,
  subtotal: state.cartState.subtotal,
  shipping: state.cartState.shipping,
  total: state.cartState.total,
}))(ShoppingCart);
