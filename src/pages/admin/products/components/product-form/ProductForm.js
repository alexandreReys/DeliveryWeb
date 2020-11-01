import React, { useEffect, useState } from "react";
import Select from 'react-select';

import store from "store";
import { actionVinhoList } from "store/actions";
import { TextInputMask } from "react-web-masked-text";
import { MoneyMaskedToStringUnmasked } from "utils";

import "./styles.css";

function ProductForm({ propSubmit }) {
  const [IdVinho] = useState(store.getState().vinhoState.IdVinho);
  const [DescricaoVinho, setDescricaoVinho] = useState(store.getState().vinhoState.DescricaoVinho);
  const [PrecoVinho, setPrecoVinho] = useState(store.getState().vinhoState.PrecoVinho);
  const [TipoVinho, setTipoVinho] = useState(store.getState().vinhoState.TipoVinho);
  const [ComentarioVinho, setComentarioVinho] = useState(store.getState().vinhoState.ComentarioVinho);
  const [CodigoErpVinho, setCodigoErpVinho] = useState(store.getState().vinhoState.CodigoErpVinho);

  const [fileInputState] = useState();
  const [Imagem1Vinho] = useState(store.getState().vinhoState.Imagem1Vinho);
  const [Imagem1IdVinho] = useState(store.getState().vinhoState.Imagem1IdVinho);
  const [previewSource, setPreviewSource] = useState(store.getState().vinhoState.Imagem1Vinho);
  
  const [options, setOptions] = useState([]);

  /////////////////////////////////////////////////

  useEffect( ()=>{ 
    Options() ;
  }, []);

  function Options() {
    let categories = store.getState().categoryState.categories;
    const opt = categories.map( it  => {
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
    };

    store.dispatch(actionVinhoList());
    await propSubmit(formData);
  }

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
  }

  /////////////////////////////////////////////////
  return (
    <div id="product-form" className="product-form-container">


      <div className="product-form-header">
        <div className="product-form-header-text">
          Produtos
        </div>
      </div>
      <div className="product-form-buttons">
        <button className="button" onClick={() => handleSubmit()}>
          Salvar
        </button>

        <button
          className="product-form-button"
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
          <div className="product-form-form-columns">
            {/* Descrição */}
            <div className="input-block">
              <label htmlFor="DescricaoVinho">Descrição</label>
              <input
                className="product-form-input-txt"
                name="DescricaoVinho"
                id="DescricaoVinho"
                required
                autoComplete="new-password"
                value={DescricaoVinho}
                onChange={(e) => setDescricaoVinho(e.target.value)}
              />
            </div>

            {/* PrecoVinho */}
            <div className="input-block">
              <label htmlFor="PrecoVinho">Preço</label>
              <TextInputMask
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
                onChange={ e => setTipoVinho(e.value) }
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
            <div className="input-block">
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
            </div>

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
          </div>


        </form>
      </main>
    </div>
  );
}

export default ProductForm;
