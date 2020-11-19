import React, { useState } from "react";
import noImage from "assets/img/no-image.png";
import { BsArrowLeft } from "react-icons/bs";
import store from "store";
import { actionAddToCart } from "store/actions";
import { history } from "routes/history";
import { moneyMask } from "utils/masks";

import "./styles.css";

const SelectedProduct = () => {
  const selectedProduct = store.getState().cartState.item;

  if (!selectedProduct.price) {
    history.push("/");
    return false;
  }

  return (
    <div id="selectedProduct" className="container-selected-product">
      <HeaderTop />
      <div className="container-product">
        <ProductImage selectedProduct={selectedProduct} />
        <ProductContent selectedProduct={selectedProduct} />
      </div>
    </div>
  );
};

const HeaderTop = () => {
  return (
    <header>
      <BsArrowLeft
        className="arrow-back-abs"
        onClick={() => {
          history.goBack();
        }}
      />
    </header>
  );
};

const ProductImage = ({ selectedProduct }) => {
  return (
    <aside>
      {!!selectedProduct.image && <img src={selectedProduct.image} alt="" />}
      {!selectedProduct.image && <img src={noImage} alt="loading ..." />}
    </aside>
  );
};

const ProductContent = ({ selectedProduct }) => {
  const [quantity, setQuantity] = useState(1);

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
      shippingTax: store.getState().defaultState.shippingTaxSettings,
    };
    store.dispatch(actionAddToCart(itemToAdd));
    history.push("/");
  };

  return (
    <content>
      <h1 className="product-name">{selectedProduct.description}</h1>
      <h4 className="product-price">{selectedProductPrice}</h4>
      <div className="qtty-box">
        <div className="btn qtty-minus" onClick={onClickQttyMinus}>
          -
        </div>
        <div className="qtty">{quantity}</div>
        <div className="btn qtty-plus" onClick={onClickQttyPlus}>
          +
        </div>
      </div>
      <div>
        <label className="button-add" onClick={clickOnButtonAdd}>
          Adicionar
        </label>
      </div>
    </content>
  );
};

export default SelectedProduct;
