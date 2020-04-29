import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { FaPlus, FaSearch } from "react-icons/fa";
import VeiculoForm from "pages/veiculos/components/veiculoForm/VeiculoForm";
import VeiculoItem from "pages/veiculos/components/veiculoItem/VeiculoItem";
import store from "store/index";
import { actionVeiculoAdd, actionVeiculoList } from "store/actions";
import { DebounceInput } from "react-debounce-input";

import {
  getVeiculos,
  getVeiculosPorDescricao,
  postVeiculo,
  putVeiculo,
  deleteVeiculo,
} from "services/veiculosService";

import "pages/veiculos/veiculos.css";

const App = ({ operacaoVeiculo }) => {
  const [loading, setLoading] = useState(true);
  const [loadingText] = useState(store.getState().defaultState.loadingText);

  const [veiculos, setVeiculos] = useState([]);

  const [searching, setSearching] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    store.dispatch(actionVeiculoList());
    getVeiculosList();
  }, []);

  useEffect(() => {
    getVeiculosDescricao(searchText);
  }, [searchText]);

  const handlerListAddButton = () => {
    store.dispatch(actionVeiculoAdd());
  };

  async function getVeiculosList() {
    async function loadVeiculos() {
      setSearchText("");
      setLoading(true);
      const response = await getVeiculos();
      setLoading(false);
      setVeiculos(response);
    }
    loadVeiculos();
  }

  async function getVeiculosDescricao(searchText) {
    async function loadVeiculosDescricao(searchText) {
      setLoading(true);
      const response = await getVeiculosPorDescricao(searchText);
      setLoading(false);
      setVeiculos(response);
    }
    loadVeiculosDescricao(searchText);
  }

  async function handleFormSaveButton(formData) {
    if (operacaoVeiculo === "add") {
      const veiculoInArray = veiculos.filter((veiculo) => {
        return veiculo.DescricaoVeiculo === formData.DescricaoVeiculo;
      });

      if (veiculoInArray === null || veiculoInArray.length === 0) {
        // Inclui no BD
        const response = await postVeiculo(formData);
        if (response.affectedRows > 0) {
          getVeiculosList();
        }
      }
    }

    if (operacaoVeiculo === "edit") {
      // Altera no BD
      const response = await putVeiculo(formData);
      if (response.affectedRows > 0) {
        await getVeiculosList();
      }
    }
  }

  const handlerDeleteButton = async (itemID) => {
    const r = window.confirm("Confirma Exclusão ??");
    if (r === true) {
      // Deletar no BD
      const response = await deleteVeiculo(itemID);
      if (response.affectedRows > 0) {
        await getVeiculosList();
      }
    }
  };

  return (
    <div id="veiculos">
      {(operacaoVeiculo === "list" || operacaoVeiculo === "delete") && (
        <div className="veiculo-list">
          <div className="veiculo-list-header">
            <div>Veiculos</div>
            <div
              className="search-bar"
              onClick={() => {
                setSearching(!searching);
                if (searching === true) setSearchText("");
              }}
            >
              <FaSearch className="button-search" size={22} />
              {/* Search */}
            </div>
          </div>

          {searching && (
            <div className="search-input">
              <DebounceInput
                className="input"
                value={searchText}
                minLength={2}
                debounceTimeout={800}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <div className="search-cancel" onClick={() => setSearchText("")}>
                X
              </div>
            </div>
          )}

          {loading && (
            <div id="loading">
              <h5>{loadingText}</h5>
            </div>
          )}

          {!loading && (
            <>
              <ul>
                {veiculos.map((veiculo) => (
                  <VeiculoItem
                    key={veiculo.IdVeiculo}
                    veiculo={veiculo}
                    onDelete={handlerDeleteButton}
                  />
                ))}
              </ul>
              <div className="btnMais">
                <div className="col-3">
                  <button
                    className="btn btn-info btnCircular"
                    onClick={() => {
                      handlerListAddButton();
                    }}
                  >
                    <i>
                      <FaPlus />
                    </i>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {(operacaoVeiculo === "add" || operacaoVeiculo === "edit") && (
        <div className="veiculo-form">
          <VeiculoForm propSubmit={handleFormSaveButton} />
        </div>
      )}
    </div>
  );
};

export default connect((state) => ({
  operacaoVeiculo: state.veiculoState.operacaoVeiculo,
}))(App);
