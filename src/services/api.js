import axios from "axios";
import * as loginService from "./loginService";
import * as envJson from "../.env.json";

console.log("============================================================");
console.log("process.env.NODE_ENV ", process.env.NODE_ENV);

let mysqlBaseUrl =
    process.env.NODE_ENV === "development"
        ? envJson.REACT_APP_BASE_URL
        : process.env.REACT_APP_BASE_URL;

// const mysqlBaseUrl = "https://apidavillaadega.herokuapp.com";
// const mysqlBaseUrl = "http://adegaweb-api-com.umbler.net";

console.log("============================================================");
console.log("envJson.REACT_APP_BASE_URL", envJson.REACT_APP_BASE_URL);
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
