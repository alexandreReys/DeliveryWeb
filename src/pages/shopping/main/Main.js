import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import MainItem from "pages/shopping/main/components/mainItem/MainItem";
import { actionVinhoList } from "store/actions";
import { DebounceInput } from "react-debounce-input";
import { getProducts } from "services/productService";
import store from "store";
import {
  actionAdminModuleDeactivate,
  actionGetDeliveryAddress,
} from "store/actions";

import "./styles.css";

const App = ({ operacaoVinho }) => {
  const [vinhos, setVinhos] = useState(store.getState().vinhoState.products);
  const [loading, setLoading] = useState(true);
  const [loadingText] = useState(store.getState().defaultState.loadingText);
  const [searchText, setSearchText] = useState("");
  const [banner] = useState(store.getState().defaultState.webBannerSettings);

  useEffect(() => {
    store.dispatch(actionGetDeliveryAddress());
    store.dispatch(actionAdminModuleDeactivate());
    store.dispatch(actionVinhoList());
    getProductList();
  }, []);

  useEffect(() => {
    if (!loading) getProductsByDescription(searchText);
    // eslint-disable-next-line
  }, [searchText]);

  async function getProductList() {
    async function loadProducts() {
      setSearchText("");
      setLoading(true);
      let products = store.getState().vinhoState.products;
      if (!products.length) {
        products = await getProducts();
      }
      setLoading(false);
      setVinhos(products);
    }
    loadProducts();
  }

  async function getProductsByDescription(searchText) {
    async function loadProductsByDescription(searchText) {
      setLoading(true);
      const response = await store
        .getState()
        .vinhoState.products.filter(
          (item) =>
            item.DescricaoVinho.toLowerCase().indexOf(
              searchText.toLowerCase()
            ) >= 0
        );
      setLoading(false);
      setVinhos(response);
    }
    loadProductsByDescription(searchText);
  }

  return (
    <div id="main">
      {(operacaoVinho === "list" || operacaoVinho === "delete") && (
        <>
          <div className="img-container">
            <img className="img-fluid" src={banner} alt="" />
          </div>

          <div className="main-list">
            <div className="main-list-header">
              <div>Faça sua escolha:</div>

              <div className="search-input">
                <DebounceInput
                  className="input"
                  value={searchText}
                  placeholder="Digite sua pesquisa"
                  minLength={1}
                  debounceTimeout={800}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <div
                  className="search-cancel"
                  onClick={() => setSearchText("")}
                >
                  X
                </div>
              </div>
            </div>

            {loading && (
              <div id="loading">
                <h5>{loadingText}</h5>
              </div>
            )}

            {/* MainItem  ====================== */}
            {!loading && (
              <>
                <ul>
                  {vinhos.map((vinho) => (
                    <MainItem key={vinho.IdVinho} vinho={vinho} />
                  ))}
                </ul>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default connect((state) => ({
  operacaoVinho: state.vinhoState.operacaoVinho,
}))(App);
