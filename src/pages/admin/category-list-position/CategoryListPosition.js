import React, { useState } from "react";
import { List, arrayMove } from 'react-movable';
// import { FaRegSquare, FaRegCheckSquare } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { DebounceInput } from "react-debounce-input";

import { history } from "routes/history";
// import store from "store";
// import * as actions from "store/actions";
// import * as productService from "services/productService";

import "./styles.css";

const CategoryListPosition = () => {
    // const [loading, setLoading] = useState(true);
    // const [loadingText] = useState(store.getState().defaultState.loadingText);
    // const [products, setProducts] = useState([]);
    const [searchText, setSearchText] = useState("");

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

            <div>
                <SuperSimple />
            </div>

            {/* {!!loading && (
                <div style={{ color: "red" }}>
                    <h5>{loadingText}</h5>
                </div>
            )}

            {!loading && (
                products.map((product) => <Product product={product} />)
            )} */}

        </div >
    );

    function SuperSimple () {
        const [items, setItems] = React.useState(['Item 1', 'Item 2', 'Item 3']);
        return (
          <List
            values={items}
            onChange={({ oldIndex, newIndex }) =>
              setItems(arrayMove(items, oldIndex, newIndex))
            }
            renderList={({ children, props }) => <ul {...props}>{children}</ul>}
            renderItem={({ value, props }) => <li {...props}>{value}</li>}
          />
        );
    };    
};

export default CategoryListPosition;
