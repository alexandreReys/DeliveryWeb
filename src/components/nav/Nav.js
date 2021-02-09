import React from "react";
import ProductSelect from "../product-select/ProductSelect";

import { Link } from "react-router-dom";
import * as loginService from "services/loginService";
import { connect } from "react-redux";
import store from "store";
import { FiShoppingCart } from "react-icons/fi";
import { history } from "routes/history";
import * as utils from "utils";

import "./styles.css";


const Nav = ({ loggedUser, quantityOfItems, deliveryAddress, adminModule }) => {
    return (
        <nav
            id="navbar"
            className="navbar navbar-expand-md navbar-dark fixed-top bg-dark"
        >
            {/* navbar-brand */}
            <Link className="navbar-brand" to="/">
                {store.getState().defaultState.appTitle}
            </Link>

            {navButtonCollapse()}

            <div className="collapse navbar-collapse" id="deliveryNavibar">
                <div className="navbar-address">
                    {!adminModule && navDeliveryAddress(deliveryAddress)}
                </div>
                <div>
                    {!adminModule && navSearchBar()}
                </div>
                <div className="ml-auto">
                    {!adminModule && navCustomerName(deliveryAddress.name, quantityOfItems)}
                    {adminModule && !!loggedUser && navLoggedUser(loggedUser)};
                </div>
            </div>
        </nav>
    );
};



function navDeliveryAddress(deliveryAddress) {
    const onEditAddress = () => {
        history.push({
            pathname: "/delivery-address",
            nextPath: "/",
        });
    };

    const _deliveryAddress = deliveryAddress.street
        ? `${deliveryAddress.street}, ${deliveryAddress.number}`
        : "Endereço de Entrega";
    const _deliveryAddressClick = deliveryAddress.street
        ? "Alterar"
        : "Clique aqui";

    return (
        <div style={{ display: "block" }}>
            <span>{_deliveryAddress}</span>
            <br />
            <span className="navbar-address-click" onClick={onEditAddress}>
                {_deliveryAddressClick}
            </span>
        </div>
    );
};

function navSearchBar() {
    return (
        <div className="search-bar">
            <ProductSelect />
        </div>
    );
};

function navCustomerName(name, qtty) {
    return (
        <div
            className="logged-user text-light"
            data-toggle="collapse"
            data-target=".navbar-collapse.show"
        >
            <span>{utils.firstWord(name)}</span>
            <FiShoppingCart
                className="btn-cart mx-3"
                onClick={() => {
                    if (qtty) {
                        history.push("/shopping-cart");
                    }
                }}
            />
            <span className="qtty-items">{qtty}</span>
        </div>
    );
};

function navLoggedUser(loggedUser) {
    return (
        <div
            className="logged-user text-light"
            data-toggle="collapse"
            data-target=".navbar-collapse.show"
        >
            <span>{loggedUser}</span>
            <button
                className="btn-logout ml-3"
                onClick={() => {
                    loginService.logout();
                }}
            >
                Logout
      </button>
        </div>
    );
};

function navButtonCollapse() {
    return (
        <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#deliveryNavibar"
            aria-controls="deliveryNavibar"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span className="navbar-toggler-icon"></span>
        </button>
    );
};




export default connect((state) => ({
    loggedUser: state.loginState.loggedUser,
    quantityOfItems: state.cartState.quantityOfItems,
    deliveryAddress: state.deliveryAddressState,
    adminModule: state.defaultState.adminModule,
}))(Nav);
