import React from "react";
import { FiToggleLeft, FiToggleRight } from "react-icons/fi";
import { history } from "routes/history";
import store from "store";
import { actionSetOrderOperation } from "store/actions";
import * as settingsService from "services/settingsService";

import "./styles.css";

const Aside = () => {
    const [idSettings, setIdSettings] = React.useState(0);
    const [buttonOn, setButtonOn] = React.useState(store.getState().defaultState.operationIsEnabledSettings === 1 ? true : false);

    React.useEffect( ()=>{
        (async function getSettings() {
            if (store.getState().defaultState.operationIsEnabledSettings === -1) {
                const response = await settingsService.get();
                setIdSettings(response.IdSettings);
                setButtonOn(store.getState().defaultState.operationIsEnabledSettings);
            };
        })();
    }, []);

    async function change(data) {
        return await settingsService.changeOperationStatus(data);
    };

    return (
        <aside className="app-aside">
            <div className="container-aside">

                { buttonOn && (
                    <FiToggleRight
                        style={{cursor: 'pointer', color: '#33FF33', fontSize: '3rem', marginBottom: 30}}
                        data-tip="Clique para parar a operação no APP"
                        onClick={() => setButtonOn( (previous) => {
                            const data = {
                                OperationIsEnabledSettings: 0,
                                IdSettings: idSettings,
                            };
                            const response = change(data);
                            if(response.affectedRows === 0) {
                                return previous;
                            } else {
                                return !previous;
                            };
                        })}
                    />
                )}

                { !buttonOn && (
                    <FiToggleLeft
                        style={{cursor: 'pointer', color: '#EF5350', fontSize: '3rem', marginBottom: 30}}
                        data-tip="Clique para ativar a operação no APP"
                        onClick={() => setButtonOn( (previous) => {
                            const data = {
                                OperationIsEnabledSettings: 1,
                                IdSettings: idSettings,
                            };
                            const response = change(data);
                            if(response.affectedRows === 0) {
                                return previous;
                            } else {
                                return !previous;
                            };
                        })}
                    />
                )}
               
                <p
                    onClick={() => {
                        history.push("/orders");
                        store.dispatch(actionSetOrderOperation("list"));
                        return;
                    }}
                >
                    Pedidos
                </p>

                <p
                    onClick={() => {
                        history.push("/category");
                        return;
                    }}
                >
                    Categorias
                </p>

                <p
                    onClick={() => {
                        history.push("/products");
                        return;
                    }}
                >
                    Produtos
                </p>

                <p
                    onClick={() => {
                        history.push("/deliveryman");
                        return;
                    }}
                >
                    Entregadores
                </p>

                <p
                    onClick={() => {
                        history.push("/product-deactivate");
                        return;
                    }}
                >
                    Desativar
                </p>

                <p
                    onClick={() => {
                        history.push("/product-promotion");
                        return;
                    }}
                >
                    Promoção
                </p>

                <p
                    onClick={() => {
                        history.push("/notifications");
                        return;
                    }}
                >
                    Notificações
                </p>

                <p
                    onClick={() => {
                        history.push("/settings");
                        return;
                    }}
                >
                    Settings
                </p>

            </div>
        </aside>
    );
};

export default Aside;
