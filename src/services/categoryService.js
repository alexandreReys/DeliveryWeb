import { api } from "./api";
import store from "store";
import { actionCategoryGet } from "store/actions";

const APIRoute = "/category";

export const get = async () => {
    const { data } = await api.get(APIRoute);
    store.dispatch(actionCategoryGet(data));
    return data;
};

export const getByDescription = async (description) => {
    const params = { params: { DescriptionCategory: description } };
    const { data } = await api.get(APIRoute + "/description", params);
    return data;
};

export const deleteById = async (IdCategory) => {
    const params = { params: { IdCategory } };
    const { data } = await api.delete(APIRoute, params);
    return data;
};

export const post = async (data) => {
    try {
        var response = await api.post(APIRoute, data);
    } catch (error) {
        return console.error("ErrorMessage (post): ", error);
    }
    return response.data;
};

export const put = async (data) => {
    try {
        var response = await api.put(APIRoute, data);
    } catch (error) {
        return console.error("ErrorMessage (put): ", error);
    }
    return response.data;
};
