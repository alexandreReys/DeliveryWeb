import React from "react";
import store from "store";
import logo from "assets/img/logo.png";
import { actionSelectProduct } from "store/actions";
import { history } from "routes/history";
import { moneyMask } from "utils/masks";

import "./styles.css";

function MainItem({ vinho, onDelete }) {
  if (!vinho.PrecoVinho) {
    history.push("/");
    return false;
  }

  const precoVinho = moneyMask(vinho.PrecoVinho);

  return (
    <li
      className="main-item"
      onClick={() => {
        const product = {
          id: vinho.IdVinho,
          description: vinho.DescricaoVinho,
          quantity: 1,
          price: vinho.PrecoVinho,
          image: vinho.Imagem1Vinho,
        };
        store.dispatch(actionSelectProduct(product));
        history.push("/selected-product");
      }}
    >
      <header>
        {!!vinho.Imagem1Vinho && (
          <img src={vinho.Imagem1Vinho} alt="loading ..." />
        )}
        {!vinho.Imagem1Vinho && <img src={logo} alt="loading ..." />}
      </header>
      <hr />
      <div>
        <strong className="title">{vinho.DescricaoVinho}</strong>
      </div>
      <content>
        <strong className="price">{precoVinho}</strong>
      </content>
    </li>
  );
}

export default MainItem;
