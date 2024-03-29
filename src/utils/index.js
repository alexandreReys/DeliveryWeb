import Sweetalert2 from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import * as masks from "./masks";


const Swal = withReactContent(Sweetalert2);

export const filterStringSize = (size, desc) => {
    if (!desc.trim()) return "Clique para digitar endereço";
    if (desc.length < 25) return desc;
    return `${desc.substring(0, size)}...`
};

export const adjustPromotionalPrice = (list) => {
    list = { ...list, PrecoAnterVinho: list.PrecoVinho };
    if (list.EmPromocaoVinho) list.PrecoVinho = list.PrecoPromocionalVinho;
    return list;
};

export const getPrice = (product) => {
    let precoVinho, precoAnterVinho;

    if (
        !!product.DescriptionProductVariation && 
        product.QuantityProductVariation > 0 &&
        product.PriceProductVariation > 0
    ) {

        precoVinho = masks.moneyMask(product.PriceProductVariation);
        precoAnterVinho = masks.moneyMask(product.PriceProductVariation);

    } else {
        if (!product.EmPromocaoVinho || !product.PrecoPromocionalVinho) {

            precoVinho = masks.moneyMask(product.PrecoVinho);
            precoAnterVinho = masks.moneyMask(product.PrecoVinho);

        } else {

            if (product.EmPromocaoVinho && product.PrecoVinho >= 100) {
                // precoVinho = masks.numberMask(product.PrecoVinho)
                precoVinho = masks.moneyMask(product.PrecoVinho)
            } else {
                precoVinho = masks.moneyMask(product.PrecoVinho)
            };
        
            if (product.EmPromocaoVinho && product.PrecoPromocionalVinho >= 100) {
                precoAnterVinho = masks.moneyMaskSpaceless(product.PrecoAnterVinho)
            } else {
                precoAnterVinho = masks.moneyMask(product.PrecoAnterVinho)
            };

        };
    };
    
    return { precoVinho, precoAnterVinho };
};

export function processingWait(seconds) {
    return new Promise((resolve) => {
        Swal.fire({
            icon: "info",
            title: "Processando, aguarde ...",
            position: "top-end",
            background: "#lime",
            showConfirmButton: false,
            timer: seconds * 1000,
            timerProgressBar: true,
        })
        .then(() => {
            resolve();
        });
    });
};

export function message(title, seconds) {
    return new Promise((resolve) => {
        Swal.fire({
            icon: "info",
            title: title,
            position: "top-end",
            background: "#lime",
            showConfirmButton: false,
            timer: seconds * 1000,
            timerProgressBar: true,
            showCancelButton: true,
            showCloseButton: true,
        })
        .then(() => {
            resolve();
        });
    });
};

export const requestPromotionalPrice = () => {
    const inputValue = 0;

    Swal.fire({
        title: 'Enter your IP address',
        input: 'number',
        inputLabel: 'Preço Promocional',
        inputValue: inputValue,
        showCancelButton: true,
        inputValidator: (value) => {
            if (!value) {
                return 'You need to write something!'
            }
        }
    })
};

export const estadosList = [
    { estado: "AC", estadoNome: "Acre" },
    { estado: "AL", estadoNome: "Alagoas" },
    { estado: "AP", estadoNome: "Amapá" },
    { estado: "AM", estadoNome: "Amazonas" },
    { estado: "BA", estadoNome: "Bahia" },
    { estado: "CE", estadoNome: "Ceará" },
    { estado: "DF", estadoNome: "Brasilia" },
    { estado: "ES", estadoNome: "Espirito Santo" },
    { estado: "GO", estadoNome: "Goias" },
    { estado: "MA", estadoNome: "Maranhão" },
    { estado: "MT", estadoNome: "Mato Grosso" },
    { estado: "MS", estadoNome: "Mato Grosso do Sul" },
    { estado: "MG", estadoNome: "Minas Gerais" },
    { estado: "PA", estadoNome: "Pará" },
    { estado: "PB", estadoNome: "Paraiba" },
    { estado: "PR", estadoNome: "Parana" },
    { estado: "PE", estadoNome: "Pernambuco" },
    { estado: "PI", estadoNome: "Piaui" },
    { estado: "RJ", estadoNome: "Rio de Janeiro" },
    { estado: "RN", estadoNome: "Rio Grande do Norte" },
    { estado: "RS", estadoNome: "Rio Grande do Sul" },
    { estado: "RO", estadoNome: "Rondonia" },
    { estado: "RR", estadoNome: "Roraima" },
    { estado: "SC", estadoNome: "Santa Catarina" },
    { estado: "SP", estadoNome: "São Paulo" },
    { estado: "SE", estadoNome: "Sergipe" },
    { estado: "TO", estadoNome: "Tocantins" },
];

