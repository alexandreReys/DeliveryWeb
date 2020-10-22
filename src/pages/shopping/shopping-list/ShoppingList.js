import React, { useState, useEffect } from "react";
import banner from "assets/img/banner1.png";
import logo from "assets/img/logo.png";
import { history } from "routes/history";
import { BsArrowRight } from "react-icons/bs";

import { moneyMask } from "utils/masks";
import * as productService from "services/productService";
import * as settingsService from "services/settingsService";

import store from "store";
import {
  actionSelectProduct,
  actionAdminModuleDeactivate,
  actionGetDeliveryAddress,
  actionSetProductCategory,
} from "store/actions";

import "./styles.css";

const ShoppingList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    store.dispatch(actionGetDeliveryAddress());
    store.dispatch(actionAdminModuleDeactivate());
    getProductList();
  }, []);

  async function getProductList() {
    const data = await productService.getProductsGroupedByCategory();
    if (data) { setProducts(data) };

    await settingsService.get();
  }

  return (
    <div id="shopping-list" className="container-shopping-list">
      <BannerTop />
      <HeaderTop />
      <MainContent products={products} />
    </div>
  );
};

const BannerTop = () => {
  return (
    <div className="img-container">
      <img className="img-fluid" src={banner} alt="" />
    </div>
  );
};

const HeaderTop = () => {
  return (
    <header>
      <h4>Faça sua escolha :</h4>
    </header>
  );
};

const MainContent = ({ products }) => {
  return (
    <main>
      {products.map((it) => (
        <div className="category-row" key={it.category}>
          <h4>{it.category}</h4>
          <ProductRow categoryProducts={it.products} />
        </div>
      ))}
    </main>
  );
};

const ProductRow = ({ categoryProducts }) => {
  return (
    <div className="products-container">
      {categoryProducts.map((product) => (
        <Product product={product} key={product.IdVinho} />
      ))}
      <SeeAll category={categoryProducts[0].TipoVinho} />
    </div>
  );
};

const Product = ({ product }) => {
  const precoVinho = moneyMask(product.PrecoVinho);

  return (
    <div
      className="product"
      key={product.IdVinho}
      onClick={() => {
        const param = {
          id: product.IdVinho,
          description: product.DescricaoVinho,
          quantity: 1,
          price: product.PrecoVinho,
          image: product.Imagem1Vinho,
        };
        store.dispatch(actionSelectProduct(param));
        history.push("/selected-product");
      }}
    >
      <div className="header">
        {!!product.Imagem1Vinho && (
          <img src={product.Imagem1Vinho} alt="loading ..." />
        )}
        {!product.Imagem1Vinho && <img src={logo} alt="loading ..." />}
      </div>
      <hr />
      <div className="title">{product.DescricaoVinho}</div>
      <content>
        <div className="price">{precoVinho}</div>
      </content>
    </div>
  );
};

const SeeAll = ({ category }) => {
  return (
    <div className="arrow-all">
      <div className="circle">
        <div
          className="arrow"
          onClick={() => {
            store.dispatch(actionSetProductCategory(category));
            history.push("/shopping-list-categ");
          }}
        >
          <BsArrowRight />
        </div>
      </div>
      <div>
        <div className="arrow-text">Ver todos</div>
      </div>
    </div>
  );
};

export default ShoppingList;
