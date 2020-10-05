import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import store from "store";
import { actionCategoryEdit } from "store/actions";

import "./styles.css";

function CategoryItem({ category, onDelete }) {

  const handlerEditButton = (category) => {
    const dados = {
      IdCategory: category.IdCategory,
      DescriptionCategory: category.DescriptionCategory,
    };
    store.dispatch(actionCategoryEdit(dados));
  };

  return (
    <li className="vinho-item">
      <header>
        <strong className="titulo">{category.DescriptionCategory}</strong>
      </header>
      <content>
        <span className="span2">Código: {category.IdCategory}</span>
        <div className="aaa">
          <FiEdit
            className="edit-icon ml-3"
            onClick={() => handlerEditButton(category)}
          />
          <FaTrashAlt
            className="trash-icon ml-2"
            onClick={() => {
              onDelete(category.IdCategory);
            }}
          />
        </div>
      </content>
    </li>
  );
}

export default CategoryItem;
