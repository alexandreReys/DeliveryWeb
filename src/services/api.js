import axios from "axios";
import * as utils from "../utils";
import * as loginService from "./loginService";
import * as envJson from "../.env.json";
import * as settings from "../.settings.json";

let mysqlBaseUrl;


console.log("============================================================");
console.log("   " + process.env.NODE_ENV);


if (process.env.NODE_ENV === "develop___ment") {
    mysqlBaseUrl = envJson.dev.REACT_APP_BASE_URL;
} else {
    if (!!process.env.REACT_APP_BASE_URL) {
        mysqlBaseUrl = process.env.REACT_APP_BASE_URL;
    } else {
        mysqlBaseUrl = utils.clientSettings(settings.client, envJson);
    };
};

console.log("============================================================");
console.log("   " + settings.client);
console.log("============================================================");
console.log("mysqlBaseUrl", mysqlBaseUrl);
console.log("============================================================");

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
