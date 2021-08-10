//import { MaskService } from "react-masked-text";

function cpfMask(value) {
    if (value) {
        return value
            .replace(/\D/g, "")                     //        tira todos(/g) os não numericos(\D)
            .replace(/(\d{3})(\d)/, "$1.$2")        // 097.   pega os 3{3} numericos(\d) e o proximo (\d) numerico e poe um '.' entre eles
            .replace(/(\d{3})(\d)/, "$1.$2")        // 074.   pega os 3{3} numericos(\d) e o proximo (\d) numerico e poe um '.' entre eles
            .replace(/(\d{3})(\d{1,2})/, "$1-$2")   // 278-   pega os 3{3} numericos(\d) e os 2 proximos{}numericos(\d) e poe um '-' entre eles
            .replace(/(-\d{2})\d+?$/, "$1");        // 92     pega os 2{2} numericos(\d) apos o - e encerra com pelo menos um unmerico ?????
    }
}

function cnpjMask(value) {
    if (value) {
        return value
            .replace(/\D/g, "")
            .replace(/(\d{2})(\d)/, "$1.$2")    // 04.
            .replace(/(\d{3})(\d)/, "$1.$2")    // 698.
            .replace(/(\d{3})(\d)/, "$1/$2")    // 328/
            .replace(/(\d{4})(\d)/, "$1-$2")    // 0001-
            .replace(/(-\d{2})\d+?$/, "$1");    // 82
    }
}

function phoneMask(value) {
    if (value) {
        return value
            .replace(/\D/g, "")
            .replace(/(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{4})(\d)/, "$1-$2")
            .replace(/(\d{4})-(\d)(\d{4})/, "$1$2-$3")
            .replace(/(-\d{4})\d+?$/, "$1");
    }
}

function cepMask(value) {
    if (value) {
        return value
            .replace(/\D/g, "")
            .replace(/(\d{5})(\d)/, "$1-$2")
            .replace(/(-\d{3})\d+?$/, "$1");
    }
}

function pisMask(value) {
    if (value) {
        return value
            .replace(/\D/g, "")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{5})(\d)/, "$1.$2")
            .replace(/(\d{5}\.)(\d{2})(\d)/, "$1$2-$3")
            .replace(/(-\d{1})\d+?$/, "$1");
    }
}

// function moneyMask(value) {
//     const config = {
//         unit: "R$ ",
//         separator: ",",
//         delimiter: ".",
//     };
//     return MaskService.toMask("money", value, config);
// }
function moneyMask(value) {
    return value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
};

// function moneyMaskSpaceless(value) {
//     const config = {
//         unit: "R$",
//         separator: ",",
//         delimiter: ".",
//     };
//     return MaskService.toMask("money", value, config);
// }
function moneyMaskSpaceless(value) {
    return 'R$'+value.toLocaleString('pt-br',{minimumFractionDigits: 2});
};

// function numberMask(value) {
//     const config = {
//         unit: "",
//         separator: ",",
//         delimiter: ".",
//     };
//     return MaskService.toMask("money", value, config);
// }
function numberMask(value) {
    return value.toLocaleString('pt-br',{minimumFractionDigits: 2});
};

export {
    cpfMask,
    cnpjMask,
    phoneMask,
    cepMask,
    pisMask,
    moneyMask,
    moneyMaskSpaceless,
    numberMask,
};
