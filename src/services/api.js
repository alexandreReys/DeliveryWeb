import axios from "axios";
import store from "store";
import * as envJson from "../.env.json";
import * as settings from "../.settings.json";
import * as actions from "../store/actions";
import * as utils from "../utils";
import * as loginService from "./loginService";

let mysqlBaseUrl;
let appTitle;

console.log("=====================");
console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === "development") {
    mysqlBaseUrl = envJson.dev.REACT_APP_BASE_URL;
    appTitle = envJson.dev.REACT_APP_TITLE;
} else {
    if (!!process.env.REACT_APP_BASE_URL) {
        mysqlBaseUrl = process.env.REACT_APP_BASE_URL;
        appTitle = process.env.REACT_APP_TITLE;
    } else {
        const resp = utils.clientSettings(settings.client, envJson);
        mysqlBaseUrl = resp.mysqlBaseUrl;
        appTitle     = resp.appTitle;
    };
};

store.dispatch(actions.actionSetTitle(appTitle));

console.log("client:", settings.client);
console.log("appTitle:", appTitle);
console.log("mysqlBaseUrl:", mysqlBaseUrl);
console.log("=====================");

export const api = axios.create({
    baseURL: mysqlBaseUrl,
});

api.interceptors.request.use(async (config) => {
    const token = loginService.getToken();
    if (token) {
        config.headers.authorization = `${token}`;
    }
    return config;
});
