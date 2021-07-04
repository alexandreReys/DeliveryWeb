import React from "react";
import { history } from "routes/history";

import "./style.css";

const AddressConfirmation = ({ show, close, address }) => {
    
    return (
        <div className="modal address-confirmation-modal"
            style={{
                display: show ? 'block' : 'none',
            }}
        >
            <div className="address-confirmation-wrapper"
                style={{
                    transform: show ? 'translateY(0vh)' : 'translateY(-100vh)',
                }}
            >
                <div className="address-confirmation-header">
                    <p>Onde deseja receber seu pedido ?</p>
                    <span onClick={() => close()} className="address-confirmation-x-button">x</span>
                </div>
                <div className="address-confirmation-content">
                    <div className="address-confirmation-body">
                        <h4>Endereço</h4>
                        <p>{getAddress(address)}</p>
                    </div>
                    <div className="address-confirmation-footer">
                        <div className="address-confirmation-close-button">
                            <button onClick={() => {
                                return history.push({ pathname: "/delivery-address", nextPath: "/" });
                            }}>
                                Alterar
                            </button>
                        </div>
                        <div className="address-confirmation-close-button">
                            <button onClick={() => {
                                return history.push({ pathname: "/", nextPath: "/" }); 
                            }}>
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    function getAddress(addr) {
        let address = "";
    
        address += !addr.street ? "" : addr.street;
        address += !addr.number ? "" : ", " + addr.number;
        address += !addr.neighborhood ? "" : ", Bairro: " + addr.neighborhood;
        address += !addr.city ? "" : ", " + addr.city;
        address += !addr.state ? "" : ", " + addr.state;
        address += !addr.postalCode ? "" : ", Cep: " + addr.postalCode;
    
        return address;
    };
    
};

export default AddressConfirmation;
