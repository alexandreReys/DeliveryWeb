import React from 'react';
import { history } from "routes/history";
import { BsArrowLeft } from "react-icons/bs";

import "./styles.css";

const PlayStore = () => {
    return (
        <div id="play-store" className="play-store-container">
            <header
                className="arrow-back"
                onClick={() => {
                    history.goBack();
                }}
            >
                <BsArrowLeft className="arrow-back" />
                <strong>Voltar</strong>
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

                <p>
                    • Entregamos em uma area de 10 KM
                </p>                
                <div style={{marginTop: 50, marginBottom: 20 }}>
                    • Clique para ver no mapa :
                    <a 
                        href="https://www.google.com/maps/d/u/0/viewer?mid=1-BW481szEdz2znC8ODmIMlMNMpYRn2mN&ll=-23.628257157606164%2C-46.61898312953191&z=12"
                        style={{marginLeft: 30, fontSize: 16, fontWeight: "bold", cursor: "pointer", textDecoration: "underline"}}
                        target="_blank" rel="noopener noreferrer"
                    >
                        Mapa da Area de Atendimento
                    </a>
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
                href="#play-store"
                style={{fontSize: 20, fontWeight: "bold", cursor: "pointer"}}
            >
                Voltar ao topo
            </a>
        </div>
    )
}

export default PlayStore;