import { api } from "./api";

export const del = async (publicId) => {
    const params = { params: { publicId } };
    const headers = { headers: { "content-type": "application/json" } };
    try {
        var response = await api.delete("/images", params, headers);
    } catch (error) {
        return console.error("error => api.deleteImage", error);
    }
    return response.data;
};

export const post = async (base64Image) => {
    const body = { data: base64Image };
    const headers = { headers: { "content-type": "application/json" } };
    try {
        var response = await api.post("/images", body, headers);
    } catch (error) {
        return console.log("error => api.postImage", error);
    }
    return response.data;
};
