import React from "react";
import { Link } from "react-router-dom";
import * as loginService from "../../services/loginService";
import { connect } from "react-redux";
import store from "store";
import "./nav.css";

const Nav = ({ loggedUser }) => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      {/* navbar-brand */}
      <Link className="navbar-brand" to="/">
        {store.getState().defaultState.appTitle}
      </Link>

      {/* navbar-toggler-icon */}
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarsExampleDefault"
        aria-controls="navbarsExampleDefault"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul className="navbar-nav mr-auto">
          <li
            className="nav-item"
            data-toggle="collapse"
            data-target=".navbar-collapse.show"
          >
            <Link className="nav-link" to="/oficinas">
              Oficinas
            </Link>
          </li>

          <li
            className="nav-item"
            data-toggle="collapse"
            data-target=".navbar-collapse.show"
          >
            <Link className="nav-link" to="/clientes">
              Clientes
            </Link>
          </li>

          <li
            className="nav-item"
            data-toggle="collapse"
            data-target=".navbar-collapse.show"
          >
            <Link className="nav-link" to="/veiculos">
              Veiculos
            </Link>
          </li>
        </ul>

        {!!loggedUser && (
          <div
            className="logged-user text-light"
            data-toggle="collapse"
            data-target=".navbar-collapse.show"
          >
            <span>{loggedUser}</span>
            <button
              className="btn-logout ml-3"
              onClick={() => {
                loginService.logout();
              }}
            >
              Sair
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default connect((state) => ({
  loggedUser: state.loginState.loggedUser,
}))(Nav);
