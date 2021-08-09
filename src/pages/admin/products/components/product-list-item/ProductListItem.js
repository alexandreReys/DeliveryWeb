import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import store from "store";
import { actionVinhoEdit } from "store/actions";
import { moneyMask } from "utils/masks";

import "./styles.css";

function ProductListItem({ vinho, onDelete }) {
  const precoVinho = moneyMask(vinho.PrecoVinho);

  const handlerEditButton = (vinho) => {
    const dadosVinho = {
      IdVinho: vinho.IdVinho,
      DescricaoVinho: vinho.DescricaoVinho,
      PrecoVinho: vinho.PrecoVinho,
      TipoVinho: vinho.TipoVinho,
      ClassificacaoVinho: vinho.ClassificacaoVinho,
      PaisVinho: vinho.PaisVinho,
      GarrafaVinho: vinho.GarrafaVinho,
      ComentarioVinho: vinho.ComentarioVinho,
      CodigoErpVinho: vinho.CodigoErpVinho,
      Imagem1Vinho: vinho.Imagem1Vinho,
      Imagem1IdVinho: vinho.Imagem1IdVinho,
      IdProductVariation: vinho.IdProductVariation,
      QuantityProductVariation: vinho.QuantityProductVariation,
      DescriptionProductVariation: vinho.DescriptionProductVariation,
      PriceProductVariation: vinho.PriceProductVariation,
    };
    store.dispatch(actionVinhoEdit(dadosVinho));
  };

  return (
    <li className="vinho-item" style={{width: '350px'}}>
      <header>
        <strong className="titulo">{vinho.DescricaoVinho}</strong>
      </header>
      <content>
        <span className="span2">Preço: {precoVinho}</span>
        <div className="aaa">
          <FiEdit
            className="edit-icon ml-3"
            onClick={() => handlerEditButton(vinho)}
          />
          <FaTrashAlt
            className="trash-icon ml-2"
            onClick={() => {onDelete(vinho.IdVinho);
            }}
          />
        </div>
      </content>
    </li>
  );
}

export default ProductListItem;
