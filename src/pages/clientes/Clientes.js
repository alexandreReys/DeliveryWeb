import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { FaPlus, FaSearch } from "react-icons/fa";
import ClienteForm from "pages/clientes/components/clienteForm/ClienteForm";
import ClienteItem from "pages/clientes/components/clienteItem/ClienteItem";
import store from "store";
import { actionClienteAdd, actionClienteList } from "store/actions";
import { DebounceInput } from "react-debounce-input";

import {
  getClientes,
  getClientesPorNome,
  postCliente,
  putCliente,
  deleteCliente,
} from "services/clienteService";

import "pages/clientes/clientes.css";

const App = ({ operacaoCliente }) => {
  const [loading, setLoading] = useState(true);
  const [loadingText] = useState(store.getState().defaultState.loadingText);

  const [clientes, setClientes] = useState([]);

  const [searching, setSearching] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    store.dispatch(actionClienteList());
    getClientesList();
  }, []);

  useEffect(() => {
    getClientesNome(searchText);
  }, [searchText]);

  const handlerListAddButton = () => {
    store.dispatch(actionClienteAdd());
  };

  async function getClientesList() {
    async function loadClientes() {
      setSearchText("");
      setLoading(true);
      const response = await getClientes();
      setLoading(false);
      setClientes(response);
    }
    loadClientes();
  }

  async function getClientesNome(searchText) {
    async function loadClientesNome(searchText) {
      setLoading(true);
      const response = await getClientesPorNome(searchText);
      setLoading(false);
      setClientes(response);
    }
    loadClientesNome(searchText);
  }

  async function handleFormSaveButton(formData) {
    if (operacaoCliente === "add") {
      const clienteInArray = clientes.filter((cliente) => {
        return cliente.NomeCliente === formData.NomeCliente;
      });

      if (clienteInArray === null || clienteInArray.length === 0) {
        // Inclui no BD
        const response = await postCliente(formData);
        if (response.affectedRows > 0) {
          getClientesList();
        }
      }
    }

    if (operacaoCliente === "edit") {
      // Altera no BD
      const response = await putCliente(formData);
      if (response.affectedRows > 0) {
        await getClientesList();
      }
    }
  }

  const handlerDeleteButton = async (itemID) => {
    const r = window.confirm("Confirma Exclusão ??");
    if (r === true) {
      // Deletar no BD
      const response = await deleteCliente(itemID);
      if (response.affectedRows > 0) {
        await getClientesList();
      }
    }
  };

  return (
    <div id="clientes">
      {(operacaoCliente === "list" || operacaoCliente === "delete") && (
        <div className="cliente-list">
          <div className="cliente-list-header">
            <div>Clientes</div>
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
              <h3>{loadingText}</h3>
            </div>
          )}

          {!loading && (
            <>
              <ul>
                {clientes.map((cliente) => (
                  <ClienteItem
                    key={cliente.IdCliente}
                    cliente={cliente}
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

      {(operacaoCliente === "add" || operacaoCliente === "edit") && (
        <div className="cliente-form">
          <ClienteForm propSubmit={handleFormSaveButton} />
        </div>
      )}
    </div>
  );
};

export default connect((state) => ({
  operacaoCliente: state.clienteState.operacaoCliente,
}))(App);
