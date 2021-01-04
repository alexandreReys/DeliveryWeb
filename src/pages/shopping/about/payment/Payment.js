import React from 'react';
import { history } from "routes/history";
import { BsArrowLeftShort } from "react-icons/bs";

import "./styles.css";

const Payment = () => {
    return (
        <div id="payment" className="payment-container">
            <header
                style={{ cursor: "pointer", color: "grey" }}
                onClick={() => { history.push("/") }}
            >
                <BsArrowLeftShort className="arrow-back" />
                <span style={{ fontSize: 18 }}>Voltar</span>
            </header>

            <section className="title">
                <h1><b>
                    Pagamento na Entrega
                </b></h1>
            </section>

            <section className="quais-formas-pagamento">
                <h3><b>
                    1. QUAIS SÃO AS FORMAS DE PAGAMENTO ACEITAS ?
                </b></h3>

                <p>
                    Você pode pagar pelo seu pedido usando diferentes formas de pagamento.
                </p>
                <p>
                    • Cartão de Crédito
                </p>
                <p>
                    • Cartão de Débito
                </p>
                <p>
                    • Pagamento em Dinheiro ( Não esqueça de indicar o valor para o troco )
                </p>
            </section>

            <section className="quando-efetuar-pagamento" style={{ marginTop: 40}}>
                <h3><b>
                    2. QUANDO EFETUAR O PAGAMENTO ?
                </b></h3>

                <p>
                    • Você efetua o pagamento ao receber seu pedido
                </p>

            </section>
 
            <section className="duvidas" style={{ marginTop: 40}}>
                <h3><b>
                    3. DÚVIDAS SOBRE PAGAMENTO
                </b></h3>

                <p>
                    Se você tiver algum questionamento ou dúvida com relação ao pagamento do seu pedido ou qualquer prática descrita aqui, entre em contato conosco através por telefone e sanaremos quaisquer duvidas.
                </p>

            </section>

            <PageFooter />

        </div>
    );
};

function PageFooter () {
    return (
        <div className="page-footer">
            <a 
                href="#payment"
                style={{fontSize: 20, fontWeight: "bold", cursor: "pointer"}}
            >
                Voltar ao topo
            </a>
        </div>
    )
}

export default Payment;