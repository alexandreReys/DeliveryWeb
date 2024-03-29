import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { history } from "routes/history";
import { FaPlus, FaSearch } from "react-icons/fa";
import { DebounceInput } from "react-debounce-input";

import DeliverymanForm from "./components/deliverymanForm/DeliverymanForm";
import DeliverymanItem from "./components/deliverymanItem/DeliverymanItem";
import store from "store";

import {
    actionAdminModuleActivate,
    actionDeliverymanAdd,
    actionDeliverymanList,
} from "store/actions";

// import { get, getByName, post, put, deleteById } from "services/deliverymanService";
import * as deliverymanService from "services/deliverymanService";

import "./styles.css";

const Deliveryman = ({ operacaoDeliveryman }) => {
    const [loading, setLoading] = useState(true);
    const [loadingText] = useState(store.getState().defaultState.loadingText);
    const [deliverymen, setDeliverymen] = useState([]);
    const [searching, setSearching] = useState(false);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        store.dispatch(actionAdminModuleActivate());
        store.dispatch(actionDeliverymanList());
        getList();
    }, []);

    useEffect(() => {
        if (!loading) getByName(searchText);
        // eslint-disable-next-line
    }, [searchText]);

    const handlerListAddButton = () => {
        store.dispatch(actionDeliverymanAdd());
    };

    async function getList() {
        async function loadDeliverymen() {
            setSearchText("");
            setLoading(true);
            const response = await deliverymanService.get();
            setLoading(false);
            setDeliverymen(response);
        }
        loadDeliverymen();
    }

    async function getByName(searchText) {
        async function loadByName(searchText) {
            setLoading(true);
            const response = await deliverymanService.getByName(searchText);
            setLoading(false);
            setDeliverymen(response);
        }
        loadByName(searchText);
    }

    async function handleFormSaveButton(formData) {
        if (operacaoDeliveryman === "add") {
            const dlman = deliverymen.filter((deliveryman) => {
                return deliveryman.name === formData.name;
            });

            if (dlman === null || dlman.length === 0) {
                // Inclui no BD
                const response = await deliverymanService.post(formData);
                if (response.affectedRows > 0) getList();
            }
        }

        if (operacaoDeliveryman === "edit") {
            // Altera no BD
            const response = await deliverymanService.put(formData);

            if (!response) setDeliverymen([]);
            else if (response.affectedRows > 0) {
                await getList();
            }
        }
    }

    const handlerDeleteButton = async (id) => {
        const r = window.confirm("Confirma Exclusão ??");
        if (r === true) {
            // Deletar no BD
            const response = await deliverymanService.deleteById(id);
            if (response.affectedRows > 0) await getList();
        }
    };
    
    const handleExit = () => {
        history.push("orders");
    };
    
    return (
        <div id="deliveryman">
            {(operacaoDeliveryman === "list" || operacaoDeliveryman === "delete") && (
                <div className="deliveryman-list">

                    <div className="header">
                        <div className="header-text">
                            Entregadores
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

                    <div className="deliveryman-list-header">

                        <div></div>
                        <div
                            className="search-bar"
                            onClick={() => {
                                setSearching(!searching);
                                if (searching === true) setSearchText("");
                            }}
                        >
                            <FaSearch className="button-search" size={22} />
                            {/* Search */}
                        </div>
                    </div>

                    {searching && (
                        <div className="search-input">
                            <DebounceInput
                                className="input"
                                value={searchText}
                                minLength={2}
                                debounceTimeout={800}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                            <div className="search-cancel" onClick={() => setSearchText("")}>
                                X
                            </div>
                        </div>
                    )}

                    {/* loading text */}
                    {loading && (
                        <div id="loading">
                            <h5>{loadingText}</h5>
                        </div>
                    )}

                    {/* add button */}
                    {!loading && (
                        <>
                            <ul className="mt-3">
                                {deliverymen.map((deliveryman) => (
                                    <DeliverymanItem
                                        key={deliveryman.Id}
                                        deliveryman={deliveryman}
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

            {(operacaoDeliveryman === "add" || operacaoDeliveryman === "edit") && (
                <div className="deliveryman-form">
                    <DeliverymanForm propSubmit={handleFormSaveButton} />
                </div>
            )}
        </div>
    );
};

export default connect((state) => ({
    operacaoDeliveryman: state.deliverymanState.operacaoDeliveryman,
}))(Deliveryman);
