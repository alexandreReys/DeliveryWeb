import axios from "axios";
import * as loginService from "./loginService";
import * as envJson from "../.env.json";

console.log("============================================================");
console.log("process.env.NODE_ENV ", process.env.NODE_ENV);

let mysqlBaseUrl =
    process.env.NODE_ENV === "development"
        ? envJson.REACT_APP_BASE_URL
        : process.env.REACT_APP_BASE_URL;

if (!mysqlBaseUrl) {
    mysqlBaseUrl = "https://adegaweb-api-com.umbler.net";
    // mysqlBaseUrl = "https://apidavillaadega.herokuapp.com";
};

console.log("============================================================");
console.log("process.env.REACT_APP_TITLE", process.env.REACT_APP_TITLE);
console.log("============================================================");
console.log("process.env.REACT_APP_BASE_URL", process.env.REACT_APP_BASE_URL);

export const api = axios.create({
    baseURL: mysqlBaseUrl,
});

console.log("============================================================");
console.log("mysqlBaseUrl", mysqlBaseUrl);
console.log("============================================================");

api.interceptors.request.use(async (config) => {
    const token = loginService.getToken();
    if (token) {
        config.headers.authorization = `${token}`;
    }
    return config;
});
