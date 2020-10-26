import React, { useState } from "react";
import store from "store";
import { history } from "routes/history";
import { actionSelectPaymentType } from "store/actions";
import { BsArrowLeft } from "react-icons/bs";
import CurrencyInput from "react-currency-input";
import { moneyMask } from "utils/masks";
import Modal from "components/modal/modal";

import "./styles.css";

import * as orderService from "services/orderService";

const PaymentConfirmation = () => {
    const [showModal, setShowModal] = useState(false);
    const [paymentOption, setPaymentOption] = useState(null);
    const [cashChangeMasked, setCashChangeMasked] = useState("R$ 0,00");
    const [changeFor, setChangeFor] = useState(0);
    const [shoppingCartTotal] = useState(store.getState().cartState.total);
    const shoppingCartTotalMasked = moneyMask(shoppingCartTotal);

    if (!store.getState().cartState.quantityOfItems) {
        history.push("/");
        return false;
    }

    // const moneyClassName =
    //     paymentOption === "Dinheiro"
    //         ? "payment-confirmation-button button-enabled"
    //         : "payment-confirmation-button button-disabled";
    // const cardClassName =
    //     paymentOption === "Debito/Credito"
    //         ? "payment-confirmation-button button-enabled"
    //         : "payment-confirmation-button button-disabled";
    // const moneyChangeClassName =
    //     paymentOption === "Dinheiro"
    //         ? "money-change-container money-change-display-true"
    //         : "money-change-container money-change-display-false";

    const handleChange = (event, maskedvalue, floatvalue) => {
        setCashChangeMasked(maskedvalue);
        setChangeFor(floatvalue);
    };

    const handlePaymentOptionClick = (chosenOption) => {
        if (chosenOption === "D") {
            setPaymentOption("Dinheiro");
        } else {
            setPaymentOption("Debito/Credito");
            setCashChangeMasked("R$ 0,00");
            setChangeFor(0);
        }
    };

    const handleOrderConfirmation = async () => {
        if (paymentOption) {
            if (paymentOption === "Dinheiro") {
                if (changeFor !== 0)
                    if (changeFor <= shoppingCartTotal) {
                        setShowModal(true);
                        return;
                    }
            }

            if (paymentOption === "Debito/Credito") {
                if (changeFor !== 0) setChangeFor(0);
            }

            let changeValue = 0;
            if (changeFor !== 0) changeValue = changeFor - shoppingCartTotal;

            const paymentTypeData = {
                paymentType: paymentOption,
                changeValue: changeValue,
            };

            await store.dispatch(actionSelectPaymentType(paymentTypeData));
            await orderService.postOrder();
            history.push("/order-confirmation");
        }
    };

    return (
        <div id="payment-confirmation" className="payment-confirmation-container">

            <Modal show={showModal} handleClose={() => setShowModal(false)}>
                <ModalInvalidChange />
            </Modal>

            <header
                className="arrow-back"
                onClick={() => {
                    history.goBack();
                }}
            >
                <BsArrowLeft className="arrow-back" />
                <strong>Voltar</strong>
            </header>

            <content>
                <div className="payment-confirmation-title">
                    <span>Pagamento na Entrega : {shoppingCartTotalMasked} </span>
                </div>

                <div className="payment-confirmation-buttons">
                    {/* money button*/}
                    <div
                        className={ moneyClassName(paymentOption) }
                        onClick={() => handlePaymentOptionClick("D")}
                    >
                        <h4>Dinheiro</h4>
                    </div>

                    <div className={ moneyChangeClassName(paymentOption) }>
                        <label htmlFor="moneyChange">Troco para {":  "}</label>
                        <CurrencyInput
                            id="moneyChange"
                            className="money-change-input"
                            prefix="R$ "
                            decimalSeparator=","
                            thousandSeparator="."
                            selectAllOnFocus={true}
                            autoFocus="true"
                            value={cashChangeMasked}
                            onChangeEvent={handleChange}
                        />
                    </div>

                    {/* debit/credit card button*/}
                    <div
                        className={ cardClassName(paymentOption) }
                        onClick={() => handlePaymentOptionClick("C")}
                    >
                        <h4>Cartão de Crédito / Debito</h4>
                    </div>
                </div>

                <div className="payment-confirmation-warning">
                    <span>
                        <strong>Por Precaução :</strong>
                    </span>
                    <p>
                        Evite o pagamento com dinheiro em espécie. É mais seguro para você e
                        para o empregador.
          </p>
                </div>
            </content>

            <footer>
                <div className="button-container">
                    <span className="button-sair" onClick={handleOrderConfirmation}>
                        Confirmar
          </span>
                </div>
            </footer>
        </div>
    );
};




function moneyChangeClassName(paymentOption) {
    return paymentOption === "Dinheiro"
        ? "money-change-container money-change-display-true"
        : "money-change-container money-change-display-false";
};
function cardClassName(paymentOption) {
    return paymentOption === "Debito/Credito"
        ? "payment-confirmation-button button-enabled"
        : "payment-confirmation-button button-disabled";
};
function moneyClassName(paymentOption) {
    return paymentOption === "Dinheiro"
        ? "payment-confirmation-button button-enabled"
        : "payment-confirmation-button button-disabled";
};

function ModalInvalidChange() {
    return (
        <>
            <br />
            <h1>
                <b>Atenção !!</b>
            </h1>
            <h5>Valor do Troco deve ser maior que o valor da compra !!</h5>
        </>
    )
};

export default PaymentConfirmation;
