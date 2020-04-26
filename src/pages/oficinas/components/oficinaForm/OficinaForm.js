import React, { useState } from "react";
import store from "store/index";
import { actionOficinaList } from "store/actions";
import { estadosList } from "utils";
import { cepMask, phoneMask } from "utils/masks";

import "./oficinaForm.css";

function OficinaForm({ propSubmit }) {
  const [IdOficina] = useState(store.getState().oficinaState.IdOficina);
  const [FantasiaOficina, setFantasiaOficina] = useState(
    store.getState().oficinaState.FantasiaOficina
  );
  const [NomeOficina, setNomeOficina] = useState(
    store.getState().oficinaState.NomeOficina
  );
  const [EnderecoOficina, setEnderecoOficina] = useState(
    store.getState().oficinaState.EnderecoOficina
  );
  const [NumeroOficina, setNumeroOficina] = useState(
    store.getState().oficinaState.NumeroOficina
  );
  const [BairroOficina, setBairroOficina] = useState(
    store.getState().oficinaState.BairroOficina
  );
  const [CidadeOficina, setCidadeOficina] = useState(
    store.getState().oficinaState.CidadeOficina
  );
  const [EstadoOficina, setEstadoOficina] = useState(
    store.getState().oficinaState.EstadoOficina
  );
  const [CepOficina, setCepOficina] = useState(
    store.getState().oficinaState.CepOficina
  );
  const [ContatoOficina, setContatoOficina] = useState(
    store.getState().oficinaState.ContatoOficina
  );
  const [TelefoneOficina, setTelefoneOficina] = useState(
    store.getState().oficinaState.TelefoneOficina
  );

  /////////////////////////////////////////////////
  async function handleSubmit(e) {
    e.preventDefault();

    const formData = {
      IdOficina,
      FantasiaOficina,
      NomeOficina,
      EnderecoOficina,
      NumeroOficina,
      BairroOficina,
      CidadeOficina,
      EstadoOficina,
      CepOficina,
      ContatoOficina,
      TelefoneOficina,
    };
    await propSubmit(formData);
    store.dispatch(actionOficinaList());
  }

  /////////////////////////////////////////////////
  return (
    <div className="oficina-container">
      <header>
        <strong>Oficina</strong>
      </header>

      <main>
        <form onSubmit={handleSubmit}>
          <div className="form-columns">
            {/* Fantasia */}
            <div className="input-block">
              <label htmlFor="FantasiaOficina">Nome Fantasia</label>
              <input
                className="input-txt"
                name="FantasiaOficina"
                id="FantasiaOficina"
                required
                autoComplete="new-password"
                value={FantasiaOficina}
                onChange={(e) => setFantasiaOficina(e.target.value)}
              />
            </div>

            {/* Razão Social */}
            <div className="input-block">
              <label htmlFor="NomeOficina">Razão Social</label>
              <input
                className="input-txt"
                name="NomeOficina"
                id="NomeOficina"
                required
                autoComplete="new-password"
                value={NomeOficina}
                onChange={(e) => setNomeOficina(e.target.value)}
              />
            </div>

            {/* Endereço */}
            <div className="input-block">
              <label htmlFor="EnderecoOficina">Endereço</label>
              <input
                className="input-txt"
                name="EnderecoOficina"
                id="EnderecoOficina"
                required
                autoComplete="new-password"
                value={EnderecoOficina}
                onChange={(e) => setEnderecoOficina(e.target.value)}
              />
            </div>

            {/* Numero */}
            <div className="input-block">
              <label htmlFor="NumeroOficina">Numero</label>
              <input
                className="input-num"
                name="NumeroOficina"
                id="NumeroOficina"
                required
                autoComplete="new-password"
                value={NumeroOficina}
                onChange={(e) => setNumeroOficina(e.target.value)}
              />
            </div>

            {/* Bairro, Cidade */}
            <div className="input-block">
              <label htmlFor="BairroOficina">Bairro</label>
              <input
                className="input-txt"
                name="BairroOficina"
                id="BairroOficina"
                required
                autoComplete="new-password"
                value={BairroOficina}
                onChange={(e) => setBairroOficina(e.target.value)}
              />
            </div>

            {/* Cidade */}
            <div className="input-block">
              <label htmlFor="CidadeOficina">Cidade</label>
              <input
                className="input-txt"
                name="CidadeOficina"
                id="CidadeOficina"
                required
                autoComplete="new-password"
                value={CidadeOficina}
                onChange={(e) => setCidadeOficina(e.target.value)}
              />
            </div>

            {/* Estado, Cep */}
            <div className="input-block">
              <label htmlFor="EstadoOficina">Estado</label>
              <select
                className="input-txt input-estado"
                name="EstadoOficina"
                id="EstadoOficina"
                required
                autoComplete="new-password"
                value={EstadoOficina}
                onChange={(e) => setEstadoOficina(e.target.value)}
              >
                {estadosList.map((estado) => (
                  <option key={estado.estado} value={estado.estado}>
                    {estado.estadoNome}
                  </option>
                ))}
              </select>
            </div>

            {/* Cep */}
            <div className="input-block">
              <label htmlFor="CepOficina">Cep</label>
              <input
                className="input-cep"
                name="CepOficina"
                id="CepOficina"
                required
                autoComplete="new-password"
                value={cepMask(CepOficina)}
                onChange={(e) => setCepOficina(e.target.value)}
              />
            </div>

            {/* Contato */}
            <div className="input-block">
              <label htmlFor="ContatoOficina">Contato</label>
              <input
                className="input-txt"
                name="ContatoOficina"
                id="ContatoOficina"
                required
                autoComplete="new-password"
                value={ContatoOficina}
                onChange={(e) => setContatoOficina(e.target.value)}
              />
            </div>

            {/* Telefone */}
            <div className="input-block">
              <label htmlFor="TelefoneOficina">Telefone</label>
              <input
                className="input-tel"
                name="TelefoneOficina"
                id="TelefoneOficina"
                required
                value={phoneMask(TelefoneOficina)}
                onChange={(e) => setTelefoneOficina(e.target.value)}
              />
            </div>
          </div>

          <footer>
            <button className="btn-man-forn" type="submit">
              Salvar
            </button>
            <button
              className="btn-man-forn btn-cancel"
              type="reset"
              onClick={() => {
                store.dispatch(actionOficinaList());
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

export default OficinaForm;
