import React, { useState, useEffect } from "react";
import { FaRegSquare, FaRegCheckSquare } from "react-icons/fa";

import { history } from "routes/history";
import store from "store";
import * as actions from "store/actions";
import * as productService from "services/productService";

import "./styles.css";

const ProductStatus = () => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        store.dispatch(actions.actionAdminModuleActivate());
        getProductsList();
    }, []);

    const getProductsList = async () => {
        async function loadProducts() {
            setLoading(true);
            const response = await productService.getProducts();
            setLoading(false);
            setProducts(response);
        }
        loadProducts();
    };
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

            {!!loading && (
                <h4>Loading ...</h4>
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
