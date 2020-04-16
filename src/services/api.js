import axios from "axios";
import { getToken } from "./auth";

const environment = process.env.REACT_APP_ENV;

let mysqlBaseUrl;
if (environment === "development") {
  mysqlBaseUrl = process.env.REACT_APP_DEV_BASE_URL || "http://localhost:3000";
}

if (environment === "production") {
  mysqlBaseUrl = process.env.REACT_APP_PROD_BASE_URL;
}

export const api = axios.create({
  baseURL: mysqlBaseUrl,
});

api.interceptors.request.use(async (config) => {
  const token = getToken();
  if (token) {
    config.headers.authorization = `${token}`;
  }
  return config;
});
