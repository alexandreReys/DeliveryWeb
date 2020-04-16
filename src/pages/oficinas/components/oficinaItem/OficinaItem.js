import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import store from "store/index";
import { actionOficinaEdit } from "store/actions";

import "./oficinaItem.css";

function OficinaItem({ oficina, onDelete }) {
  const handlerEditButton = (oficina) => {
    const dadosOficina = {
      IdOficina: oficina.IdOficina,
      FantasiaOficina: oficina.FantasiaOficina,
      NomeOficina: oficina.NomeOficina,
      EnderecoOficina: oficina.EnderecoOficina,
      NumeroOficina: oficina.NumeroOficina,
      BairroOficina: oficina.BairroOficina,
      CidadeOficina: oficina.CidadeOficina,
      EstadoOficina: oficina.EstadoOficina,
      CepOficina: oficina.CepOficina,
      ContatoOficina: oficina.ContatoOficina,
      TelefoneOficina: oficina.TelefoneOficina,
    };
    store.dispatch(actionOficinaEdit(dadosOficina));
  };

  return (
    <li className="oficina-item">
      <header>
        <div className="oficina-info bt-edit bt-delete">
          <strong className="titulo">
            {oficina.FantasiaOficina}
            <FiEdit
              className="edit-icon ml-3"
              onClick={() => handlerEditButton(oficina)}
            />
            <FaTrashAlt
              className="trash-icon ml-2"
              onClick={() => {
                onDelete(oficina.IdOficina);
              }}
            />
          </strong>
          <span className="span1">
            <strong>{oficina.NomeOficina}</strong>
          </span>
          <span className="span2">
            {oficina.ContatoOficina} / {oficina.TelefoneOficina}
          </span>
          <span className="span2">
            {oficina.BairroOficina} / {oficina.CidadeOficina}
          </span>
        </div>
      </header>
    </li>
  );
}

export default OficinaItem;
