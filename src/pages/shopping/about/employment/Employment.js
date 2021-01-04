import React from 'react';
import { history } from "routes/history";
import { BsArrowLeftShort } from "react-icons/bs";
import * as settingsService from "services/settingsService";
import store from "store";

import "./styles.css";

const Employment = () => {
    const [contactPhone, setContactPhone] = React.useState("");

    React.useEffect( () => {
        (async function getSettings() {
            if (!contactPhone) {
                if (!store.getState().defaultState.contactPhone) {
                    await settingsService.get();
                };
                setContactPhone(store.getState().defaultState.contactPhone);
            };
        })();

    },[contactPhone] );

    return (
        <div id="employment" className="employment-container">
            <header
                style={{ cursor: "pointer", color: "grey" }}
                onClick={() => { history.push("/") }}
            >
                <BsArrowLeftShort className="arrow-back" />
                <span style={{ fontSize: 18 }}>Voltar</span>
            </header>

            <section className="title">
                <h1><b>
                    Trabalhe Conosco
                </b></h1>
            </section>

            <section className="telefone_whatsapp">

                <h3><b>
                    Entre em Contato e vamos conversar
                </b></h3>

                <div style={{ marginTop: 30 }}>
                    • Telefone: { contactPhone }
                </div>                

                <div style={{ marginTop: 20 }}>
                    • Whatsapp: { store.getState().defaultState.contactWhatsapp }
                </div>                

                <div style={{ marginTop: 20 }}>
                    • E-Mail: { store.getState().defaultState.contactEmail }
                </div>                


            </section>

            <PageFooter />

        </div>
    );
};

function PageFooter () {
    return (
        <div className="page-footer">
            <a 
                href="#employment"
                style={{fontSize: 20, fontWeight: "bold", cursor: "pointer"}}
            >
                Voltar ao topo
            </a>
        </div>
    )
}

export default Employment;