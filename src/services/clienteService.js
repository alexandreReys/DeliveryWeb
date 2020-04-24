import { api } from "./api";

export const getClientes = async () => {
  const resp = await api.get("/clientes");
  return resp.data;
};

export const getClientesPorNome = async (nome) => {
  const params = { params: { nomeCliente: nome } };
  const resp = await api.get("/clientes/nome", params);
  return resp.data;
};

export const postCliente = async (data) => {
  const resp = await api.post("/clientes", data);
  return resp.data;
};

export const putCliente = async (data) => {
  const resp = await api.put("/clientes", data);
  return resp.data;
};

export const deleteCliente = async (itemId) => {
  const params = { params: { idCliente: itemId } };
  const resp = await api.delete("/clientes", params);
  return resp.data;
};
