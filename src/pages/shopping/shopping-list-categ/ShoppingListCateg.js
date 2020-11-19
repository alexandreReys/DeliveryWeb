import React, { useState, useEffect } from "react";
// import banner from "assets/img/banner1.png";
import noImage from "assets/img/no-image.png";
import { history } from "routes/history";

import { moneyMask } from "utils/masks";
import store from "store";
import * as productService from "services/productService";
import * as actions from "store/actions";
import * as utils from "utils";

import "./styles.css";

const ShoppingListCateg = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    store.dispatch(actions.actionAdminModuleDeactivate());
    getProductList();
  }, []);

  async function getProductList() {
    const data = await productService.getActiveProductsByCategory(
      store.getState().vinhoState.selectedCategory
    );
    setProducts(data);
  }

  return (
    <div id="shopping-list-categ" className="container-shopping-list-categ">
      <BannerTop />
      <HeaderTop />
      <MainContent products={products} />
    </div>
  );
};

const BannerTop = () => {
  const [banner] = useState(store.getState().defaultState.webBannerSettings);

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
      <h3>{store.getState().vinhoState.selectedCategory}</h3>
    </header>
  );
};

const MainContent = ({ products }) => {
  return (
    <main>
      <div className="products-container">
        {products.map((product) => (
          <div key={product.IdVinho}>
            <Product product={product} />
          </div>
        ))}
      </div>
    </main>
  );
};

const Product = ({ product }) => {
  product = utils.adjustPromotionalPrice(product);

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
        store.dispatch(actions.actionSelectProduct(param));
        history.push("/selected-product");
      }}
    >
      <div className="header">
        {!!product.Imagem1Vinho && (
          <img src={product.Imagem1Vinho} alt="loading ..." />
        )}
        {!product.Imagem1Vinho && <img src={noImage} alt="loading ..." />}
      </div>
      <hr />
      <div className="title">{product.DescricaoVinho}</div>
      <content>
        <div className="price">{precoVinho}</div>
      </content>
    </div>
  );
};

export default ShoppingListCateg;
