import * as envJson from "../../.env.json";

const INITIAL_STATE = {
  appTitle:  process.env.NODE_ENV === "development"? envJson.REACT_APP_TITLE: process.env.REACT_APP_TITLE,
  loadingText: "Acessando dados ...",
  errorMsgText: "Verificando ...",
  adminModule: false,
  addressSellerSettings: "",
  shippingTaxSettings: 0,
  webBannerSettings: "",
  webBannerPublicIdSettings: "",
};

export default function defaultReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "ACTION_ADMIN_MODULE_ACTIVATE":
      return { ...state, adminModule: true };
    case "ACTION_ADMIN_MODULE_DEACTIVATE":
      return { ...state, adminModule: false };
    case "ACTION_GET_SETTINGS":
      return functionGetSettings(state, action);
    default:
      return state;
  }
}

const functionGetSettings = (state, { settings }) => {
  return {
    ...state,
    addressSellerSettings: settings.AddressSellerSettings,
    shippingTaxSettings: settings.ShippingTaxSettings,
    webBannerSettings: settings.WebBannerSettings,
    webBannerPublicIdSettings: settings.WebBannerPublicIdSettings,
  };
};
