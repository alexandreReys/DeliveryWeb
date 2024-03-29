import React, { useEffect, useState } from "react";
import Select from 'react-select';

import store from "store";
import { actionVinhoList } from "store/actions";
import { MoneyMaskedToStringUnmasked } from "utils";

// import { TextInputMask } from "react-masked-text";
import CurrencyInput from "react-currency-input";


import "./styles.css";

function ProductForm({ propSubmit }) {
    const [IdVinho] = useState(store.getState().vinhoState.IdVinho);
    const [DescricaoVinho, setDescricaoVinho] = useState(store.getState().vinhoState.DescricaoVinho);
    const [PrecoVinho, setPrecoVinho] = useState(store.getState().vinhoState.PrecoVinho);
    const [TipoVinho, setTipoVinho] = useState(store.getState().vinhoState.TipoVinho);
    const [ComentarioVinho] = useState(store.getState().vinhoState.ComentarioVinho);
    const [CodigoErpVinho, setCodigoErpVinho] = useState(store.getState().vinhoState.CodigoErpVinho);

    const [fileInputState] = useState();
    const [Imagem1Vinho] = useState(store.getState().vinhoState.Imagem1Vinho);
    const [Imagem1IdVinho] = useState(store.getState().vinhoState.Imagem1IdVinho);
    const [previewSource, setPreviewSource] = useState(store.getState().vinhoState.Imagem1Vinho);

    const [IdProductVariation] = useState(store.getState().vinhoState.IdProductVariation);
    const [QuantityProductVariation, setQuantityProductVariation] = useState(store.getState().vinhoState.QuantityProductVariation);
    const [DescriptionProductVariation, setDescriptionProductVariation] = useState(store.getState().vinhoState.DescriptionProductVariation);
    const [PriceProductVariation, setPriceProductVariation] = useState(store.getState().vinhoState.PriceProductVariation);

    const [options, setOptions] = useState([]);

    /////////////////////////////////////////////////

    useEffect(() => { Options() }, []);

    function Options() {
        let categories = store.getState().categoryState.categories;
        const opt = categories.map(it => {
            return {
                value: it.DescriptionCategory,
                label: it.DescriptionCategory,
            };
        });
        setOptions(opt);
    };

    async function handleSubmit() {
        // e.preventDefault();

        let precoVinho = MoneyMaskedToStringUnmasked(PrecoVinho);
        let priceProductVariation = !PriceProductVariation 
            ? null 
            : MoneyMaskedToStringUnmasked(PriceProductVariation)
        ;

        const formData = {
            IdVinho,
            DescricaoVinho,
            PrecoVinho: precoVinho,
            TipoVinho,
            ComentarioVinho,
            CodigoErpVinho,
            Imagem1Vinho,
            Imagem1IdVinho,
            base64EncodedImage: previewSource,
            IdProductVariation,
            QuantityProductVariation,
            DescriptionProductVariation,
            PriceProductVariation: priceProductVariation,
        };

        await propSubmit(formData);
    };

    function handleFileInputChange(e) {
        const file = e.target.files[0];
        previewFile(file);
    };

    function previewFile(file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        }
    };

    /////////////////////////////////////////////////
    return (
        <div
            id="product-form"
            className="product-form-container"
            // style={{width: '1200px'}}
        >

            <div className="product-form-header">
                <div className="product-form-header-text">
                    Produtos
            </div>
            </div>
            <div className="product-form-buttons">
                <button className="button" 
                    onClick={() => handleSubmit()}
                >
                    Salvar
                </button>

                <button className="product-form-button" 
                    onClick={() => store.dispatch(actionVinhoList())}
                >
                    Cancelar
                </button>
            </div>
            <div className="product-form-title">
                <div className="product-form-title-text">Dados Cadastrais</div>
            </div>

            <main>
                <form onSubmit={handleSubmit}>
                    <div className="product-form-form-columns" style={{width: 1200}}>

                        {/* Descrição */}
                        <div className="input-block">
                            <label htmlFor="DescricaoVinho">Descrição</label>
                            <input
                                className="product-form-input-txt"
                                name="DescricaoVinho"
                                id="DescricaoVinho"
                                required
                                autoComplete="new-password"
                                autoFocus={true}
                                selectAllOnFocus="true"
                                value={DescricaoVinho}
                                onChange={(e) => setDescricaoVinho(e.target.value)}
                            />
                        </div>

                        {/* PrecoVinho */}
                        <div className="input-block">
                            <label htmlFor="PrecoVinho">Preço</label>
                            {/* <TextInputMask
                                kind={"money"}
                                className="product-form-input-txt"
                                name="PrecoVinho"
                                id="PrecoVinho"
                                required
                                autoComplete="new-password"
                                value={PrecoVinho}
                                onChange={(text) => {
                                    setPrecoVinho(text);
                                }}
                            /> */}

                            <CurrencyInput
                                id="PrecoVinho"
                                name="PrecoVinho"
                                className="product-form-input-txt"
                                prefix="R$ "
                                decimalSeparator=","
                                thousandSeparator="."
                                precision="2"
                                // selectAllOnFocus={false}
                                // autoFocus="false"
                                value={PrecoVinho}
                                onChangeEvent={ (event, maskedvalue, floatvalue) => {
                                    setPrecoVinho(maskedvalue)
                                }}
                            />
                        </div>

                        {/* TipoVinho */}
                        <div className="input-block">
                            <label htmlFor="TipoVinho">Categoria do produto</label>
                            <Select
                                className="product-form-input-txt"
                                // name="TipoVinho"
                                // value={TipoVinho}
                                placeholder={TipoVinho}
                                onChange={e => setTipoVinho(e.value)}
                                options={options}
                            />
                        </div>

                        {/* Código ERP */}
                        <div className="input-block">
                            <label htmlFor="CodigoErpVinho">Código ERP</label>
                            <input
                                className="product-form-input-txt"
                                name="CodigoErpVinho"
                                id="CodigoErpVinho"
                                value={CodigoErpVinho}
                                onChange={(e) => setCodigoErpVinho(e.target.value)}
                            />
                        </div>

                        {/* Comentário sobre o produto */}
                        {/* <div className="input-block">
                        <label htmlFor="ComentarioVinho">
                            Comentário sobre o produto
                        </label>
                        <textarea
                            className="product-form-input-txt"
                            name="ComentarioVinho"
                            id="ComentarioVinho"
                            rows="10"
                            autoComplete="new-password"
                            value={ComentarioVinho}
                            onChange={(e) => setComentarioVinho(e.target.value)}
                        />
                        </div> */}

                        {/* Imagem 1 */}
                        <div className="input-block">
                            <label
                                className="product-form-label-select-img"
                                htmlFor="ImagemInput1Vinho"
                            >
                                Selecionar Imagem
                            </label>

                            <input
                                type="file"
                                name="ImagemInput1Vinho"
                                id="ImagemInput1Vinho"
                                onChange={handleFileInputChange}
                                value={fileInputState}
                            />
                            <div className="product-form-image-container">
                                <img
                                    src={previewSource}
                                    className="fotoProduto"
                                    alt=".  Não selecionado"
                                />
                            </div>
                        </div>

                        {/* Preço alternativo */}
                        <div className="input-block">

                            <div
                                style={{
                                    fontSize: "1.2rem",
                                    fontWeight: "bold",
                                    backgroundColor: "maroon",
                                    color: "white",
                                    padding: "5px 10px 5px",
                                    borderRadius: 10,
                                    marginBottom: 10,
                                }}
                            >
                                Preço Promocional Quantidade
                            </div>

                            <label htmlFor="QuantityProductVariation">Quantidade para Promoção</label>
                            {/* <TextInputMask
                                kind={"only-numbers"}
                                className="product-form-input-txt"
                                style={{width: "40%"}}
                                name="QuantityProductVariation"
                                id="QuantityProductVariation"
                                required
                                autoComplete="new-password"
                                value={QuantityProductVariation}
                                onChange={(text) => {
                                    setQuantityProductVariation(text);
                                }}
                            /> */}

                            <CurrencyInput  
                                id="QuantityProductVariation"
                                name="QuantityProductVariation"
                                className="product-form-input-txt"
                                style={{width: "40%"}}
                                prefix=""
                                decimalSeparator=","
                                thousandSeparator="."
                                precision="0"
                                // selectAllOnFocus={false}
                                // autoFocus="false"
                                value={QuantityProductVariation}
                                onChangeEvent={ (event, maskedvalue, floatvalue) => {
                                    setQuantityProductVariation(maskedvalue);
                                }}
                            />

                            <label htmlFor="DescriptionProductVariation">Texo Promocional</label>
                            <input
                                className="product-form-input-txt"
                                style={{width: "70%"}}
                                name="DescriptionProductVariation"
                                id="DescriptionProductVariation"
                                required
                                autoComplete="new-password"
                                value={DescriptionProductVariation}
                                onChange={(e) => setDescriptionProductVariation(e.target.value)}
                            />

                            <label htmlFor="PriceProductVariation">Preço Promocional</label>
                            {/* <TextInputMask
                                kind={"money"}
                                className="product-form-input-txt"
                                style={{width: "50%"}}
                                name="PriceProductVariation"
                                id="PriceProductVariation"
                                required
                                autoComplete="new-password"
                                value={PriceProductVariation}
                                onChange={(text) => {
                                    setPriceProductVariation(text);
                                }}
                            /> */}

                            <CurrencyInput  
                                id="PriceProductVariation"
                                name="PriceProductVariation"
                                className="product-form-input-txt"
                                style={{width: "50%"}}
                                prefix="R$ "
                                decimalSeparator=","
                                thousandSeparator="."
                                precision="2"
                                // selectAllOnFocus={false}
                                // autoFocus="false"
                                value={PriceProductVariation}
                                onChangeEvent={ (event, maskedvalue, floatvalue) => {
                                    setPriceProductVariation(maskedvalue);
                                }}
                            />                            

                        </div>

                    </div>

                </form>
            </main>
        </div>
    );
}

export default ProductForm;
