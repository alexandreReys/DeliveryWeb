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

  let response = [];
  const products = resp.data;
  if (products) {
    const categs = Object.keys(products);
    categs.map((categ) => {
      return response.push({ category: categ, products: products[categ] });
    });
  }
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

export const getActiveProductsByCategory = async (category) => {
  const params = { params: { Category: category } };

  return await api
    .get("/products/category/actives", params)
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

export const deleteVinho = async (itemId) => {
  const params = { params: { IdVinho: itemId } };
  const resp = await api.delete("/products", params);
  return resp.data;
};

export const postVinho = async (data) => {
  const insertData = await processImage(data);
  try {
    var resp = await api.post("/products", insertData);
  } catch (error) {
    return console.error("ErrorMessage (postVinho): ", error);
  }
  return resp.data;
};

export const putVinho = async (data) => {
  const updateData = await processImage(data);
  try {
    var response = await api.put("/products", updateData);
  } catch (error) {
    return console.error("ErrorMessage (putVinho): ", error);
  }
  return response.data;
};

export const deactivate = async (updateData) => {
  try {
    console.log("deactivate-updateData",updateData);
    var response = await api.put("/products/deactivate", updateData);
  } catch (error) {
    return console.error("ErrorMessage (product-deactivate): ", error);
  }
  return response.data;
};

const processImage = async (data) => {
  // console.log("pré Imagem1IdVinho", data.Imagem1IdVinho);
  // console.log("pré base64EncodedImage", data.base64EncodedImage);

  if (data.base64EncodedImage !== data.Imagem1Vinho) {
    if (data.Imagem1IdVinho) {
      try {
        await deleteProductImage(data.Imagem1IdVinho);
      } catch (error) {
        console.log("Error Message (processImage/delete)", error);
      }
    };

    if (data.base64EncodedImage) {
      try {
        const imageUploadResponse = await postProductImage(data.base64EncodedImage);
        data.Imagem1Vinho = imageUploadResponse.url;
        data.Imagem1IdVinho = imageUploadResponse.public_id;
      } catch (error) {
        console.log("Error Message (processImage/post)", error);
      }
    };
  };
  
  const response = {
    DescricaoVinho: data.DescricaoVinho,
    PrecoVinho: data.PrecoVinho,
    TipoVinho: data.TipoVinho,
    ClassificacaoVinho: data.ClassificacaoVinho,
    PaisVinho: data.PaisVinho,
    GarrafaVinho: data.GarrafaVinho,
    ComentarioVinho: data.ComentarioVinho,
    CodigoErpVinho: data.CodigoErpVinho,
    Imagem1Vinho: data.Imagem1Vinho,
    Imagem1IdVinho: data.Imagem1IdVinho,
    Imagem2Vinho: null,
    Imagem3Vinho: null,
    IdVinho: data.IdVinho,
  };
  return response;
};

export const postProductImage = async (base64EncodedImage) => {
  const body = { data: base64EncodedImage };
  const headers = { headers: { "content-type": "application/json" } };
  try {
    var response = await api.post("/products/img", body, headers);
  } catch (error) {
    return console.log("postProductImage", error);
  }
  return response.data;
};

export const deleteProductImage = async (publicId) => {
  const params = { params: { Imagem1IdVinho: publicId } };
  const headers = { headers: { "content-type": "application/json" } };
  try {
    var response = await api.delete("/products/img", params, headers);
  } catch (error) {
    return console.log("deleteProductImage", error);
  }
  return response.data;
};
