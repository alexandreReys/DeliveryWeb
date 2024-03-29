import React, { useState, useEffect } from "react";
import { FaRegSquare, FaRegCheckSquare } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { DebounceInput } from "react-debounce-input";

import { history } from "routes/history";
import store from "store";
import * as actions from "store/actions";

import * as masks from "utils/masks";
import * as productService from "services/productService";

import { PromotionalPrice } from "components/modal/promotional-price";
import CurrencyInput from "react-currency-input";

import "./styles.css";


const ProductPromotion = () => {
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
        <div id="product-in-promotion" className="product-promotion-container">

            <div className="product-promotion-header">
                <div className="product-promotion-header-text">
                    Colocar / Tirar Produtos em Promoção
                </div>
            </div>

            <div className="product-promotion-buttons">
                <button className="product-promotion-button" onClick={handleExit}>
                    Sair
                </button>
            </div>

            <div className="product-promotion-warning">
                <div className="product-promotion-warning-text">
                    Os produtos ativados serão apresentados em promoção para vendas nos aplicativos Web e Mobile
                </div>
            </div>

            <div className="product-promotion-search">
                <div></div>
                <div style={{ display: "flex", flexDirection: "row" }}>

                    <div className="product-promotion-search-container">
                        
                        <DebounceInput
                            className="product-promotion-search-input"
                            value={searchText}
                            minLength={2}
                            debounceTimeout={800}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                        
                        <div
                            className="product-promotion-search-cancel"
                            onClick={() => setSearchText("")}
                        >
                            X
                        </div>
                    </div>
                    
                    <div>
                        <FaSearch className="product-promotion-search-button" size={22} />
                    </div>

                </div>
            </div>

            {!!loading && (
                <div style={{ color: "red" }}>
                    <h5>{loadingText}</h5>
                </div>
            )}

            {!loading && (
                products.map((product) => <Product product={product} handleRefresh={() => getProductsList()} />)
            )}
        </div >
    );
};

const Product = ({ product, handleRefresh }) => {
    const [showModal, setShowModal] = useState(false);
    const [inPromotion, setInPromotion] = useState(product.EmPromocaoVinho);

    const handleSubmit = async (newPromotionalPrice) => {
        setShowModal(false);

        if (newPromotionalPrice !== product.PrecoPromocionalVinho) {
            await productService.setPromotionalPrice({
                "PrecoPromocionalVinho": newPromotionalPrice,
                "IdVinho": product.IdVinho,
            });
            handleRefresh();
        };
    };

    function handleCheck() {
        setInPromotion(!inPromotion);
        productService.setPromotion({
            EmPromocaoVinho: !inPromotion ? 1 : 0,
            IdVinho: product.IdVinho,
        });
    }

    return (
        <>
            <PromotionalPrice show={showModal} handleClose={() => setShowModal(false)}>
                <PromotionalPriceContent
                    normalPrice={product.PrecoVinho}
                    promotionalPrice={product.PrecoPromocionalVinho}
                    handleSub={handleSubmit}
                />
            </PromotionalPrice>

            <div className="product-promotion-row" >

                {!!inPromotion && (
                    <FaRegCheckSquare className="product-promotion-square" style={{ color: "blue" }} onClick={handleCheck} />
                )}

                {!inPromotion && (
                    <FaRegSquare className="product-promotion-square" style={{ color: "grey" }} onClick={handleCheck} />
                )}

                <div
                    className="product-promotion-product"
                    style={{
                        color: inPromotion ? "navy" : "grey",
                        fontWeight: inPromotion ? "bold" : "normal",
                    }}
                >
                    <span style={{ cursor: "pointer" }} onClick={handleCheck}
                    >
                        {product.DescricaoVinho}, {"  "}
                    </span>

                    <span style={{
                        marginLeft: 15,
                        textDecorationStyle: 'solid',
                        textDecorationLine: 'line-through',
                    }}>
                        {masks.moneyMask(product.PrecoVinho)}
                    </span>
                    ,

                    <span
                        style={{
                            cursor: "pointer",
                            marginLeft: 15,
                            color: inPromotion ? "maroon" : "grey",
                        }}
                        onClick={() => setShowModal(true)}

                    >
                        {masks.moneyMask(product.PrecoPromocionalVinho)}
                        <FiChevronDown style={{ marginLeft: 5 }} />
                    </span>
                </div>
            </div>
        </>
    );
};

function PromotionalPriceContent({ normalPrice, promotionalPrice, handleSub }) {
    const [priceMasked, setPriceMasked] = useState(masks.moneyMask(promotionalPrice));
    const [price, setPrice] = useState(promotionalPrice);

    const handleChange = (event, maskedvalue, floatvalue) => {
        setPriceMasked(maskedvalue);
        setPrice(floatvalue);
    };

    return (
        <div style={{ textAlign: "center" }}>
            <p style={{ paddingTop: 20, color: "navy", fontWeight: "bold", fontSize: 20 }}>
                Alterar Preço :
            </p>
            <p>
                Preço Normal : {masks.moneyMask(normalPrice)}
            </p>

            <p style={{ marginBottom: 3, fontWeight: "bold" }}>
                Preço Promoção :
            </p>
            <CurrencyInput
                id="moneyChange"
                style={{ marginTop: 0, padding: 10, borderRadius: 10, width: 150 }}
                prefix="R$ "
                decimalSeparator=","
                thousandSeparator="."
                selectAllOnFocus={true}
                autoFocus="true"
                value={priceMasked}
                onChangeEvent={handleChange}
            />

            <p style={{ textAlign: "center" }}>
                <button
                    className="product-promotion-button-price"
                    onClick={() => handleSub(price)}
                >
                    OK
                </button>
            </p>

        </div>
    )
};

export default ProductPromotion;
