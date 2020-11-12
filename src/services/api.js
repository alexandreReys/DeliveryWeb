import axios from "axios";
import * as loginService from "./loginService";
import * as envJson from "../.env.json";

const mysqlBaseUrl =
    process.env.NODE_ENV === "development"
        ? envJson.REACT_APP_BASE_URL
        : process.env.REACT_APP_BASE_URL;


// const mysqlBaseUrl =
//     process.env.REACT_APP_BASE_URL || "https://motoguardian-api.herokuapp.com";

export const api = axios.create({
    baseURL: mysqlBaseUrl,
});

console.log("envJson.REACT_APP_BASE_URL", envJson.REACT_APP_BASE_URL);
console.log("process.env.NODE_ENV ", process.env.NODE_ENV);
console.log("process.env.REACT_APP_BASE_URL", process.env.REACT_APP_BASE_URL);
console.log("mysqlBaseUrl", mysqlBaseUrl);

api.interceptors.request.use(async (config) => {
    const token = loginService.getToken();
    if (token) {
        config.headers.authorization = `${token}`;
    }
    return config;
});
