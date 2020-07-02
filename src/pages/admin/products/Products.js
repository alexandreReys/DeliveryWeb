import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { FaPlus, FaSearch } from "react-icons/fa";
import VinhoForm from "./components/vinhoForm/VinhoForm";
import VinhoItem from "./components/vinhoItem/VinhoItem";
import store from "store";
import { DebounceInput } from "react-debounce-input";

import {
  actionAdminModuleActivate,
  actionVinhoAdd,
  actionVinhoList,
} from "store/actions";

import {
  getVinhos,
  getVinhosPorNome,
  postVinho,
  putVinho,
  deleteVinho,
} from "services/vinhoService";

import "./styles.css";

const App = ({ operacaoVinho }) => {
  const [loading, setLoading] = useState(true);
  const [loadingText] = useState(store.getState().defaultState.loadingText);

  const [vinhos, setVinhos] = useState([]);

  const [searching, setSearching] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    store.dispatch(actionAdminModuleActivate());
    store.dispatch(actionVinhoList());
    getVinhosList();
  }, []);

  useEffect(() => {
    if (!loading) getVinhosNome(searchText);
    // eslint-disable-next-line
  }, [searchText]);

  const handlerListAddButton = () => {
    store.dispatch(actionVinhoAdd());
  };

  async function getVinhosList() {
    async function loadVinhos() {
      setSearchText("");
      setLoading(true);
      const response = await getVinhos();
      setLoading(false);
      setVinhos(response);
    }
    loadVinhos();
  }

  async function getVinhosNome(searchText) {
    async function loadVinhosNome(searchText) {
      setLoading(true);
      const response = await getVinhosPorNome(searchText);
      setLoading(false);
      setVinhos(response);
    }
    loadVinhosNome(searchText);
  }

  async function handleFormSaveButton(formData) {
    if (operacaoVinho === "add") {
      const VinhoArray = vinhos.filter((vinho) => {
        return vinho.DescricaoVinho === formData.DescricaoVinho;
      });

      if (VinhoArray === null || VinhoArray.length === 0) {
        // Inclui no BD
        const response = await postVinho(formData);
        if (response.affectedRows > 0) {
          getVinhosList();
        }
      }
    }

    if (operacaoVinho === "edit") {
      // Altera no BD
      const response = await putVinho(formData);

      if (!response) setVinhos([]);
      else if (response.affectedRows > 0) {
        await getVinhosList();
      }
    }
  }

  const handlerDeleteButton = async (itemID) => {
    const r = window.confirm("Confirma Exclusão ??");
    if (r === true) {
      // Deletar no BD
      const response = await deleteVinho(itemID);
      if (response.affectedRows > 0) {
        await getVinhosList();
      }
    }
  };

  return (
    <div id="vinhos">
      {(operacaoVinho === "list" || operacaoVinho === "delete") && (
        <div className="vinho-list">
          <div className="vinho-list-header">
            <div>Vinhos</div>
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
                {vinhos.map((vinho) => (
                  <VinhoItem
                    key={vinho.IdVinho}
                    vinho={vinho}
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

      {(operacaoVinho === "add" || operacaoVinho === "edit") && (
        <div className="vinho-form">
          <VinhoForm propSubmit={handleFormSaveButton} />
        </div>
      )}
    </div>
  );
};

export default connect((state) => ({
  operacaoVinho: state.vinhoState.operacaoVinho,
}))(App);
