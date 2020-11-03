import { api } from "./api";
import store from "../store";
import { actionGetSettings } from "../store/actions";
import * as imageService from "../services/imageService";

export const get = async () => {
    try {
        var resp = await api.get("/delivery-settings");
    } catch (error) {
        console.error("ErrorMessage (settingsServuce.get): ", error);
        return null;
    }
    const settings = resp.data[0];
    store.dispatch(actionGetSettings(settings));
    return settings;
};

export const put = async (data) => {
    const updateData = await processImage(data);
    try {
        var resp = await api.put("/delivery-settings", updateData);
    } catch (error) {
        console.error("ErrorMessage (settingsServuce.put): ", error);
        return null;
    }
    store.dispatch(actionGetSettings(updateData));
    return resp.data;
};

const processImage = async (data) => {
    // if AppBanner updated
    if (data.AppBannerB64 !== data.AppBannerSettings) {
        
        // delete image
        if (data.AppBannerPublicIdSettings) {
            try {
                await imageService.del(data.AppBannerPublicIdSettings);
            } catch (error) {
                console.error("Error => processImage/deleteImage", error);
            }
        };

        // post image
        if (data.AppBannerB64) {
            try {
                const imageUploadResponse = await imageService.post(data.AppBannerB64);
                data.AppBannerSettings = imageUploadResponse.url;
                data.AppBannerPublicIdSettings = imageUploadResponse.public_id;
            } catch (error) {
                console.log("Error => processImage/postImage", error);
            }
        };
    };

    // if WebBanner updated
    if (data.WebBannerB64 !== data.WebBannerSettings) {
        
        // delete image
        if (data.WebBannerPublicIdSettings) {
            try {
                await imageService.del(data.WebBannerPublicIdSettings);
            } catch (error) {
                console.error("Error => processImage/deleteImage", error);
            }
        };

        // post image
        if (data.WebBannerB64) {
            try {
                const imageUploadResponse = await imageService.post(data.WebBannerB64);
                data.WebBannerSettings = imageUploadResponse.url;
                data.WebBannerPublicIdSettings = imageUploadResponse.public_id;
            } catch (error) {
                console.log("Error => processImage/postImage", error);
            }
        };
    };

    return {
        IdSettings: data.IdSettings,
        AddressSellerSettings: data.AddressSellerSettings,
        ShippingTaxSettings: data.ShippingTaxSettings,
        AppBannerSettings: data.AppBannerSettings,
        AppBannerPublicIdSettings: data.AppBannerPublicIdSettings,
        WebBannerSettings: data.WebBannerSettings,
        WebBannerPublicIdSettings: data.WebBannerPublicIdSettings,
    };
};
