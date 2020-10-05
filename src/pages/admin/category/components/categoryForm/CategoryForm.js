import React, { useState } from "react";
import store from "store";
import { actionCategoryList } from "store/actions";

import "./styles.css";

function CategoryForm({ propSubmit }) {
  const [IdCategory] = useState(store.getState().categoryState.IdCategory);
  const [DescriptionCategory, setDescriptionCategory] = useState(store.getState().categoryState.DescriptionCategory);
  
  /////////////////////////////////////////////////
  async function handleSubmit() {
    // e.preventDefault();

    const formData = { IdCategory, DescriptionCategory };

    store.dispatch(actionCategoryList());
    await propSubmit(formData);
  }

  /////////////////////////////////////////////////
  return (
    <div id="category-form" className="category-form-container">

      <div className="category-form-header">
        <div className="category-form-header-text">
          Categorias
        </div>
      </div>
      <div className="category-form-buttons">
        <button className="button" onClick={() => handleSubmit()}>
          Salvar
        </button>
        <button
          className="category-form-button"
          onClick={() => store.dispatch(actionCategoryList())}
        >
          Cancelar
          </button>
      </div>
      <div className="category-form-title">
        <div className="category-form-title-text">Dados Cadastrais</div>
      </div>

      <main>
        <form onSubmit={handleSubmit}>
          <div className="category-form-form-columns">

            {/* DescriptionCategory */}
            <div className="input-block">
              <label htmlFor="DescriptionCategory">Descrição da Categoria</label>
              <input
                className="category-form-input-txt"
                name="DescriptionCategory"
                id="DescriptionCategory"
                required
                autoComplete="new-password"
                value={DescriptionCategory}
                onChange={(e) => setDescriptionCategory(e.target.value)}
              />
            </div>

          </div>
        </form>
      </main>
    </div>
  );
}

export default CategoryForm;
