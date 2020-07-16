import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import Home from "pages/admin/home/Home";
import Login from "pages/admin/login/Login";
import Products from "pages/admin/products/Products";
import Orders from "pages/admin/orders/Orders";
import Main from "pages/shopping/main/Main";
import ShoppingCart from "pages/shopping/shopping-cart/ShoppingCart";
import SelectedProduct from "pages/shopping/selected-product/SelectedProduct";
import DeliveryAddress from "pages/shopping/delivery-address/DeliveryAddress";
import PurchaseConfirmation from "pages/shopping/payment-confirmation/PaymentConfirmation";
import OrderConfirmation from "pages/shopping/order-confirmation/OrderConfirmation";
import ShoppingList from "pages/shopping/shopping-list/ShoppingList";

import TestModal from "components/modal/testModal";
import TestPrint from "components/print/TestPrint";
import ShoppingListCateg from "pages/shopping/shopping-list-categ/ShoppingListCateg";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={ShoppingList} />
    <Route exact path="/shopping-list-categ" component={ShoppingListCateg} />
    <Route path="/home" component={Home} />
    <Route exact path="/login" component={Login} />
    <PrivateRoute path="/admin" component={Home} />
    <PrivateRoute path="/products" component={Products} />
    <PrivateRoute path="/orders" component={Orders} />
    <Route path="/shopping-cart" component={ShoppingCart} />
    <Route path="/selected-product" component={SelectedProduct} />
    <Route path="/delivery-address" component={DeliveryAddress} />
    <Route path="/purchase-confirmation" component={PurchaseConfirmation} />
    <Route path="/order-confirmation" component={OrderConfirmation} />

    <Route path="/test-modal" component={TestModal} />
    <Route path="/test-print" component={TestPrint} />
    <Route path="/main" component={Main} />
    <Route component={Main} />
  </Switch>
);

export default Routes;
