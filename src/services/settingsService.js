import { api } from "./api";
import store from "../store";
import { actionGetSettings } from "../store/actions";
import * as imageService from "../services/imageService";

export const get = async () => {
    try {
        var resp = await api.get("/delivery-settings");
    } catch (error) {
        console.error("ErrorMessage (settingsService.get): ", error);
        return null;
    }
    const settings = resp.data[0];
    store.dispatch( actionGetSettings(settings) );
    return settings;
};

export const put = async (data) => {
    const updateData = await processImage(data);

    try {
        var resp = await api.put("/delivery-settings", updateData);
    } catch (error) {
        console.error("ErrorMessage (settingsService.put): ", error);
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

    // if AppBanner2 updated
    if (data.AppBanner2B64 !== data.AppBanner2Settings) {
        
        // delete image
        if (data.AppBanner2PublicIdSettings) {
            try {
                await imageService.del(data.AppBanner2PublicIdSettings);
            } catch (error) {
                console.error("Error => processImage/deleteImage", error);
            }
        };

        // post image
        if (data.AppBanner2B64) {
            try {
                const imageUploadResponse = await imageService.post(data.AppBanner2B64);
                data.AppBanner2Settings = imageUploadResponse.url;
                data.AppBanner2PublicIdSettings = imageUploadResponse.public_id;
            } catch (error) {
                console.log("Error => processImage/postImage", error);
            }
        };
    };

    // if AppBanner3 updated
    if (data.AppBanner3B64 !== data.AppBanner3Settings) {
        
        // delete image
        if (data.AppBanner3PublicIdSettings) {
            try {
                await imageService.del(data.AppBanner3PublicIdSettings);
            } catch (error) {
                console.error("Error => processImage/deleteImage", error);
            }
        };

        // post image
        if (data.AppBanner3B64) {
            try {
                const imageUploadResponse = await imageService.post(data.AppBanner3B64);
                data.AppBanner3Settings = imageUploadResponse.url;
                data.AppBanner3PublicIdSettings = imageUploadResponse.public_id;
            } catch (error) {
                console.log("Error => processImage/postImage", error);
            }
        };
    };

    // if AppLogo updated
    if (data.AppLogoPB64 !== data.AppLogoPSettings) {
        
        // delete image
        if (data.AppLogoPPublicIdSettings) {
            try {
                await imageService.del(data.AppLogoPPublicIdSettings);
            } catch (error) {
                console.error("Error => processImage/deleteImage", error);
            }
        };

        // post image
        if (data.AppLogoPB64) {
            try {
                const imageUploadResponse = await imageService.post(data.AppLogoPB64);
                data.AppLogoPSettings = imageUploadResponse.url;
                data.AppLogoPPublicIdSettings = imageUploadResponse.public_id;
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
        DeliveryAreaDistance: data.DeliveryAreaDistance,
        UrlDeliveryMap: data.UrlDeliveryMap,
        UrlGooglePlay: data.UrlGooglePlay,
        ContactPhone: data.ContactPhone,
        ContactEmail: data.ContactEmail,
        ContactWhatsapp: data.ContactWhatsapp,
        AppBannerSettings: data.AppBannerSettings,
        AppBannerPublicIdSettings: data.AppBannerPublicIdSettings,
        AppLogoPSettings: data.AppLogoPSettings,
        AppLogoPPublicIdSettings: data.AppLogoPPublicIdSettings,
        WebBannerSettings: data.WebBannerSettings,
        WebBannerPublicIdSettings: data.WebBannerPublicIdSettings,
        AppBanner2Settings: data.AppBanner2Settings,
        AppBanner2PublicIdSettings: data.AppBanner2PublicIdSettings, 
        AppBanner3Settings: data.AppBanner3Settings,
        AppBanner3PublicIdSettings: data.AppBanner3PublicIdSettings,
    };
};
