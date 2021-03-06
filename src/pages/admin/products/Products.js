import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { history } from "routes/history";
import { FaPlus, FaSearch } from "react-icons/fa";
import { DebounceInput } from "react-debounce-input";

import ProductForm from "./components/product-form/ProductForm";
import ProductListItem from "./components/product-list-item/ProductListItem";
import store from "store";

import {
    actionAdminModuleActivate,
    actionVinhoAdd,
    actionVinhoList,
} from "store/actions";

import {
    getProducts,
    getProductsByName,
    postVinho,
    putVinho,
    deleteVinho,
} from "services/productService";

import * as categoryService from "services/categoryService";


import "./styles.css";

const Products = ({ operacaoVinho }) => {
    const [loading, setLoading] = useState(true);
    const [loadingText] = useState(store.getState().defaultState.loadingText);
    
    const [products, setProducts] = useState([]);

    const [searching, setSearching] = useState(false);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        store.dispatch(actionAdminModuleActivate());
        store.dispatch(actionVinhoList());
        getProductsList();
    }, []);
    
    useEffect(() => {
        if (!loading) getProductsNome(searchText);
        // eslint-disable-next-line
    }, [searchText]);
    
    const handlerListAddButton = () => {
        store.dispatch(actionVinhoAdd());
    };
    
    async function getProductsList() {
        async function loadProducts() {
            setSearchText("");
            setLoading(true);
            await categoryService.get();
            const response = await getProducts();
            setLoading(false);
            setProducts(response);
        }
        loadProducts();
    }

    async function getProductsNome(searchText) {
        async function loadProductsNome(searchText) {
            setLoading(true);
            const response = await getProductsByName(searchText);
            setLoading(false);
            setProducts(response);
        }
        loadProductsNome(searchText);
    }

    async function handleFormSaveButton(formData) {
        if (operacaoVinho === "add") {
            const VinhoArray = products.filter((vinho) => {
                return vinho.DescricaoVinho === formData.DescricaoVinho;
            });

            if (VinhoArray === null || VinhoArray.length === 0) {
                // Inclui no BD
                const response = await postVinho(formData);

                store.dispatch(actionVinhoList());

                if (response.affectedRows > 0) {
                    getProductsList();
                }
            }
        }

        if (operacaoVinho === "edit") {
            // Altera no BD
            const response = await putVinho(formData);

            store.dispatch(actionVinhoList());

            if (!response) setProducts([]);
            else if (response.affectedRows > 0) {
                await getProductsList();
            }
        }
    }

    const handlerDeleteButton = async (itemID) => {
        const r = window.confirm("Confirma Exclusão ??");
        if (r === true) {
            // Deletar no BD
            const response = await deleteVinho(itemID);
            if (response.affectedRows > 0) {
                await getProductsList();
            }
        }
    };
    
    const handleExit = () => {
        history.push("orders");
    };
    
    return (
        <div id="vinhos">
            {(operacaoVinho === "list" || operacaoVinho === "delete") && (
                <div className="vinho-list">

                    <div className="header">
                        <div className="header-text">
                            Produtos
                        </div>
                    </div>

                    <div className="buttons">
                        <button className="button" onClick={() => handlerListAddButton()}>
                            Incluir
                        </button>

                        <button className="button" onClick={() => handleExit()}>
                            Sair
                        </button>
                    </div>

                    <div className="vinho-list-header">
                        <div></div>
                        <div style={{ display: "flex", flexDirection: "row" }}>

                            {searching && (
                                <div className="product-search-container">
                                    
                                    <DebounceInput
                                        className="product-search-input"
                                        value={searchText}
                                        minLength={2}
                                        debounceTimeout={800}
                                        onChange={(e) => setSearchText(e.target.value)}
                                    />
                                    
                                    <div
                                        className="product-search-cancel"
                                        onClick={() => setSearchText("")}
                                    >
                                        X
                                    </div>
                                </div>
                            )}
                            
                            <div
                                className="search-bar"
                                onClick={() => {
                                    setSearching(!searching);
                                    if (searching === true) setSearchText("");
                                }}
                            >
                                <FaSearch className="button-search" size={22} />
                            </div>

                        </div>
                    </div>

                    {/* loading text */}
                    {loading && (
                        <div id="loading">
                            <h5>{loadingText}</h5>
                        </div>
                    )}

                    {/* list and add button */}
                    {!loading && (
                        <>
                            <ul className="mt-3">
                                {products.map((product) => (
                                    <ProductListItem
                                        key={product.IdVinho}
                                        vinho={product}
                                        onDelete={handlerDeleteButton}
                                    />
                                ))}
                            </ul>
                            <div className="btnMais">
                                <div className="col-3">
                                    <button
                                        className="btn btnCircular"
                                        onClick={() => {
                                            handlerListAddButton();
                                        }}
                                    >
                                        <i>
                                            <FaPlus />
                                        </i>
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}

            {(operacaoVinho === "add" || operacaoVinho === "edit") && (
                <div className="vinho-form">
                    <ProductForm propSubmit={handleFormSaveButton} />
                </div>
            )}
        </div>
    );
};

export default connect((state) => ({
    operacaoVinho: state.vinhoState.operacaoVinho,
}))(Products);
