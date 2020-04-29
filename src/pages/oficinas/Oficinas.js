import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { FaPlus, FaSearch } from "react-icons/fa";
import OficinaForm from "pages/oficinas/components/oficinaForm/OficinaForm";
import OficinaItem from "pages/oficinas/components/oficinaItem/OficinaItem";
import store from "store";
import { actionOficinaAdd, actionOficinaList } from "store/actions";
import { DebounceInput } from "react-debounce-input";

import {
  getOficinas,
  getOficinasPorFantasia,
  postOficina,
  putOficina,
  deleteOficina,
} from "services/oficinasService";

import "pages/oficinas/oficinas.css";

const App = ({ operacaoOficina }) => {
  const [loading, setLoading] = useState(true);
  const [loadingText] = useState(store.getState().defaultState.loadingText);

  const [oficinas, setOficinas] = useState([]);

  const [searching, setSearching] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    store.dispatch(actionOficinaList());
    getOficinasList();
  }, []);

  useEffect(() => {
    getOficinasFantasia(searchText);
  }, [searchText]);

  const handlerListAddButton = () => {
    store.dispatch(actionOficinaAdd());
  };

  async function getOficinasList() {
    async function loadOficinas() {
      setSearchText("");
      setLoading(true);
      const response = await getOficinas();
      setLoading(false);
      setOficinas(response);
    }
    loadOficinas();
  }

  async function getOficinasFantasia(searchText) {
    async function loadOficinasFantasia(searchText) {
      setLoading(true);
      const response = await getOficinasPorFantasia(searchText);
      setLoading(false);
      setOficinas(response);
    }
    loadOficinasFantasia(searchText);
  }

  async function handleFormSaveButton(formData) {
    if (operacaoOficina === "add") {
      const oficinaInArray = oficinas.filter((oficina) => {
        return oficina.FantasiaOficina === formData.FantasiaOficina;
      });

      if (oficinaInArray === null || oficinaInArray.length === 0) {
        // Inclui no BD
        const response = await postOficina(formData);
        if (response.affectedRows > 0) {
          getOficinasList();
        }
      }
    }

    if (operacaoOficina === "edit") {
      // Altera no BD
      const response = await putOficina(formData);
      if (response.affectedRows > 0) {
        await getOficinasList();
      }
    }
  }

  const handlerDeleteButton = async (itemID) => {
    const r = window.confirm("Confirma Exclusão ??");
    if (r === true) {
      // Deletar no BD
      const response = await deleteOficina(itemID);
      if (response.affectedRows > 0) {
        await getOficinasList();
      }
    }
  };

  return (
    <div id="oficinas">
      {(operacaoOficina === "list" || operacaoOficina === "delete") && (
        <div className="oficina-list">
          <div className="oficina-list-header">
            <div>Oficinas</div>
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
                {oficinas.map((oficina) => (
                  <OficinaItem
                    key={oficina.IdOficina}
                    oficina={oficina}
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

      {(operacaoOficina === "add" || operacaoOficina === "edit") && (
        <div className="oficina-form">
          <OficinaForm propSubmit={handleFormSaveButton} />
        </div>
      )}
    </div>
  );
};

export default connect((state) => ({
  operacaoOficina: state.oficinaState.operacaoOficina,
}))(App);
