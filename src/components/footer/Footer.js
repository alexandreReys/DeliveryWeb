import React from "react";
import store from "store";
import { history } from "routes/history";
import playStore from "assets/img/play-store.png";
import * as settingsService from "services/settingsService";

import "./styles.css";

const Footer = () => {
    const appTitle = store.getState().defaultState.appTitle;
    const [banner, setBanner] = React.useState(store.getState().defaultState.appLogoPSettings);

    React.useEffect( ()=>{
        (async function getSettings() {
            if (!banner) {
                if (!store.getState().defaultState.appLogoPSettings) {
                    await settingsService.get();
                };
                setBanner(store.getState().defaultState.appLogoPSettings);
            };
        })();
    }, [banner, setBanner])

    return (
        <footer className="main-footer">

            <div className="div1">
                <div className="dv2-1">{appTitle}</div>
                <div style={{ width: 120 }}>
                    <img className="img-fluid" src={banner} alt="" />
                </div>
            </div>

            <div className="div2 sobre-nos">
                <div>
                    <div className="dv2-1">
                        Sobre nós
                    </div>

                    <div
                        className="dv2-2"
                        onClick={ ()=>{ history.push("/about-payment" ) }}
                    >
                        Pagamento
                    </div>

                    <div 
                        className="dv2-2"
                        onClick={ ()=>{ history.push("/about-delivery" ) }}
                    >
                        Entrega
                    </div>

                    <div 
                        className="dv2-2"
                        onClick={ ()=>{ history.push("/about-privacy-policy" ) }}
                    >
                        Politica de privacidade
                    </div>
                </div>
            </div>

            <div className="div3 trabalhe-conosco">
                <div>
                    <div className="dv2-1">Parceiras</div>
                    <div 
                        className="dv2-2"
                        onClick={ ()=>{ history.push("/about-employment" ) }}
                    >
                        Trabalhe conosco
                    </div>
                </div>
            </div>

            <div className="div4 play-store">
                <div>
                    <div className="dv2-1">Já Baixou o APP?</div>

                    <a   
                        href={ store.getState().defaultState.urlGooglePlay }
                        target="_blank" rel="noopener noreferrer"
                    >
                        <img 
                            className="img-google-play" 
                            src={playStore} 
                            alt="loading ..."
                        />
                    </a>
                </div>
            </div>

        </footer>
    );
};

export default Footer;
