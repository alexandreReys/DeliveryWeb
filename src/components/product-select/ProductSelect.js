import React from "react";
import AsyncSelect from 'react-select/async';
import * as productService from "../../services/productService";
import store from "store";
import * as actions from "store/actions";
import { history } from "routes/history";

const ProductSelect = () => {
    const [selectedValue, setSelectedValue] = React.useState("");

    async function loadOptions(inputValue, callback) {
        if (inputValue) {
            const data = await getProductList(inputValue);
            callback(data);
        };
    };

    async function getProductList(descricao) {
        const data = await productService.getProductsByName(descricao);
        const newData = data.map(product => {
            return {
                value: product.IdVinho,
                label: product.DescricaoVinho,
                ...product,
            };
        });
        return newData;
    };

    function handleChange(product) {
        if (!!product) {
            setSelectedValue("");
            const param = {
                id: product.IdVinho,
                description: product.DescricaoVinho,
                quantity: 1,
                price: product.PrecoVinho,
                image: product.Imagem1Vinho,
            };

            store.dispatch(actions.actionSelectProduct(param));
            history.push("/selected-product");
        };
        return "";
    };

    return (
        <div style={{ width: "100%" }}>
            <AsyncSelect
                value={selectedValue}
                closeMenuOnSelect={true}
                cacheOptions
                loadOptions={loadOptions}
                placeholder={"Pesquise sua bebida favorita"}
                components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}
                // defaultOptions
                // onInputChange={ value => value }
                onChange={value => handleChange(value)}
                isClearable={true}
                isSearchable={true}
            />
        </div>
    );

};

export default ProductSelect;
