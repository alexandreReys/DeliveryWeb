import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import store from "store";
import { actionDeliverymanEdit } from "store/actions";

import "./styles.css";

function DeliverymanItem({ deliveryman, onDelete }) {

  const handlerEditButton = (deliveryman) => {
    const dados = {
      Id: deliveryman.Id,
      email: deliveryman.email,
      password: deliveryman.password,
      name: deliveryman.name,

    };
    store.dispatch(actionDeliverymanEdit(dados));
  };

  return (
    <li className="vinho-item">
      <header>
        <strong className="titulo">{deliveryman.name}</strong>
      </header>
      <content>
        <span className="span2">Usuário: {deliveryman.email}</span>
        <div className="aaa">
          <FiEdit
            className="edit-icon ml-3"
            onClick={() => handlerEditButton(deliveryman)}
          />
          <FaTrashAlt
            className="trash-icon ml-2"
            onClick={() => {
              onDelete(deliveryman.Id);
            }}
          />
        </div>
      </content>
    </li>
  );
}

export default DeliverymanItem;
