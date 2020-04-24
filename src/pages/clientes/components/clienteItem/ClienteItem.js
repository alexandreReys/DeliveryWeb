import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import store from "store/index";
import { actionClienteEdit } from "store/actions";

import "./clienteItem.css";

function ClienteItem({ cliente, onDelete }) {
  const handlerEditButton = (cliente) => {
    const dadosCliente = {
      IdCliente: cliente.IdCliente,
      FantasiaCliente: cliente.FantasiaCliente,
      NomeCliente: cliente.NomeCliente,
      EnderecoCliente: cliente.EnderecoCliente,
      NumeroCliente: cliente.NumeroCliente,
      BairroCliente: cliente.BairroCliente,
      CidadeCliente: cliente.CidadeCliente,
      EstadoCliente: cliente.EstadoCliente,
      CepCliente: cliente.CepCliente,
      ContatoCliente: cliente.ContatoCliente,
      TelefoneCliente: cliente.TelefoneCliente,
    };
    store.dispatch(actionClienteEdit(dadosCliente));
  };

  return (
    <li className="cliente-item">
      <header>
        <div className="cliente-info bt-edit bt-delete">
          <strong className="titulo">
            {cliente.NomeCliente}
            <FiEdit
              className="edit-icon ml-3"
              onClick={() => handlerEditButton(cliente)}
            />
            <FaTrashAlt
              className="trash-icon ml-2"
              onClick={() => {
                onDelete(cliente.IdCliente);
              }}
            />
          </strong>
          <span className="span2">
            {cliente.TelefoneCliente} - Bairro: {cliente.BairroCliente}
          </span>
          <span className="span2">{cliente.CidadeCliente}</span>
        </div>
      </header>
    </li>
  );
}

export default ClienteItem;
