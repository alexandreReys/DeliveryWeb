import * as envJson from "../../.env.json";

const INITIAL_STATE = {
  appTitle:  process.env.NODE_ENV === "development"? envJson.dev.REACT_APP_TITLE: process.env.REACT_APP_TITLE,
  loadingText: "Acessando dados ...",
  errorMsgText: "Verificando ...",
  adminModule: false,

  operationIsEnabledSettings: -1,
  addressSellerSettings: "",
  shippingTaxSettings: 0,
  shippingTax2Settings: 0,
  webBannerSettings: "",
  webBannerPublicIdSettings: "",
  appBannerSettings: "",
  appBannerPublicIdSettings: "",
  appBanner2Settings: "",
  appBanner2PublicIdSettings: "",
  appBanner3Settings: "",
  appBanner3PublicIdSettings: "",
  appLogoPSettings: "",
  appLogoPPublicIdSettings: "",
  deliveryAreaDistance: 0,
  deliveryAreaDistance2: 0,
  urlDeliveryMap: "",
  urlGooglePlay: "",
  contactPhone: "",
  contactEmail: "",
  contactWhatsapp: "",
};

export default function defaultReducer(state = INITIAL_STATE, action) {

  switch (action.type) {
    case "ACTION_ADMIN_MODULE_ACTIVATE":
      return { ...state, adminModule: true };
    case "ACTION_ADMIN_MODULE_DEACTIVATE":
      return { ...state, adminModule: false };
    case "ACTION_GET_SETTINGS":
      return functionGetSettings(state, action);
    case "ACTION_SET_TITLE":
      return functionSetTitle(state, action);
    default:
      return state;
  }
}

const functionGetSettings = (state, { settings }) => {
  return {
    ...state,
    operationIsEnabledSettings: settings.OperationIsEnabledSettings,
    addressSellerSettings: settings.AddressSellerSettings,
    shippingTaxSettings: settings.ShippingTaxSettings,
    shippingTax2Settings: settings.ShippingTax2Settings,
    webBannerSettings: settings.WebBannerSettings,
    webBannerPublicIdSettings: settings.WebBannerPublicIdSettings,
    appBannerSettings: settings.AppBannerSettings,
    appBannerPublicIdSettings: settings.AppBannerPublicIdSettings,
    appBanner2Settings: settings.AppBanner2Settings,
    appBanner2PublicIdSettings: settings.AppBanner2PublicIdSettings,
    appBanner3Settings: settings.AppBanner3Settings,
    appBanner3PublicIdSettings: settings.AppBanner3PublicIdSettings,
    appLogoPSettings: settings.AppLogoPSettings,
    appLogoPPublicIdSettings: settings.AppLogoPPublicIdSettings,
    deliveryAreaDistance: settings.DeliveryAreaDistance,
    deliveryAreaDistance2: settings.DeliveryAreaDistance2,
    urlDeliveryMap: settings.UrlDeliveryMap,
    urlGooglePlay: settings.UrlGooglePlay,
    contactPhone: settings.ContactPhone,
    contactEmail: settings.ContactEmail,
    contactWhatsapp: settings.ContactWhatsapp,
    };
};

const functionSetTitle = (state, { title }) => {

  console.log('defaultReducer/functionSetTitle', title);


  return {
    ...state,
    appTitle: title,
  };
};
