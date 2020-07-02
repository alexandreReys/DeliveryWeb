import React, { useState } from "react";
import store from "store";
import { actionVinhoList } from "store/actions";
import { TextInputMask } from "react-web-masked-text";
import { MoneyMaskedToStringUnmasked } from "utils";

import "./vinhoForm.css";

function VinhoForm({ propSubmit }) {
  const [IdVinho] = useState(store.getState().vinhoState.IdVinho);
  const [DescricaoVinho, setDescricaoVinho] = useState(
    store.getState().vinhoState.DescricaoVinho
  );
  const [PrecoVinho, setPrecoVinho] = useState(
    store.getState().vinhoState.PrecoVinho
  );
  const [TipoVinho, setTipoVinho] = useState(
    store.getState().vinhoState.TipoVinho
  );
  const [ComentarioVinho, setComentarioVinho] = useState(
    store.getState().vinhoState.ComentarioVinho
  );
  const [CodigoErpVinho, setCodigoErpVinho] = useState(
    store.getState().vinhoState.CodigoErpVinho
  );
  const [Imagem1Vinho] = useState(store.getState().vinhoState.Imagem1Vinho);
  const [ImagemInput1Vinho, setImagemInput1Vinho] = useState("");
  const [ImagemFile1Vinho, setImagemFile1Vinho] = useState(null);
  const [Img1Preview, setImg1Preview] = useState(
    store.getState().vinhoState.Imagem1Vinho
  );

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
      ImagemFile1Vinho,
    };

    store.dispatch(actionVinhoList());
    await propSubmit(formData);
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
                className="input-txt"
                name="ImagemInput1Vinho"
                id="ImagemInput1Vinho"
                value={ImagemInput1Vinho}
                onChange={(e) => {
                  setImg1Preview(URL.createObjectURL(e.target.files[0]));
                  setImagemInput1Vinho(e.target.value);
                  setImagemFile1Vinho(e.target.files[0]);
                }}
              />
              <img
                src={Img1Preview}
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
