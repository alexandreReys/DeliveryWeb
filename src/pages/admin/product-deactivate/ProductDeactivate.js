import React, { useState, useEffect } from "react";
import { FaRegSquare, FaRegCheckSquare } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { DebounceInput } from "react-debounce-input";

import { history } from "routes/history";
import store from "store";
import * as actions from "store/actions";
import * as productService from "services/productService";

import "./styles.css";

const ProductStatus = () => {
    const [loading, setLoading] = useState(true);
    const [loadingText] = useState(store.getState().defaultState.loadingText);
    const [products, setProducts] = useState([]);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        store.dispatch(actions.actionAdminModuleActivate());
        getProductsList();
    }, []);


    useEffect(() => {
        if (!loading) getProductsNome(searchText);
        // eslint-disable-next-line
    }, [searchText]);

    const getProductsList = async () => {
        async function loadProducts() {
            setLoading(true);
            const response = await productService.getProducts();
            setLoading(false);
            setProducts(response);
        }
        loadProducts();
    };

    async function getProductsNome(searchText) {
        async function loadProductsNome(searchText) {
            setLoading(true);
            const response = await productService.getProductsByName(searchText);
            setLoading(false);
            setProducts(response);
        }
        loadProductsNome(searchText);
    }

    const handleExit = () => {
        history.push("orders");
    };

    return (
        <div id="product-status" className="product-deactivate-container">

            <div className="product-deactivate-header">
                <div className="product-deactivate-header-text">
                    Desativar / Ativar produtos
                </div>
            </div>

            <div className="product-deactivate-buttons">
                <button className="product-deactivate-button" onClick={handleExit}>
                    Sair
                </button>
            </div>

            <div className="product-deactivate-warning">
                <div className="product-deactivate-warning-text">
                    Os produtos desativados não serão apresentados para vendas nos aplicativos Web e Mobile
                </div>
            </div>

            <div className="product-deactivate-search">
                <div></div>
                <div style={{ display: "flex", flexDirection: "row" }}>

                    <div className="product-deactivate-search-container">
                        
                        <DebounceInput
                            className="product-deactivate-search-input"
                            value={searchText}
                            minLength={2}
                            debounceTimeout={800}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                        
                        <div
                            className="product-deactivate-search-cancel"
                            onClick={() => setSearchText("")}
                        >
                            X
                        </div>
                    </div>
                    
                    <div>
                        <FaSearch className="product-deactivate-search-button" size={22} />
                    </div>

                </div>
            </div>

            {!!loading && (
                <div style={{ color: "red" }}>
                    <h5>{loadingText}</h5>
                </div>
            )}

            {!loading && (
                products.map((product) => <Product product={product} />)
            )}
        </div >
    );
};

const Product = ({ product }) => {
    const [active, setActive] = useState(product.StatusVinho);
    return (
        <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "spaceBetween",
                    marginLeft: 20,
                    cursor: "pointer",
                }}
                onClick={() => {
                    setActive(!active);
                    productService.deactivate({
                        StatusVinho: !active ? 1 : 0,
                        IdVinho: product.IdVinho,
                    });
                }}
            >

                {!!active && (
                    <FaRegCheckSquare
                        style={{ fontSize: "1.4rem", color: "blue", cursor: "pointer" }}
                    />
                )}

                {!active && (
                    <FaRegSquare
                        style={{ fontSize: "1.4rem", color: "grey", cursor: "pointer" }}
                    />
                )}

                <div style={{
                    marginLeft: 30,
                    width: "100%",
                    color: active ? "black" : "silver",
                    fontSize: "0.8rem",
                    fontWeight: active ? "bold" : "normal",
                }}>
                    {product.DescricaoVinho}
                </div>

            </div>
        </>
    )
}

export default ProductStatus;
