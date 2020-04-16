import { api } from "./api";

export const getOficinas = async () => {
  const resp = await api.get("/oficinas");
  return resp.data;
};

export const getOficinasPorFantasia = async (fantasia) => {
  const params = { params: { fantasiaOficina: fantasia } };
  const resp = await api.get("/oficinas/fantasia", params);
  return resp.data;
};

export const postOficina = async (data) => {
  const resp = await api.post("/oficinas", data);
  return resp.data;
};

export const putOficina = async (data) => {
  const resp = await api.put("/oficinas", data);
  return resp.data;
};

export const deleteOficina = async (itemId) => {
  const params = { params: { idOficina: itemId } };
  const resp = await api.delete("/oficinas", params);
  return resp.data;
};
