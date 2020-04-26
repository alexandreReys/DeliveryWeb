import React, { useEffect, useState } from "react";
import store from "store/index";
import { actionVeiculoList, actionVeiculoMounted } from "store/actions";
import { getClientes } from "services/clienteService";
import "./veiculoForm.css";

function VeiculoForm({ propSubmit }) {
  const [clienteList, setClienteList] = useState([]);

  const [IdVeiculo] = useState(store.getState().veiculoState.IdVeiculo);
  const [IdClienteVeiculo, setIdClienteVeiculo] = useState(
    store.getState().veiculoState.IdClienteVeiculo
  );
  const [DescricaoVeiculo, setDescricaoVeiculo] = useState(
    store.getState().veiculoState.DescricaoVeiculo
  );
  const [PlacaVeiculo, setPlacaVeiculo] = useState(
    store.getState().veiculoState.PlacaVeiculo
  );
  const [MarcaVeiculo, setMarcaVeiculo] = useState(
    store.getState().veiculoState.MarcaVeiculo
  );
  const [ModeloVeiculo, setModeloVeiculo] = useState(
    store.getState().veiculoState.ModeloVeiculo
  );
  const [AnoVeiculo, setAnoVeiculo] = useState(
    store.getState().veiculoState.AnoVeiculo
  );
  const [CorVeiculo, setCorVeiculo] = useState(
    store.getState().veiculoState.CorVeiculo
  );

  useEffect(() => {
    async function loadClientes() {
      setClienteList([
        {
          IdCliente: 0,
          NomeCliente: "Loading ...",
        },
      ]);
      const response = await getClientes();
      if (store.getState().veiculoState.mounted) setClienteList(response);
    }

    store.dispatch(actionVeiculoMounted(true));
    loadClientes(); // getClienteList();
    return () => store.dispatch(actionVeiculoMounted(false));
  }, []);

  /////////////////////////////////////////////////
  async function handleSubmit(e) {
    e.preventDefault();

    const formData = {
      IdVeiculo,
      IdClienteVeiculo,
      DescricaoVeiculo,
      PlacaVeiculo,
      MarcaVeiculo,
      ModeloVeiculo,
      AnoVeiculo,
      CorVeiculo,
    };
    await propSubmit(formData);
    store.dispatch(actionVeiculoList());
  }

  /////////////////////////////////////////////////
  return (
    <div className="veiculo-container">
      <header>
        <strong>Veiculo</strong>
      </header>

      <main>
        <form onSubmit={handleSubmit}>
          <div className="form-columns">
            {/* IdClienteVeiculo */}
            <div className="input-block">
              <label htmlFor="IdClienteVeiculo">Proprietário</label>
              <select
                className="input-txt input-cliente"
                name="IdClienteVeiculo"
                id="IdClienteVeiculo"
                required
                autoComplete="new-password"
                value={IdClienteVeiculo}
                onChange={(e) => setIdClienteVeiculo(e.target.value)}
              >
                {clienteList.map((cliente) => {
                  return (
                    <option key={cliente.IdCliente} value={cliente.IdCliente}>
                      {cliente.NomeCliente}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* DescricaoVeiculo */}
            <div className="input-block">
              <label htmlFor="DescricaoVeiculo">Descrição</label>
              <input
                className="input-txt"
                name="DescricaoVeiculo"
                id="DescricaoVeiculo"
                required
                autoComplete="new-password"
                value={DescricaoVeiculo}
                onChange={(e) => setDescricaoVeiculo(e.target.value)}
              />
            </div>

            {/* PlacaVeiculo */}
            <div className="input-block">
              <label htmlFor="PlacaVeiculo">Placa</label>
              <input
                className="input-txt"
                name="PlacaVeiculo"
                id="PlacaVeiculo"
                required
                pattern="[A-Z]{3}[0-9]{4}"
                title="AAA0000 ( 3 Letras Maiusculas e 4 Numeros )"
                maxLength="7"
                autoComplete="new-password"
                value={PlacaVeiculo}
                onChange={(e) => setPlacaVeiculo(e.target.value.toUpperCase())}
              />
            </div>

            {/* MarcaVeiculo */}
            <div className="input-block">
              <label htmlFor="MarcaVeiculo">Marca</label>
              <input
                className="input-txt"
                name="MarcaVeiculo"
                id="MarcaVeiculo"
                required
                autoComplete="new-password"
                value={MarcaVeiculo}
                onChange={(e) => setMarcaVeiculo(e.target.value)}
              />
            </div>

            {/* ModeloVeiculo */}
            <div className="input-block">
              <label htmlFor="ModeloVeiculo">Modelo</label>
              <input
                className="input-txt"
                name="ModeloVeiculo"
                id="ModeloVeiculo"
                required
                autoComplete="new-password"
                value={ModeloVeiculo}
                onChange={(e) => setModeloVeiculo(e.target.value)}
              />
            </div>

            {/* AnoVeiculo */}
            <div className="input-block">
              <label htmlFor="AnoVeiculo">Ano</label>
              <input
                className="input-txt"
                name="AnoVeiculo"
                id="AnoVeiculo"
                required
                autoComplete="new-password"
                value={AnoVeiculo}
                onChange={(e) => setAnoVeiculo(e.target.value)}
              />
            </div>

            {/* CorVeiculo */}
            <div className="input-block">
              <label htmlFor="CorVeiculo">Cor</label>
              <input
                className="input-txt"
                name="CorVeiculo"
                id="CorVeiculo"
                required
                autoComplete="new-password"
                value={CorVeiculo}
                onChange={(e) => setCorVeiculo(e.target.value)}
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
                store.dispatch(actionVeiculoList());
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

export default VeiculoForm;
