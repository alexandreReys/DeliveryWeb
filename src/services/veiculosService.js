import { api } from "./api";

export const getVeiculos = async () => {
  const resp = await api.get("/veiculos");
  return resp.data;
};

export const getVeiculosPorDescricao = async (descricao) => {
  const params = { params: { descricaoVeiculo: descricao } };
  const resp = await api.get("/veiculos/descricao", params);
  return resp.data;
};

export const postVeiculo = async (data) => {
  const resp = await api.post("/veiculos", data);
  return resp.data;
};

export const putVeiculo = async (data) => {
  const resp = await api.put("/veiculos", data);
  return resp.data;
};

export const deleteVeiculo = async (itemId) => {
  const params = { params: { idVeiculo: itemId } };
  const resp = await api.delete("/veiculos", params);
  return resp.data;
};
