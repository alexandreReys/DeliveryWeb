import { api } from "./api";
import store from "store";
import { actionVinhoGetProducts } from "store/actions";

export const getProducts = async () => {
  const resp = await api.get("/products");
  const products = resp.data;
  store.dispatch(actionVinhoGetProducts(products));
  return products;
};

export const getProductsGroupedByCategory = async () => {
  let resp = [];
  await api
    .get("/products/category/grouped")
    .then((response) => {
      resp = response;
    })
    .catch((error) => console.log(error));

  const products = resp.data;
  const categs = Object.keys(products);
  let response = [];
  categs.map((categ) => {
    return response.push({ category: categ, products: products[categ] });
  });
  return response;
};

export const getProductsByCategory = async (category) => {
  const params = { params: { Category: category } };

  return await api
    .get("/products/category", params)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
};

export const getProductsPorNome = async (nome) => {
  const params = { params: { DescricaoVinho: nome } };
  const resp = await api.get("/products/name", params);
  return resp.data;
};

export const postVinho = async (data) => {
  const insertData = await processImage(data);
  let resp;
  try {
    resp = await api.post("/products", insertData);
  } catch (error) {
    console.error("ErrorMessage: ", error);
    return null;
  }

  return resp.data;
};

export const postVinhoImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  const resp = await api.post("/products/image", formData, config);
  return resp.data;
};

export const putVinho = async (data) => {
  const updateData = await processImage(data);
  try {
    var response = await api.put("/products", updateData);
  } catch (error) {
    console.error("ErrorMessage: ", error);
    return null;
  }

  return response.data;
};

export const deleteVinho = async (itemId) => {
  const params = { params: { IdVinho: itemId } };
  const resp = await api.delete("/products", params);
  return resp.data;
};

const processImage = async (data) => {
  let idImg1 = data.ImagemFile1Vinho;

  if (idImg1) {
    let res = await postVinhoImage(idImg1);
    idImg1 = res.id;
  } else {
    idImg1 = data.Imagem1Vinho;
  }

  const response = {
    DescricaoVinho: data.DescricaoVinho,
    PrecoVinho: data.PrecoVinho,
    TipoVinho: data.TipoVinho,
    ClassificacaoVinho: data.ClassificacaoVinho,
    PaisVinho: data.PaisVinho,
    GarrafaVinho: data.GarrafaVinho,
    ComentarioVinho: data.ComentarioVinho,
    CodigoErpVinho: data.CodigoErpVinho,
    Imagem1Vinho: idImg1,
    Imagem2Vinho: null,
    Imagem3Vinho: null,
    IdVinho: data.IdVinho,
  };

  return response;
};
