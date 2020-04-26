import React, { useState } from "react";
import store from "store/index";
import { actionClienteList } from "store/actions";
import { estadosList } from "utils";
import { cepMask, phoneMask } from "utils/masks";

import "./clienteForm.css";

function ClienteForm({ propSubmit }) {
  const [IdCliente] = useState(store.getState().clienteState.IdCliente);
  const [NomeCliente, setNomeCliente] = useState(
    store.getState().clienteState.NomeCliente
  );
  const [EnderecoCliente, setEnderecoCliente] = useState(
    store.getState().clienteState.EnderecoCliente
  );
  const [NumeroCliente, setNumeroCliente] = useState(
    store.getState().clienteState.NumeroCliente
  );
  const [BairroCliente, setBairroCliente] = useState(
    store.getState().clienteState.BairroCliente
  );
  const [CidadeCliente, setCidadeCliente] = useState(
    store.getState().clienteState.CidadeCliente
  );
  const [EstadoCliente, setEstadoCliente] = useState(
    store.getState().clienteState.EstadoCliente
  );
  const [CepCliente, setCepCliente] = useState(
    store.getState().clienteState.CepCliente
  );
  const [TelefoneCliente, setTelefoneCliente] = useState(
    store.getState().clienteState.TelefoneCliente
  );

  /////////////////////////////////////////////////
  async function handleSubmit(e) {
    e.preventDefault();

    const formData = {
      IdCliente,
      NomeCliente,
      EnderecoCliente,
      NumeroCliente,
      BairroCliente,
      CidadeCliente,
      EstadoCliente,
      CepCliente,
      TelefoneCliente,
    };
    await propSubmit(formData);
    store.dispatch(actionClienteList());
  }

  /////////////////////////////////////////////////
  return (
    <div className="cliente-container">
      <header>
        <strong>Cliente</strong>
      </header>

      <main>
        <form onSubmit={handleSubmit}>
          <div className="form-columns">
            {/* Nome */}
            <div className="input-block">
              <label htmlFor="NomeCliente">Nome</label>
              <input
                className="input-txt"
                name="NomeCliente"
                id="NomeCliente"
                required
                autoComplete="new-password"
                value={NomeCliente}
                onChange={(e) => setNomeCliente(e.target.value)}
              />
            </div>

            {/* Endereço */}
            <div className="input-block">
              <label htmlFor="EnderecoCliente">Endereço</label>
              <input
                className="input-txt"
                name="EnderecoCliente"
                id="EnderecoCliente"
                required
                autoComplete="new-password"
                value={EnderecoCliente}
                onChange={(e) => setEnderecoCliente(e.target.value)}
              />
            </div>

            {/* Numero */}
            <div className="input-block">
              <label htmlFor="NumeroCliente">Numero</label>
              <input
                className="input-num"
                name="NumeroCliente"
                id="NumeroCliente"
                required
                autoComplete="new-password"
                value={NumeroCliente}
                onChange={(e) => setNumeroCliente(e.target.value)}
              />
            </div>

            {/* Bairro, Cidade */}
            <div className="input-block">
              <label htmlFor="BairroCliente">Bairro</label>
              <input
                className="input-txt"
                name="BairroCliente"
                id="BairroCliente"
                required
                autoComplete="new-password"
                value={BairroCliente}
                onChange={(e) => setBairroCliente(e.target.value)}
              />
            </div>

            {/* Cidade */}
            <div className="input-block">
              <label htmlFor="CidadeCliente">Cidade</label>
              <input
                className="input-txt"
                name="CidadeCliente"
                id="CidadeCliente"
                required
                autoComplete="new-password"
                value={CidadeCliente}
                onChange={(e) => setCidadeCliente(e.target.value)}
              />
            </div>

            {/* Estado, Cep */}
            <div className="input-block">
              <label htmlFor="EstadoCliente">Estado</label>
              <select
                className="input-txt"
                name="EstadoCliente"
                id="EstadoCliente"
                required
                autoComplete="new-password"
                value={EstadoCliente}
                onChange={(e) => setEstadoCliente(e.target.value)}
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
              <label htmlFor="CepCliente">Cep</label>
              <input
                className="input-cep"
                name="CepCliente"
                id="CepCliente"
                required
                autoComplete="new-password"
                value={cepMask(CepCliente)}
                onChange={(e) => setCepCliente(e.target.value)}
              />
            </div>

            {/* Telefone */}
            <div className="input-block">
              <label htmlFor="TelefoneCliente">Telefone</label>
              <input
                className="input-tel"
                name="TelefoneCliente"
                id="TelefoneCliente"
                required
                value={phoneMask(TelefoneCliente)}
                onChange={(e) => setTelefoneCliente(e.target.value)}
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
                store.dispatch(actionClienteList());
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

export default ClienteForm;
