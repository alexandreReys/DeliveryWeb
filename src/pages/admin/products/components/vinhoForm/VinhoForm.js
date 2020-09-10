import React, { useState } from "react";
import store from "store";
import { actionVinhoList } from "store/actions";
import { TextInputMask } from "react-web-masked-text";
import { MoneyMaskedToStringUnmasked } from "utils";

import "./vinhoForm.css";

function VinhoForm({ propSubmit }) {
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


  /////////////////////////////////////////////////
  async function handleSubmit(e) {
    e.preventDefault();

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
    <div className="vinho-container">
      <header>
        <strong>Dados Cadastrais</strong>
      </header>

      <main>
        <form onSubmit={handleSubmit}>
          <div className="form-columns">
            {/* Descrição */}
            <div className="input-block">
              <label htmlFor="DescricaoVinho">Descrição</label>
              <input
                className="input-txt"
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
                className="input-50"
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

            {/* Tipo */}
            <div className="input-block">
              <label htmlFor="TipoVinho">Tipo</label>
              <input
                className="input-txt"
                name="TipoVinho"
                id="TipoVinho"
                autoComplete="new-password"
                value={TipoVinho}
                onChange={(e) => setTipoVinho(e.target.value)}
              />
            </div>

            {/* Código ERP */}
            <div className="input-block">
              <label htmlFor="CodigoErpVinho">Código ERP</label>
              <input
                className="input-50"
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
                className="input-txt"
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
              <label className="label-select-img" htmlFor="ImagemInput1Vinho">
                Selecionar Imagem
              </label>

              <input
                type="file"
                name="ImagemInput1Vinho"
                id="ImagemInput1Vinho"
                onChange={handleFileInputChange}
                value={fileInputState}
              />
              <img
                src={previewSource}
                className="fotoProduto"
                alt=".  Não selecionado"
              />
            </div>
          </div>

          <footer>
            <button className="btn-man-forn" type="submit">
              Salvar
            </button>
            <button
              type="reset"
              className="btn-man-forn btn-cancel"
              onClick={() => {
                store.dispatch(actionVinhoList());
              }}
            >
              Cancelar
            </button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default VinhoForm;
