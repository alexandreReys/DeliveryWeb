import React, { useState } from "react";
import store from "store";
import { actionDeliverymanList } from "store/actions";

import "./styles.css";

function DeliverymanForm({ propSubmit }) {
  const [Id] = useState(store.getState().deliverymanState.Id);
  const [email, setEmail] = useState(store.getState().deliverymanState.email);
  const [password, setPassword] = useState(store.getState().deliverymanState.password);
  const [name, setName] = useState(store.getState().deliverymanState.name);

  /////////////////////////////////////////////////
  async function handleSubmit() {
    // e.preventDefault();

    const formData = { Id, email, password, name };

    store.dispatch(actionDeliverymanList());
    await propSubmit(formData);
  }

  /////////////////////////////////////////////////
  return (
    <div id="product-form" className="product-form-container">

      <div className="product-form-header">
        <div className="product-form-header-text">
          Entregadores
        </div>
      </div>
      <div className="product-form-buttons">
        <button className="button" onClick={() => handleSubmit()}>
          Salvar
        </button>
        <button
          className="product-form-button"
          onClick={() => store.dispatch(actionDeliverymanList())}
        >
          Cancelar
          </button>
      </div>
      <div className="product-form-title">
        <div className="product-form-title-text">Dados Cadastrais</div>
      </div>

      <main>
        <form onSubmit={handleSubmit}>
          <div className="product-form-form-columns">

            {/* email */}
            <div className="input-block">
              <label htmlFor="email">Usuário</label>
              <input
                className="product-form-input-txt"
                name="email"
                id="email"
                required
                autoComplete="new-password"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* password */}
            <div className="input-block">
              <label htmlFor="password">Senha</label>
              <input
                className="product-form-input-txt"
                name="password"
                id="password"
                required
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* name */}
            <div className="input-block">
              <label htmlFor="name">Nome do entregador</label>
              <input
                className="product-form-input-txt"
                name="name"
                id="name"
                required
                autoComplete="new-password"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

          </div>
        </form>
      </main>
    </div>
  );
}

export default DeliverymanForm;
