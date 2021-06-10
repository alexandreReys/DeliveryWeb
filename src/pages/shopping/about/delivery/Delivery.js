import React from 'react';
import { history } from "routes/history";
import { BsArrowLeftShort } from "react-icons/bs";
import * as settingsService from "services/settingsService";
import store from "store";

import "./styles.css";

const Delivery = () => {
    const [deliveryAreaDistance, setDeliveryAreaDistance] = React.useState(0);
    const [urlDeliveryMap, setUrlDeliveryMap] = React.useState("");

    React.useEffect( () => {
        (async function getSettings() {
            if (!deliveryAreaDistance || deliveryAreaDistance === 0) {
                if (!store.getState().defaultState.deliveryAreaDistance) {
                    await settingsService.get();
                };
                setDeliveryAreaDistance(store.getState().defaultState.deliveryAreaDistance);
                setUrlDeliveryMap(store.getState().defaultState.urlDeliveryMap);
            };
        })();

    },[deliveryAreaDistance] );

    return (
        <div id="delivery" className="delivery-container">
            <header
                style={{ cursor: "pointer", color: "grey" }}
                onClick={() => { history.push("/") }}
            >
                <BsArrowLeftShort className="arrow-back" />
                <span style={{ fontSize: 18 }}>Voltar</span>
            </header>

            <section className="title">
                <h1><b>
                    Entregas
                </b></h1>
            </section>

            <section>
                <h3><b>
                    Area de Atendimento
                </b></h3>

                <p style={{marginTop: 30}}>
                    • Entregamos em uma area de { deliveryAreaDistance } KM
                </p>

                { !!urlDeliveryMap && (
                    <div style={{marginTop: 50, marginBottom: 20 }}>
                        • Clique para ver no mapa :
                        <a 
                            href={ urlDeliveryMap }
                            style={{marginLeft: 30, fontSize: 16, fontWeight: "bold", cursor: "pointer", textDecoration: "underline"}}
                            target="_blank" rel="noopener noreferrer"
                        >
                            Mapa da Area de Atendimento
                        </a>
                    </div>                
                )}
            </section>

            <PageFooter />

        </div>
    );
};

function PageFooter () {
    return (
        <div className="page-footer">
            <a 
                href="#delivery"
                style={{fontSize: 20, fontWeight: "bold", cursor: "pointer"}}
            >
                Voltar ao topo
            </a>
        </div>
    )
}

export default Delivery;