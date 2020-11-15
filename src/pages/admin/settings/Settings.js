import React, { useEffect, useState } from "react";
import Sweetalert2 from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { TextInputMask } from "react-web-masked-text";
import { MoneyMaskedToStringUnmasked } from "utils";

import * as settingsService from "services/settingsService";

import store from "store";
import { history } from "routes/history";
import * as actions from "store/actions";
import * as utils from "utils";

import "./styles.css";

const Swal = withReactContent(Sweetalert2);

const Settings = () => {
    const [idSettings, setIdSettings] = useState(0);
    const [addressSellerSettings, setAddressSellerSettings] = useState("");
    const [shippingTaxSettings, setShippingTaxSettings] = useState(0);

    const [appBannerFileInputState] = useState();
    const [appBannerSettings, setAppBannerSettings] = useState("");
    const [appBannerPublicIdSettings, setAppBannerPublicIdSettings] = useState("");
    const [appBannerPreview, setAppBannerPreview] = useState("");

    const [appLogoPFileInputState] = useState();
    const [appLogoPSettings, setAppLogoPSettings] = useState("");
    const [appLogoPPublicIdSettings, setAppLogoPPublicIdSettings] = useState("");
    const [appLogoPPreview, setAppLogoPPreview] = useState("");

    const [webBannerFileInputState] = useState();
    const [webBannerSettings, setWebBannerSettings] = useState("");
    const [webBannerPublicIdSettings, setWebBannerPublicIdSettings] = useState("");
    const [webBannerPreview, setWebBannerPreview] = useState("");

    useEffect(() => {
        store.dispatch(actions.actionAdminModuleActivate());

        (async function getSettings() {
            const response = await settingsService.get()
            setIdSettings(response.IdSettings);
            setAddressSellerSettings(response.AddressSellerSettings);
            setShippingTaxSettings(response.ShippingTaxSettings);

            setAppBannerSettings(response.AppBannerSettings);
            setAppBannerPublicIdSettings(response.AppBannerPublicIdSettings);
            setAppBannerPreview(response.AppBannerSettings);

            setAppLogoPSettings(response.AppLogoPSettings);
            setAppLogoPPublicIdSettings(response.AppLogoPPublicIdSettings);
            setAppLogoPPreview(response.AppLogoPSettings);

            setWebBannerSettings(response.WebBannerSettings);
            setWebBannerPublicIdSettings(response.WebBannerPublicIdSettings);
            setWebBannerPreview(response.WebBannerSettings);
        })();

    }, []);

    function appBannerHandleFileInputChange(e) {
        const file = e.target.files[0];
        appBannerPreviewFile(file);
    };
    function appBannerPreviewFile(file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setAppBannerPreview(reader.result);
        };
    };

    function appLogoPHandleFileInputChange(e) {
        const file = e.target.files[0];
        appLogoPPreviewFile(file);
    };
    function appLogoPPreviewFile(file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setAppLogoPPreview(reader.result);
        };
    };

    function webBannerHandleFileInputChange(e) {
        const file = e.target.files[0];
        webBannerPreviewFile(file);
    };
    function webBannerPreviewFile(file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setWebBannerPreview(reader.result);
        };
    };

    const Header = () => {
        return (
            <div className="notifications-header">
                <div className="notifications-header-text">
                    Settings
                </div>
            </div>
        )
    };
    const Buttons = () => {
        const handleSubmit = () => {
            if (validateFields({ addressSellerSettings })) confirmAndExit();

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
                    
                    utils.processingWait( 3 ).then ( () => { 
                        history.push("orders");
                    });
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

                        AppLogoPSettings: appLogoPSettings,
                        AppLogoPPublicIdSettings: appLogoPPublicIdSettings,
                        AppLogoPB64: appLogoPPreview,

                        WebBannerSettings: webBannerSettings,
                        WebBannerPublicIdSettings: webBannerPublicIdSettings,
                        WebBannerB64: webBannerPreview,
                    });
                };
            };
        };

        const handleExit = () => {
            history.push("orders");
        };

        return (
            <div className="notifications-buttons">
                <button className="notifications-button" onClick={handleSubmit}>
                    Confirmar
                </button>

                <button className="notifications-button" onClick={handleExit}>
                    Sair
                </button>
            </div>
        )
    };
    const Warning = () => {
        return (
            <div className="notifications-warning">
                <div className="notifications-warning-text">
                    Settings
                </div>
            </div>
        );
    };

    return (
        <div id="settings" className="notifications-container">
            <Header />
            <Buttons />
            <Warning />

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

                <div style={{ display: "flex", flexDirection: "row"}}>

                    {/* appBannerSettings */}
                    <div style={{ marginTop: 40, marginRight: 80, width: "10%", minWidth: 260 }}>
                        <label
                            className="product-form-label-select-img"
                            htmlFor="appBannerSettings"
                        >
                            Selecionar Imagem para o Baner do App
                        </label>
                        <input className="input-file-invisible"
                            style={{ display: "none" }}
                            type="file"
                            name="appBannerSettings"
                            id="appBannerSettings"
                            onChange={appBannerHandleFileInputChange}
                            value={appBannerFileInputState}
                        >
                        </input>
                        <div className="settings-app-banner-container">
                            <img
                                src={appBannerPreview}
                                style={{ width: 200, borderRadius: 10 }}
                                alt="selecionar imagem"
                            />
                        </div>
                    </div>

                    {/* appLogoPSettings */}
                    <div style={{ marginTop: 40, marginRight: 80, width: "10%", minWidth: 260 }}>
                        <label
                            className="product-form-label-select-img"
                            htmlFor="appLogoPSettings"
                        >
                            Selecionar Imagem para o Logotipo do App
                        </label>
                        <input className="input-file-invisible"
                            style={{ display: "none" }}
                            type="file"
                            name="appLogoPSettings"
                            id="appLogoPSettings"
                            onChange={appLogoPHandleFileInputChange}
                            value={appLogoPFileInputState}
                        >
                        </input>
                        <div className="settings-app-banner-container">
                            <img
                                src={appLogoPPreview}
                                style={{ width: 200, borderRadius: 10 }}
                                alt="selecionar imagem"
                            />
                        </div>
                    </div>
                    
                    {/* webBannerSettings */}
                    <div style={{ marginTop: 40, width: "10%", minWidth: 520 }}>
                        <label
                            className="product-form-label-select-img"
                            style={{ width: "10%", minWidth: 260 }}
                            htmlFor="webBannerSettings"
                        >
                            Clique para Selecionar Imagem para o Baner do Site
                        </label>
                        <input className="input-file-invisible"
                            style={{ display: "none" }}
                            type="file"
                            name="webBannerSettings"
                            id="webBannerSettings"
                            onChange={webBannerHandleFileInputChange}
                            value={webBannerFileInputState}
                        >
                        </input>
                        <div className="settings-app-banner-container">
                            <img
                                src={webBannerPreview}
                                style={{ width: 460, borderRadius: 10 }}
                                alt="selecionar imagem"
                            />
                        </div>
                    </div>
                    
                </div>


            </div>
        </div>
    );
};

export default Settings;
