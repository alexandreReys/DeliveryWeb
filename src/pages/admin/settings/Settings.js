import React, { useEffect, useState } from "react";
import Sweetalert2 from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { TextInputMask } from "react-web-masked-text";
import { MoneyMaskedToStringUnmasked } from "utils";

import * as settingsService from "services/settingsService";

import store from "store";
import { history } from "routes/history";
import * as actions from "store/actions";

import "./styles.css";

const Swal = withReactContent(Sweetalert2);

const Settings = () => {
    const [idSettings, setIdSettings] = useState(0);
    const [addressSellerSettings, setAddressSellerSettings] = useState("");
    const [shippingTaxSettings, setShippingTaxSettings] = useState(0);

    const [fileInputState] = useState();
    const [appBannerSettings, setAppBannerSettings] = useState("");
    const [appBannerPublicIdSettings, setAppBannerPublicIdSettings] = useState("");
    const [appBannerPreview, setAppBannerPreview] = useState("");

    
    function handleFileInputChange(e) {
        const file = e.target.files[0];
        previewFile(file);
    };
    
    function previewFile(file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setAppBannerPreview(reader.result);
        };
    };
    
    useEffect(() => {
        store.dispatch(actions.actionAdminModuleActivate());

        ( async function getSettings() {
            const response = await settingsService.get()
            setIdSettings(response.IdSettings);
            setAddressSellerSettings(response.AddressSellerSettings);
            setShippingTaxSettings(response.ShippingTaxSettings);
            setAppBannerSettings(response.AppBannerSettings);
            setAppBannerPublicIdSettings(response.AppBannerPublicIdSettings);
            setAppBannerPreview(response.AppBannerSettings);
        } )();

    }, []);

    const handleSubmit = () => {
        if ( validateFields({ addressSellerSettings }) ) confirmAndExit();

        function validateFields(values) {
            if (!values.addressSellerSettings) {
                showErrorMessage("Campo Endereço do Estabelecimento é obrigatório !!");
                return false;
            }
            return true;

            function showErrorMessage(message) {
                Swal.fire({
                    icon: "error",
                    title: message,
                    text: "Oops ...",
                    position: "top-end",
                    background: "yellow",
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                });
            };
        };
        async function confirmAndExit() {
            if (await confirmUpdates()) {
                updateSettingsInformation();
                history.push("orders");
            };

            function confirmUpdates() {
                const confirmationOptions = {
                    title: 'Confirma ?',
                    icon: 'warning',
                    position: "top-end",
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sim',
                    cancelButtonText: 'Cancelar',
                };
                return Swal
                    .fire(confirmationOptions)
                    .then(result => result.isConfirmed);
            };
            function updateSettingsInformation() {
                const shippingTaxValue = MoneyMaskedToStringUnmasked(shippingTaxSettings);
                settingsService.put({
                    AddressSellerSettings: addressSellerSettings,
                    ShippingTaxSettings: shippingTaxValue,
                    IdSettings: idSettings,
                    AppBannerSettings: appBannerSettings,
                    AppBannerPublicIdSettings: appBannerPublicIdSettings,
                    AppBannerB64: appBannerPreview,
                });
            };
        };
    };

    const handleExit = () => {
        history.push("orders");
    };

    return (
        <div id="settings" className="notifications-container">
            <div className="notifications-header">
                <div className="notifications-header-text">
                    Settings
                </div>
            </div>
            <div className="notifications-buttons">
                <button className="notifications-button" onClick={handleSubmit}>
                    Confirmar
                </button>

                <button className="notifications-button" onClick={handleExit}>
                    Sair
                </button>
            </div>
            <div className="notifications-warning">
                <div className="notifications-warning-text">
                    Settings
                </div>
            </div>
            <div className="notifications-content">
                {/* addressSellerSettings */}
                <div className="notifications-input-group">
                    <label className="notifications-label" htmlFor="addressSellerSettings">
                        Endereço do Estabelecimento
                    </label>
                    <input
                        className="notifications-input"
                        name="addressSellerSettings"
                        id="addressSellerSettings"
                        required
                        autoComplete="new-password"
                        value={addressSellerSettings}
                        onChange={(e) => setAddressSellerSettings(e.target.value)}
                    />
                </div>

                {/* shippingTaxSettings */}
                <div className="notifications-input-group">
                    <label className="notifications-label" htmlFor="shippingTaxSettings">
                        Valor do Frete
                    </label>
                    <TextInputMask
                        kind={"money"}
                        className="notifications-input"
                        style={{ width: 200 }}
                        name="shippingTaxSettings"
                        id="shippingTaxSettings"
                        required
                        autoComplete="new-password"
                        value={shippingTaxSettings}
                        onChange={(text) => setShippingTaxSettings(text)}
                    />
                </div>

                {/* appBanner */}
                <div style={{ marginTop: 40, width: "10%", minWidth: 260 }}>
                    <label
                        className="product-form-label-select-img"
                        htmlFor="ImagemInput1Vinho"
                    >
                        Selecionar Imagem para o Baner do Aplicativo
                    </label>
                    <input className="input-file-invisible"
                        style={{display: "none"}}
                        type="file"
                        name="ImagemInput1Vinho"
                        id="ImagemInput1Vinho"
                        onChange={handleFileInputChange}
                        value={fileInputState}
                    >
                    </input>
                    <div className="settings-app-banner-container">
                        <img
                            src={appBannerPreview}
                            style={ {width: 200, borderRadius: 10} }
                            alt="selecionar imagem"
                        />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Settings;

// .settings-app-banner-img {
//     margin-top: 10px;
//     margin-bottom: 30px;
//     padding-top: 20px;
//     padding-bottom: 20px;
//     text-align: center;
//     border: 1px solid silver;
//     font-size: 0.8rem;
//   }
