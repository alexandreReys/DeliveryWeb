import React, { useEffect, useState } from "react";
import store from "store";
import { history } from "routes/history";
import * as actions from "store/actions";
import * as service from "services/orderService";
import * as mapsService from "services/mapsService";
import * as settingsService from "services/settingsService";
import * as masks from "utils/masks";
import * as utils from "utils";
import * as addressUtils from "./utils";

import "./styles.css";

const DeliveryAddress = (props) => {
    const storeAddress = store.getState().deliveryAddressState;

    const [name, setName] = useState(storeAddress.name);
    const [document, setDocument] = useState(storeAddress.document);
    const [phoneNumber, setPhoneNumber] = useState(storeAddress.phoneNumber);
    const [postalCode, setPostalCode] = useState(storeAddress.postalCode);
    const [street, setStreet] = useState(storeAddress.street);
    const [number, setNumber] = useState(storeAddress.number);
    const [complement, setComplement] = useState(storeAddress.complement);
    const [info, setInfo] = useState(storeAddress.info);
    const [neighborhood, setNeighborhood] = useState(storeAddress.neighborhood);
    const [city, setCity] = useState(storeAddress.city);
    const [state, setState] = useState(storeAddress.state);

    const [deliveryAreaDistance, setDeliveryAreaDistance] = useState(0);

    const nextPath = props.location.nextPath;

    useEffect(() => {
        (async function getSettings() {
            if (!deliveryAreaDistance || deliveryAreaDistance === 0) {
                if ( 
                    !store.getState().defaultState.deliveryAreaDistance || 
                    store.getState().defaultState.deliveryAreaDistance === 0
                ) {
                    await settingsService.get();
                };
                setDeliveryAreaDistance(store.getState().defaultState.deliveryAreaDistance);
            };
        })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fillAddressByZipCode = async (e) => {
        const zipCode = e.target.value;

        setStreet("");
        setNeighborhood(" ");
        setCity(" ");
        setState("SP");

        if (!zipCode) {
            addressUtils.invalidZipCode("Cep é informação obrigatória !!");
            return false;
        }

        if (zipCode.length < 9) {
            addressUtils.invalidZipCode("Cep invalido !!");
            return false;
        }

        const zipCodeClean = zipCode.substr(0, 5) + zipCode.substr(6, 3);

        if (zipCodeClean) {
            addressUtils.consultingZipCode();

            setStreet(" ");
            setNeighborhood(" ");
            setCity(" ");
            setState("SP");

            const addr = await service.getCep(zipCodeClean);
            if (addr)
                if (!addr.logradouro) {
                    addressUtils.invalidZipCode(`Cep ${zipCode} não encontrado !!`);
                    setStreet(" ");
                    setNeighborhood(" ");
                    setCity(" ");
                    setState("SP");
                } else {
                    setStreet(addr.logradouro);
                    setNeighborhood(addr.bairro);
                    setCity(addr.cidade.nome);
                    setState(addr.estado.sigla);
                }
        }
    };

    const handleSubmit = async () => {
        const addressValues = {
            name,
            document,
            phoneNumber,
            addressType: " ",
            postalCode,
            street,
            number,
            complement,
            info,
            neighborhood,
            city,
            state,
        };

        if (!addressUtils.validateFields(addressValues)) return false;

        store.dispatch( actions.actionDeliveryAddressSave(addressValues) );

        const addr = utils.getShortAddress(addressValues);
        const distances = await mapsService.googleDistance( addr );
        const customerDistance = (distances.distance.value / 1000).toFixed(2);

        if ( customerDistance > deliveryAreaDistance ) {
            store.dispatch( actions.actionCartReset() );

            utils.message( 
`Sinto Muito ...

Infelizmente você se encontra fora de nossa area de entrega.

Atendemos uma área de ${deliveryAreaDistance} kms e você se encontra a ${customerDistance} kms`
            );
        };

        store.dispatch( actions.actionSetCustomerDistance(customerDistance) );
        
        store.dispatch( actions.actionCartRecalculate(
            {
                deliveryAreaDistance: store.getState().defaultState.deliveryAreaDistance,
                shippingTaxSettings: store.getState().defaultState.shippingTaxSettings,
                deliveryAreaDistance2: store.getState().defaultState.deliveryAreaDistance2,
                shippingTax2Settings: store.getState().defaultState.shippingTax2Settings,
            }
        ));

        if (nextPath) {
            history.push(nextPath);
        } else {
            history.goBack();
        };
    };

    return (
        <div id="deliveryAddress" className="delivery-address-container">
            <header>
                <strong>Endereço para entrega</strong>
            </header>

            <aside>
                <form>
                    <div className="delivery-address-form">
                        <div className="delivery-address-inputs">
                            {/* name */}
                            <div className="delivery-address-group">
                                <label className="label-caption" htmlFor="name">
                                    * Nome
                                </label>
                                <input
                                    className="delivery-address-field"
                                    name="name"
                                    id="name"
                                    required
                                    autoComplete="new-password"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            {/* document */}
                            <div className="delivery-address-group">
                                <label className="label-caption" htmlFor="document">
                                    * CPF
                                </label>
                                <input
                                    className="delivery-address-field"
                                    name="document"
                                    id="document"
                                    required
                                    autoComplete="new-password"
                                    maxLength="14"
                                    value={masks.cpfMask(document)}
                                    onChange={(e) => setDocument(e.target.value)}
                                />
                            </div>

                            {/* phoneNumber */}
                            <div className="delivery-address-group">
                                <label className="label-caption" htmlFor="phoneNumber">
                                    * Telefone
                                </label>
                                <input
                                    className="delivery-address-field"
                                    name="phoneNumber"
                                    id="phoneNumber"
                                    required
                                    autoComplete="new-password"
                                    value={masks.phoneMask(phoneNumber)}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </div>

                            {/* postalCode */}
                            <div className="delivery-address-group">
                                <label className="label-caption" htmlFor="postalCode">
                                    * Cep
                                </label>
                                <input
                                    className="delivery-address-field"
                                    name="postalCode"
                                    id="postalCode"
                                    required
                                    autoComplete="new-password"
                                    value={masks.cepMask(postalCode)}
                                    onChange={(e) => setPostalCode(e.target.value)}
                                    onBlur={fillAddressByZipCode}
                                />
                            </div>

                            {/* street */}
                            <div className="delivery-address-group">
                                <label className="label-caption">Endereço</label>
                                <label className="label-value">{street}</label>
                            </div>

                            {/* number */}
                            <div className="delivery-address-group">
                                <label className="label-caption" htmlFor="number">
                                    * Numero
                                </label>
                                <input
                                    className="delivery-address-field"
                                    name="number"
                                    id="number"
                                    required
                                    autoComplete="new-password"
                                    value={number}
                                    onChange={(e) => setNumber(e.target.value)}
                                />
                            </div>

                            {/* neighborhood */}
                            <div className="delivery-address-group">
                                <label className="label-caption">Bairro</label>
                                <label className="label-value">{neighborhood}</label>
                            </div>

                            {/* city */}
                            <div className="delivery-address-group">
                                <label className="label-caption">Cidade</label>
                                <label className="label-value">{city}</label>
                            </div>

                            {/* state */}
                            <div className="delivery-address-group">
                                <label className="label-caption">Estado</label>
                                <label className="label-value">{state}</label>
                            </div>

                            {/* complement */}
                            <div className="delivery-address-group">
                                <label className="label-caption" htmlFor="complement">
                                    Complemento
                                </label>
                                <input
                                    className="delivery-address-field"
                                    name="complement"
                                    id="complement"
                                    required
                                    autoComplete="new-password"
                                    value={complement}
                                    onChange={(e) => setComplement(e.target.value)}
                                />
                            </div>

                            {/* info */}
                            <div className="delivery-address-group">
                                <label className="label-caption" htmlFor="info">
                                    Referencia
                                </label>
                                <input
                                    className="delivery-address-field"
                                    name="info"
                                    id="info"
                                    required
                                    autoComplete="new-password"
                                    value={info}
                                    onChange={(e) => setInfo(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </form>
                <footer>
                    <button className="delivery-address-btn" onClick={handleSubmit}>
                        Confirmar
                    </button>
                </footer>
            </aside>
        </div>
    );
};

export default DeliveryAddress;