export const MoneyMaskedToStringUnmasked = (paramValor) => {
    if (typeof paramValor === "number") {
        return paramValor;
    }

    if (paramValor.indexOf("R$") === -1) {
        return paramValor;
    }

    let result = paramValor.replace("R$", "");
    result = result.replace(".", "");
    result = result.replace(".", "");
    result = result.replace(",", ".");

    return result;
};

// dd/mm/yyyy
export const formattedDate = (date) => {
    const d = date.toString().substring(0, 10);
    return d.substr(8, 2) + "/" + d.substr(5, 2) + "/" + d.substr(0, 4);
};

// dd/mm/yyyy 00:00
export const formattedDateTime = (date, time) => {
    const d = date.toString().substring(0, 10);
    const t = time.toString().substring(0, 5);
    return d.substr(8, 2) + "/" + d.substr(5, 2) + "/" + d.substr(0, 4) + " " + t;
};

// Data : dd/mm/yyyy  -  Horário : 00:00
export const formattedDateTime2 = (date, time) => {
    const d = date.toString().substring(0, 10);
    const t = time.toString().substring(0, 5);

    const dateStr = d.substr(8, 2) + "/" + d.substr(5, 2) + "/" + d.substr(0, 4);
    const timeStr = t;

    return `Data : ${dateStr}  -  Horário : ${timeStr}`;
};

// dd/mm/yyyy as 00:00
export const formattedDateTime3 = (date, time) => {
    const d = date.toString().substring(0, 10);
    const t = time.toString().substring(0, 5);
    return (
        d.substr(8, 2) +
        "/" +
        d.substr(5, 2) +
        "/" +
        d.substr(0, 4) +
        " as " +
        t +
        "hs"
    );
};

// dd/mm/yyyy
export const formatttedToday = () => {
    const today = new Date();

    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    return dd + "/" + mm + "/" + yyyy;
};

// 00:00
export const formatttedCurrentTime = () => {
    const now = new Date();

    let hh = now.getHours();
    let mm = now.getMinutes() + 1;

    if (hh < 10) hh = "0" + hh;
    if (mm < 10) mm = "0" + mm;

    return hh + ":" + mm;
};

export const firstWord = (phrase) => {
    if (!phrase) return "";

    const arrWords = phrase.split(" ");
    if (arrWords) return arrWords[0];
    return phrase;
};

export const firstUpper = (string, separator = ' ') => {
    return string
      .split(separator)
      .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
      .join(separator);
};

export const clientSettings = (id, envJson) => {

    let mysqlBaseUrl;
    let appTitle;

    if (id === "adegaweb") {
        mysqlBaseUrl = envJson.default.adegaweb.REACT_APP_BASE_URL;
        appTitle     = envJson.default.adegaweb.REACT_APP_TITLE;
    };
    if (id === "davillaadegaliveiro") {
        mysqlBaseUrl = envJson.default.davillaadegaliveiro.REACT_APP_BASE_URL;
        appTitle     = envJson.default.davillaadegaliveiro.REACT_APP_TITLE;
    };
    if (id === "davillaadegajordanopolis") {
        mysqlBaseUrl = envJson.default.davillaadegajordanopolis.REACT_APP_BASE_URL;
        appTitle     = envJson.default.davillaadegajordanopolis.REACT_APP_TITLE;
    };
    if (id === "davillaadega") {
        mysqlBaseUrl = envJson.default.davillaadega.REACT_APP_BASE_URL;
        appTitle     = envJson.default.davillaadega.REACT_APP_TITLE;
    };
    if (id === "deliveryweb") {
        mysqlBaseUrl = envJson.default.deliveryweb.REACT_APP_BASE_URL;
        appTitle     = envJson.default.deliveryweb.REACT_APP_TITLE;
    };
    if (id === "barbaros") {
        mysqlBaseUrl = envJson.default.barbaros.REACT_APP_BASE_URL;
        appTitle     = envJson.default.barbaros.REACT_APP_TITLE;
    };

    return { mysqlBaseUrl, appTitle };
};

export const getShortAddress = (addr) => {
    let address = "";

    address += !addr.street ? "" : addr.street;
    address += !addr.number ? "" : ", " + addr.number;
    address += !addr.neighborhood ? "" : " " + addr.neighborhood;
    address += !addr.city ? "" : " " + addr.city;
    address += !addr.state ? "" : " " + addr.state;
    address += !addr.postalCode ? "" : " " + addr.postalCode;

    return address;
};
