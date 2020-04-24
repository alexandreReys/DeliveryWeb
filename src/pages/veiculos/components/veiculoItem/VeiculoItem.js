import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import store from "store/index";
import { actionVeiculoEdit } from "store/actions";

import "./veiculoItem.css";

function VeiculoItem({ veiculo, onDelete }) {
  const handlerEditButton = (veiculo) => {
    const dadosVeiculo = {
      IdVeiculo: veiculo.IdVeiculo,
      IdClienteVeiculo: veiculo.IdClienteVeiculo,
      DescricaoVeiculo: veiculo.DescricaoVeiculo,
      PlacaVeiculo: veiculo.PlacaVeiculo,
      MarcaVeiculo: veiculo.MarcaVeiculo,
      ModeloVeiculo: veiculo.ModeloVeiculo,
      AnoVeiculo: veiculo.AnoVeiculo,
      CorVeiculo: veiculo.CorVeiculo,
    };
    store.dispatch(actionVeiculoEdit(dadosVeiculo));
  };

  return (
    <li className="veiculo-item">
      <header>
        <div className="veiculo-info bt-edit bt-delete">
          <strong className="titulo">
            {veiculo.DescricaoVeiculo}
            <FiEdit
              className="edit-icon ml-3"
              onClick={() => handlerEditButton(veiculo)}
            />
            <FaTrashAlt
              className="trash-icon ml-2"
              onClick={() => {
                onDelete(veiculo.IdVeiculo);
              }}
            />
          </strong>
          <span className="span1">
            <strong>{veiculo.PlacaVeiculo}</strong>
          </span>
          <span className="span2">
            {veiculo.MarcaVeiculo} / {veiculo.ModeloVeiculo}
          </span>
          <span className="span2">
            {veiculo.CorVeiculo} / {veiculo.AnoVeiculo}
          </span>
        </div>
      </header>
    </li>
  );
}

export default VeiculoItem;
