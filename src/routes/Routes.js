import AddressConfirmation from "components/modal/address-confirmation/addressConfirmation";
import TestModal from "components/modal/testModal";
import TestPrint from "components/print/TestPrint";
import CategoryListPosition from "pages/admin/category-list-position/CategoryListPosition";
import Category from "pages/admin/category/Category";
import Deliveryman from "pages/admin/deliveryman/Deliveryman";
import Home from "pages/admin/home/Home";
import Login from "pages/admin/login/Login";
import Notifications from "pages/admin/notifications/Notifications";
import Orders from "pages/admin/orders/Orders";
import ProductDeactivate from "pages/admin/product-deactivate/ProductDeactivate";
import ProductPromotion from "pages/admin/product-promotion/ProductPromotion";
import Products from "pages/admin/products/Products";
import Settings from "pages/admin/settings/Settings";
import Delivery from "pages/shopping/about/delivery/Delivery";
import Employment from "pages/shopping/about/employment/Employment";
import Payment from "pages/shopping/about/payment/Payment";
import PrivacyPolicy from "pages/shopping/about/privacy-policiy/PrivacyPolicy";
import DeliveryAddress from "pages/shopping/delivery-address/DeliveryAddress";
import OrderConfirmation from "pages/shopping/order-confirmation/OrderConfirmation";
import PurchaseConfirmation from "pages/shopping/payment-confirmation/PaymentConfirmation";
import SelectedProduct from "pages/shopping/selected-product/SelectedProduct";
import ShoppingCart from "pages/shopping/shopping-cart/ShoppingCart";
import ShoppingListCateg from "pages/shopping/shopping-list-categ/ShoppingListCateg";
import ShoppingList from "pages/shopping/shopping-list/ShoppingList";
import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

const Routes = () => (
  <Switch>
    {/* <Route exact path="/" component={ShoppingList} /> */}

    {/* <PrivateRoute exact path="/" component={Products} /> */}
    <PrivateRoute exact path="/" component={ShoppingList} />
    <Route exact path="/shop" component={ShoppingList} />
    <Route exact path="/shopping-list-categ" component={ShoppingListCateg} />
    
    <Route path="/home" component={Home} />
    <Route exact path="/login" component={Login} />
    <PrivateRoute path="/admin" component={Products} />
    <PrivateRoute path="/products" component={Products} />
    <PrivateRoute path="/orders" component={Orders} />
    <PrivateRoute path="/notifications" component={Notifications} />
    <PrivateRoute path="/deliveryman" component={Deliveryman} />
    <PrivateRoute path="/category" component={Category} />
    <PrivateRoute path="/settings" component={Settings} />
    <PrivateRoute path="/product-deactivate" component={ProductDeactivate} />
    <PrivateRoute path="/product-promotion" component={ProductPromotion} />
    <PrivateRoute path="/category-list-position" component={CategoryListPosition} />

    <Route path="/shopping-cart" component={ShoppingCart} />
    <Route path="/selected-product" component={SelectedProduct} />
    <Route path="/delivery-address" component={DeliveryAddress} />
    <Route path="/purchase-confirmation" component={PurchaseConfirmation} />
    <Route path="/order-confirmation" component={OrderConfirmation} />

    <Route path="/privacy-policy" component={PrivacyPolicy} />
    <Route path="/about-privacy-policy" component={PrivacyPolicy} />
    <Route path="/about-payment" component={Payment} />
    <Route path="/about-delivery" component={Delivery} />
    <Route path="/about-employment" component={Employment} />
    <Route path="/address-confirmation" component={AddressConfirmation} />

    <Route path="/test-modal" component={TestModal} />
    <Route path="/test-print" component={TestPrint} />

    <Route component={Products} />
    {/* <Route component={ShoppingList} /> */}
  </Switch>
);

export default Routes;
