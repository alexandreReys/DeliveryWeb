import { api } from "./api";
import store from "store";
import {
  actionCartReset,
  actionSetOrder,
  actionGetOrders,
  actionGetOrderItems,
  actionGetOrderHistory,
} from "store/actions";

export const postOrder = async () => {
  let shoppingCart = store.getState().cartState;
  let deliveryAddress = store.getState().deliveryAddressState;
  let shortAddress = getAddress(deliveryAddress);

  let order = {
    quantityItemsOrder: shoppingCart.quantityOfItems,
    totalProductsOrder: shoppingCart.subtotal,
    shippingAmountOrder: shoppingCart.shipping,
    totalOrder: shoppingCart.total,
    changeValueOrder: shoppingCart.changeValue,
    paymantTypeOrder: shoppingCart.paymentType,
    customerNameOrder: deliveryAddress.name,
    customerDocumentOrder: deliveryAddress.document,
    customerPhoneNumberOrder: deliveryAddress.phoneNumber,
    customerAddressTypeOrder: deliveryAddress.addressType,
    customerAddressOrder: shortAddress,
    customerStreetOrder: deliveryAddress.street,
    customerNumberOrder: deliveryAddress.number,
    customerComplementOrder: deliveryAddress.complement,
    customerInfoOrder: deliveryAddress.info,
    customerNeighborhoodOrder: deliveryAddress.neighborhood,
    customerCityOrder: deliveryAddress.city,
    customerStateOrder: deliveryAddress.state,
    customerPostalCodeOrder: deliveryAddress.postalCode,
    deliveryManOrder: "",
    evaluationOrder: 0,
    evaluationReasonOrder: "",
    commentsOrder: "",
    statusOrder: "Pendente",

    orderItems: shoppingCart.addedItems,
  };

  let resp;
  try {
    resp = await api.post("/delivery-order", order);
  } catch (error) {
    console.error("ErrorMessage: ", error);
    return null;
  }

  order = { ...order, orderId: resp.data.insertId };
  store.dispatch(actionSetOrder(order));
  store.dispatch(actionCartReset());

  return;
};

export const getOrders = async (status) => {
  let orders = [];
  try {
    if (!status || status === "Todos") {
      orders = await api.get("/delivery-order");
    } else {
      orders = await api.get(`/delivery-order/status/${status}`);
    }
  } catch (error) {
    console.error("ErrorMessage: ", error);
    return null;
  }

  store.dispatch(actionGetOrders(orders.data));
  return orders.data;
};

export const getOrderItems = async (id) => {
  let ordersItems = [];
  try {
    ordersItems = await api.get(`/delivery-order/items/${id}`);
  } catch (error) {
    console.error("ErrorMessage: ", error);
    return null;
  }

  store.dispatch(actionGetOrderItems(ordersItems.data));
  return ordersItems.data;
};

export const getOrderHistory = async (id) => {
  let orderHistory = [];
  try {
    orderHistory = await api.get(`/delivery-order/history/${id}`);
  } catch (error) {
    console.error("ErrorMessage: ", error);
    return null;
  }

  store.dispatch(actionGetOrderHistory(orderHistory.data));
  return orderHistory.data;
};

export const rejectOrder = async (id) => {
  try {
    await api.put(`/delivery-order/reject/${id}`);
  } catch (error) {
    console.error("ErrorMessage: ", error);
    return null;
  }
  return;
};

export const deliveringOrder = async (id) => {
  try {
    await api.put(`/delivery-order/delivering/${id}`);
  } catch (error) {
    console.error("ErrorMessage: ", error);
    return null;
  }
  return;
};

export const deliveredOrder = async (id) => {
  try {
    await api.put(`/delivery-order/delivered/${id}`);
  } catch (error) {
    console.error("ErrorMessage: ", error);
    return null;
  }
  return;
};

export const getCep = async (postalCode) => {
  let address = [];
  try {
    address = await api.get(`/delivery-order/postal-code/${postalCode}`);
  } catch (error) {
    console.error("ErrorMessage: ", error);
    return null;
  }

  return address.data;
};

export const getAddress = (addr) => {
  let address = addr.street;

  address += addr.number ? ", " + addr.number : "";
  address += addr.neighborhood ? ", " + addr.neighborhood : "";
  address += addr.city ? ", " + addr.city : "";
  address += addr.state ? ", " + addr.state : "";
  address += addr.complement ? ", " + addr.complement : "";

  return address;
};

export const updateRatingOrder = async (id, rating) => {
  try {
    await api.put(`/delivery-order/rating/${id}/${rating}`);
  } catch (error) {
    console.error("ErrorMessage: updateRatingOrder error:", error);
    return null;
  }
  return;
};
