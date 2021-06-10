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
    const [loading, setLoading] = useState(true);
    const [loadingText] = useState(store.getState().defaultState.loadingText);

    const [idSettings, setIdSettings] = useState(0);
    const [addressSellerSettings, setAddressSellerSettings] = useState("");
 
    const [appBannerFileInputState] = useState();
    const [appBannerSettings, setAppBannerSettings] = useState("");
    const [appBannerPublicIdSettings, setAppBannerPublicIdSettings] = useState("");
    const [appBannerPreview, setAppBannerPreview] = useState("");

    const [appBanner2FileInputState] = useState();
    const [appBanner2Settings, setAppBanner2Settings] = useState("");
    const [appBanner2PublicIdSettings, setAppBanner2PublicIdSettings] = useState("");
    const [appBanner2Preview, setAppBanner2Preview] = useState("");

    const [appBanner3FileInputState] = useState();
    const [appBanner3Settings, setAppBanner3Settings] = useState("");
    const [appBanner3PublicIdSettings, setAppBanner3PublicIdSettings] = useState("");
    const [appBanner3Preview, setAppBanner3Preview] = useState("");

    const [appLogoPFileInputState] = useState();
    const [appLogoPSettings, setAppLogoPSettings] = useState("");
    const [appLogoPPublicIdSettings, setAppLogoPPublicIdSettings] = useState("");
    const [appLogoPPreview, setAppLogoPPreview] = useState("");

    const [webBannerFileInputState] = useState();
    const [webBannerSettings, setWebBannerSettings] = useState("");
    const [webBannerPublicIdSettings, setWebBannerPublicIdSettings] = useState("");
    const [webBannerPreview, setWebBannerPreview] = useState("");

    const [urlDeliveryMap, setUrlDeliveryMap] = useState("");
    const [urlGooglePlay, setUrlGooglePlay] = useState("");
    const [contactPhone, setContactPhone] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [contactWhatsapp, setContactWhatsapp] = useState("");

    const [deliveryAreaDistance, setDeliveryAreaDistance] = useState(0);
    const [shippingTaxSettings, setShippingTaxSettings] = useState(0);
    const [deliveryAreaDistance2, setDeliveryAreaDistance2] = useState(0);
    const [shippingTax2Settings, setShippingTax2Settings] = useState(0);


    useEffect(() => {
        store.dispatch(actions.actionAdminModuleActivate());

        (async function getSettings() {

            if (!addressSellerSettings) {
                setLoading(true);

                const response = await settingsService.get()
                setIdSettings(response.IdSettings);
                setAddressSellerSettings(response.AddressSellerSettings);
                
                setAppBannerSettings(response.AppBannerSettings);
                setAppBannerPublicIdSettings(response.AppBannerPublicIdSettings);
                setAppBannerPreview(response.AppBannerSettings);
                
                setAppBanner2Settings(response.AppBanner2Settings);
                setAppBanner2PublicIdSettings(response.AppBanner2PublicIdSettings);
                setAppBanner2Preview(response.AppBanner2Settings);
                
                setAppBanner3Settings(response.AppBanner3Settings);
                setAppBanner3PublicIdSettings(response.AppBanner3PublicIdSettings);
                setAppBanner3Preview(response.AppBanner3Settings);
                
                setAppLogoPSettings(response.AppLogoPSettings);
                setAppLogoPPublicIdSettings(response.AppLogoPPublicIdSettings);
                setAppLogoPPreview(response.AppLogoPSettings);
                
                setWebBannerSettings(response.WebBannerSettings);
                setWebBannerPublicIdSettings(response.WebBannerPublicIdSettings);
                setWebBannerPreview(response.WebBannerSettings);
                
                setUrlDeliveryMap(response.UrlDeliveryMap);
                setUrlGooglePlay(response.UrlGooglePlay);
                setContactPhone(response.ContactPhone);
                setContactEmail(response.ContactEmail);
                setContactWhatsapp(response.ContactWhatsapp);
                
                setDeliveryAreaDistance(response.DeliveryAreaDistance);
                setShippingTaxSettings(response.ShippingTaxSettings);
                setDeliveryAreaDistance2(response.DeliveryAreaDistance2);
                setShippingTax2Settings(response.ShippingTax2Settings);

                setLoading(false);
            };
        })();

    }, [addressSellerSettings]);

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

    function appBanner2HandleFileInputChange(e) {
        const file = e.target.files[0];
        appBanner2PreviewFile(file);
    };
    function appBanner2PreviewFile(file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setAppBanner2Preview(reader.result);
        };
    };
    
    function appBanner3HandleFileInputChange(e) {
        const file = e.target.files[0];
        appBanner3PreviewFile(file);
    };
    function appBanner3PreviewFile(file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setAppBanner3Preview(reader.result);
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

                    utils.processingWait(3).then(() => {
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
                    const shippingTax2Value = MoneyMaskedToStringUnmasked(shippingTax2Settings);
                    
                    settingsService.put({
                        AddressSellerSettings: addressSellerSettings,
                        IdSettings: idSettings,
                        
                        AppBannerSettings: appBannerSettings,
                        AppBannerPublicIdSettings: appBannerPublicIdSettings,
                        AppBannerB64: appBannerPreview,
                        
                        AppBanner2Settings: appBanner2Settings,
                        AppBanner2PublicIdSettings: appBanner2PublicIdSettings,
                        AppBanner2B64: appBanner2Preview,
                        
                        AppBanner3Settings: appBanner3Settings,
                        AppBanner3PublicIdSettings: appBanner3PublicIdSettings,
                        AppBanner3B64: appBanner3Preview,
                        
                        AppLogoPSettings: appLogoPSettings,
                        AppLogoPPublicIdSettings: appLogoPPublicIdSettings,
                        AppLogoPB64: appLogoPPreview,
                        
                        WebBannerSettings: webBannerSettings,
                        WebBannerPublicIdSettings: webBannerPublicIdSettings,
                        WebBannerB64: webBannerPreview,
                        
                        UrlDeliveryMap: urlDeliveryMap,
                        UrlGooglePlay: urlGooglePlay,
                        
                        ContactPhone: contactPhone,
                        ContactEmail: contactEmail,
                        ContactWhatsapp: contactWhatsapp,
                        
                        DeliveryAreaDistance: deliveryAreaDistance,
                        ShippingTaxSettings: shippingTaxValue,
                        DeliveryAreaDistance2: deliveryAreaDistance2,
                        ShippingTax2Settings: shippingTax2Value,
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

                {!!loading && (
                    <div style={{ color: "red", height: 50, marginTop: 30 }}>
                        <h5>{loadingText}</h5>
                    </div>
                )}

                {!loading && (
                    <>
                        {/* addressSellerSettings */}
                        <div className="notifications-input-group">
                            <label className="notifications-label" htmlFor="addressSellerSettings">
                                Endereço do Estabelecimento
                            </label>
                            <input
                                className="notifications-input"
                                style={{ minWidth: 300 }}
                                name="addressSellerSettings"
                                id="addressSellerSettings"
                                required
                                autoComplete="new-password"
                                value={addressSellerSettings}
                                onChange={(e) => setAddressSellerSettings(e.target.value)}
                            />
                        </div>

                        {/* contactPhone && contactWhatsapp && contactEmail */}
                        <div style={{ display: "flex", flexDirection: "row", gap: 15, flexWrap: "wrap"}}>
                            <div className="notifications-input-group">
                                <label className="notifications-label" htmlFor="contactPhone">
                                    Telefone
                                </label>
                                <input
                                    className="notifications-input"
                                    style={{ width: 200 }}
                                    name="contactPhone"
                                    id="contactPhone"
                                    required
                                    autoComplete="new-password"
                                    value={contactPhone}
                                    onChange={(e) => setContactPhone(e.target.value)}
                                />
                            </div>
                            <div className="notifications-input-group">
                                <label className="notifications-label" htmlFor="contactWhatsapp">
                                    Whatsapp
                                </label>
                                <input
                                    className="notifications-input"
                                    style={{ width: 200 }}
                                    name="contactWhatsapp"
                                    id="contactWhatsapp"
                                    required
                                    autoComplete="new-password"
                                    value={contactWhatsapp}
                                    onChange={(e) => setContactWhatsapp(e.target.value)}
                                />
                            </div>
                            <div className="notifications-input-group">
                                <label className="notifications-label" htmlFor="contactEmail">
                                    Email
                                </label>
                                <input
                                    className="notifications-input"
                                    style={{ width: 400 }}
                                    name="contactEmail"
                                    id="contactEmail"
                                    required
                                    autoComplete="new-password"
                                    value={contactEmail}
                                    onChange={(e) => setContactEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* shippingTaxSettings && deliveryAreaDistance */}
                        <div style={{ display: "flex", flexDirection: "row", gap: 15, flexWrap: "wrap"}}>
                            {/* Frete */}
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
                            {/* Distancia */}
                            <div className="notifications-input-group">
                                <label className="notifications-label" htmlFor="deliveryAreaDistance">
                                    Área de entrega em Kms
                                </label>
                                <TextInputMask
                                    kind={"only-numbers"}
                                    className="notifications-input"
                                    style={{ width: 200 }}
                                    name="deliveryAreaDistance"
                                    id="deliveryAreaDistance"
                                    required
                                    maxLength={2}
                                    autoComplete="new-password"
                                    value={deliveryAreaDistance}
                                    onChange={(text) => setDeliveryAreaDistance(text)}
                                />
                            </div>
                            
                            {/* Frete 2 */}
                            <div className="notifications-input-group">
                                <label className="notifications-label" htmlFor="shippingTax2Settings">
                                    Valor do Frete 2
                                </label>
                                <TextInputMask
                                    kind={"money"}
                                    className="notifications-input"
                                    style={{ width: 200 }}
                                    name="shippingTax2Settings"
                                    id="shippingTax2Settings"
                                    required
                                    autoComplete="new-password"
                                    value={shippingTax2Settings}
                                    onChange={(text) => setShippingTax2Settings(text)}
                                />
                            </div>
                            {/* Distancia 2 */}
                            <div className="notifications-input-group">
                                <label className="notifications-label" htmlFor="deliveryAreaDistance2">
                                    Área para frete 2 reduzido
                                </label>
                                <TextInputMask
                                    kind={"only-numbers"}
                                    className="notifications-input"
                                    style={{ width: 200 }}
                                    name="deliveryAreaDistance2"
                                    id="deliveryAreaDistance2"
                                    required
                                    maxLength={2}
                                    autoComplete="new-password"
                                    value={deliveryAreaDistance2}
                                    onChange={(text) => setDeliveryAreaDistance2(text)}
                                />
                            </div>
                        </div>

                        {/* urlDeliveryMap */}
                        <div className="notifications-input-group">
                            <label className="notifications-label" htmlFor="urlDeliveryMap">
                                URL do mapa de Area de Atendimento
                            </label>
                            <input
                                className="notifications-input"
                                name="urlDeliveryMap"
                                id="urlDeliveryMap"
                                required
                                autoComplete="new-password"
                                value={urlDeliveryMap}
                                onChange={(e) => setUrlDeliveryMap(e.target.value)}
                            />
                        </div>

                        {/* urlGooglePlay */}
                        <div className="notifications-input-group">
                            <label className="notifications-label" htmlFor="urlGooglePlay">
                                URL do App no Google Play
                            </label>
                            <input
                                className="notifications-input"
                                name="urlGooglePlay"
                                id="urlGooglePlay"
                                required
                                autoComplete="new-password"
                                value={urlGooglePlay}
                                onChange={(e) => setUrlGooglePlay(e.target.value)}
                            />
                        </div>

                        {/* webBannerSettings */}
                        <div style={{ display: "flex", flexDirection: "row" }}>

                            {/* webBannerSettings */}
                            <div style={{ marginTop: 40, maxWidth: 1000 }}>
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
                                />
                                
                                <div className="settings-app-banner-container">
                                    <img
                                        src={webBannerPreview}
                                        // style={{ width: 460, borderRadius: 10 }}
                                        style={{ width: "100%", borderRadius: 10, paddingLeft: 20, paddingRight: 20 }}
                                        alt="selecionar imagem"
                                    />
                                </div>
                            </div>

                        </div>

                        {/* appLogoPSettings */}
                        <div style={{ display: "flex", flexDirection: "row" }}>

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

                        </div>

                        {/* appBannerSettings */}
                        <div style={{ display: "flex", flexDirection: "row" }}>

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


                            {/* appBanner2Settings */}
                            <div style={{ marginTop: 40, marginRight: 80, width: "10%", minWidth: 260 }}>
                                <label
                                    className="product-form-label-select-img"
                                    htmlFor="appBanner2Settings"
                                >
                                    Selecionar Imagem para o Baner do App
                                </label>
                                <input className="input-file-invisible"
                                    style={{ display: "none" }}
                                    type="file"
                                    name="appBanner2Settings"
                                    id="appBanner2Settings"
                                    onChange={appBanner2HandleFileInputChange}
                                    value={appBanner2FileInputState}
                                >
                                </input>
                                <div className="settings-app-banner-container">
                                    <img
                                        src={appBanner2Preview}
                                        style={{ width: 200, borderRadius: 10 }}
                                        alt="selecionar imagem"
                                    />
                                </div>
                            </div>


                            {/* appBanner3Settings */}
                            <div style={{ marginTop: 40, marginRight: 80, width: "10%", minWidth: 260 }}>
                                <label
                                    className="product-form-label-select-img"
                                    htmlFor="appBanner3Settings"
                                >
                                    Selecionar Imagem para o Baner do App
                                </label>
                                <input className="input-file-invisible"
                                    style={{ display: "none" }}
                                    type="file"
                                    name="appBanner3Settings"
                                    id="appBanner3Settings"
                                    onChange={appBanner3HandleFileInputChange}
                                    value={appBanner3FileInputState}
                                >
                                </input>
                                <div className="settings-app-banner-container">
                                    <img
                                        src={appBanner3Preview}
                                        style={{ width: 200, borderRadius: 10 }}
                                        alt="selecionar imagem"
                                    />
                                </div>
                            </div>

                        </div>

                    </>
                )}

            </div>
        </div>
    );
};

export default Settings;
