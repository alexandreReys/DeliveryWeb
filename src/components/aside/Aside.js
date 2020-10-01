import React from "react";
import { history } from "routes/history";
import store from "store";
import { actionSetOrderOperation } from "store/actions";

import "./styles.css";

const Aside = () => {
  return (
    <aside className="app-aside">
      <div className="container-aside">
        <p
          onClick={() => {
            history.push("/orders");
            store.dispatch(actionSetOrderOperation("list"));
            return;
          }}
        >
          Pedidos
        </p>

        <p
          onClick={() => {
            history.push("/products");
            return;
          }}
        >
          Produtos
        </p>

        <p
          onClick={() => {
            history.push("/notifications");
            return;
          }}
        >
          Notificações
        </p>
      </div>
    </aside>
  );
};

export default Aside;
