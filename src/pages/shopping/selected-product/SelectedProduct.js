import React, { useState } from "react";
import logo from "assets/img/logo.png";
import { BsArrowLeft } from "react-icons/bs";
import store from "store";
import { actionAddToCart } from "store/actions";
import { history } from "routes/history";
import { moneyMask } from "utils/masks";

import "./styles.css";

const SelectedProduct = () => {
  const [quantity, setQuantity] = useState(1);
  const selectedProduct = store.getState().cartState.item;

  if (!selectedProduct.price) {
    history.push("/");
    return false;
  }

  const selectedProductPrice = moneyMask(selectedProduct.price);

  const onClickQttyMinus = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const onClickQttyPlus = () => {
    setQuantity(quantity + 1);
  };

  const clickOnButtonAdd = () => {
    const itemToAdd = {
      id: selectedProduct.id,
      description: selectedProduct.description,
      quantity,
      price: selectedProduct.price,
      image: selectedProduct.image,
    };
    store.dispatch(actionAddToCart(itemToAdd));
    history.push("/");
  };

  return (
    <div id="selectedProduct" className="container-selected-product">
      <aside>
        <BsArrowLeft
          className="arrow-back-abs"
          onClick={() => {
            history.goBack();
          }}
        />
        {!!selectedProduct.image && <img src={selectedProduct.image} alt="" />}
        {!selectedProduct.image && <img src={logo} alt="loading ..." />}
      </aside>

      <content>
        <h1 className="product-name">{selectedProduct.description}</h1>
        <h4 className="product-price">{selectedProductPrice}</h4>
        <div className="qtty-box">
          <div className="qtty-minus" onClick={onClickQttyMinus}>
            -
          </div>
          <div className="qtty">{quantity}</div>
          <div className="qtty-plus" onClick={onClickQttyPlus}>
            +
          </div>
        </div>
        <div>
          <label className="button-add" onClick={clickOnButtonAdd}>
            Adicionar
          </label>
        </div>
      </content>
    </div>
  );
};

export default SelectedProduct;
