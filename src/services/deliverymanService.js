import { api } from "./api";
import store from "store";
import { actionDeliverymanGet } from "store/actions";

const APIRoute = "/deliveryman";

export const get = async () => {
  const { data } = await api.get(APIRoute);
  store.dispatch(actionDeliverymanGet(data));
  return data;
};

export const getByName = async (name) => {
  const params = { params: { name } };
  const resp = await api.get(APIRoute + "/name", params);
  return resp.data;
};

export const deleteById = async (Id) => {
  const params = { params: { Id } };
  const resp = await api.delete(APIRoute, params);
  return resp.data;
};

export const post = async (data) => {
  try {
    var resp = await api.post(APIRoute, data);
  } catch (error) {
    return console.error("ErrorMessage (post): ", error);
  }
  return resp.data;
};

export const put = async (data) => {
  try {
    var response = await api.put(APIRoute, data);
  } catch (error) {
    return console.error("ErrorMessage (put): ", error);
  }
  return response.data;
};
