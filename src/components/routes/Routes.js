import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import Home from "../../pages/home/Home";
import Login from "../../pages/login/Login";
import Oficinas from "../../pages/oficinas/Oficinas";
import Clientes from "../../pages/clientes/Clientes";
import Veiculos from "../../pages/veiculos/Veiculos";

const Routes = () => (
  <Switch>
    <PrivateRoute exact path="/" component={Home} />
    <Route exact path="/login" component={Login} />
    <PrivateRoute path="/oficinas" component={Oficinas} />
    <PrivateRoute path="/clientes" component={Clientes} />
    <PrivateRoute path="/veiculos" component={Veiculos} />
  </Switch>
);

export default Routes;
