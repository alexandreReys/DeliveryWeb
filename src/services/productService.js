import { api } from "./api";
import store from "store";
import { actionVinhoGetProducts } from "store/actions";
import * as imageService from "../services/imageService";

export const postVinho = async (data) => {
  const insertData = await processImage(data);
  try {
    var resp = await api.post("/products", insertData);
  } catch (error) {
    return console.error("ErrorMessage (postVinho): ", error);
  }
  return resp.data;
};

const processImage = async (data) => {
  if (data.base64EncodedImage !== data.Imagem1Vinho) {
    if (data.Imagem1IdVinho) {
      try {
        await imageService.del(data.Imagem1IdVinho);
      } catch (error) {
        console.log("Error Message (processImage/delete)", error);
      }
    };

    if (data.base64EncodedImage) {
      try {
        const imageUploadResponse = await imageService.post(data.base64EncodedImage);
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
    IdProductVariation: data.IdProductVariation,
    QuantityProductVariation: data.QuantityProductVariation,
    DescriptionProductVariation: data.DescriptionProductVariation,
    PriceProductVariation: data.PriceProductVariation,
  };
  return response;
};

export const getProducts = async ( id = null ) => {
  let products = [];
  if ( !id ) {
    const resp = await api.get("/products");
    products = resp.data;
  }
  return products;
};

export const getProductsGroupedByCategory = async () => {
  let resp = [];
  await api
    .get("/products/category/grouped/selected")
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
  };

  store.dispatch(actionVinhoGetProducts(response));
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

export const getProductsByName = async (nome) => {
  const params = { params: { DescricaoVinho: nome } };
  const resp = await api.get("/products/name", params);
  return resp.data;
};

export const deleteVinho = async (itemId) => {
  const params = { params: { IdVinho: itemId } };
  const resp = await api.delete("/products", params);
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
    var response = await api.put("/products/deactivate", updateData);
  } catch (error) {
    return console.error("ErrorMessage (product-deactivate): ", error);
  }
  return response.data;
};

export const setPromotion = async (updateData) => {
  try {
    var response = await api.put("/products/promotion", updateData);
  } catch (error) {
    return console.error("ErrorMessage (product-promotion): ", error);
  }
  return response.data;
};

export const setPromotionalPrice = async (updateData) => {
  try {
    var response = await api.put("/products/promotional-price", updateData);
  } catch (error) {
    return console.error("ErrorMessage (product-promotional-price): ", error);
  }
  return response.data;
};

