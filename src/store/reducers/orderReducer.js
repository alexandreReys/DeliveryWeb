const INITIAL_STATE = {
  quantityItemsOrder: 0,
  totalProductsOrder: 0,
  shippingAmountOrder: 0,
  totalOrder: 0,
  paymantTypeOrder: "",
  customerNameOrder: "",
  customerAddressOrder: "",
  orderId: 0,
  operation: "list",
  selectedStatus: "Todos",
  orders: [],
  order: [],
  orderItems: [],
  orderHistory: [],
};

export default function orderReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "ACTION_SET_ORDER":
      return actionSetOrder(state, action);
    case "ACTION_GET_ORDERS":
      return actionGetOrders(state, action);
    case "ACTION_SET_ORDER_OPERATION":
      return actionSetOrderOperation(state, action);
    case "ACTION_SET_SELECTED_STATUS":
      return actionSetSelectedStatus(state, action);
    case "ACTION_STORE_ORDER":
      return actionStoreOrder(state, action);
    case "ACTION_GET_ORDER_ITEMS":
      return actionGetOrderItems(state, action);
    case "ACTION_GET_ORDER_HISTORY":
      return actionGetOrderHistory(state, action);
    default:
      return state;
  }
}

const actionStoreOrder = (state, { order }) => {
  return {
    ...state,
    order,
  };
};

const actionSetOrder = (state, { order }) => {
  return {
    ...state,
    quantityItemsOrder: order.quantityItemsOrder,
    totalProductsOrder: order.totalProductsOrder,
    shippingAmountOrder: order.shippingAmountOrder,
    totalOrder: order.totalOrder,
    paymantTypeOrder: order.paymantTypeOrder,
    customerNameOrder: order.customerNameOrder,
    customerAddressOrder: order.customerAddressOrder,
    orderItems: order.orderItems,
    orderId: order.orderId,
  };
};

const actionSetOrderOperation = (state, { operation }) => {
  return {
    ...state,
    operation,
  };
};

const actionSetSelectedStatus = (state, { selectedStatus }) => {
  return {
    ...state,
    selectedStatus,
  };
};

const actionGetOrders = (state, { orders }) => {
  return {
    ...state,
    orders,
  };
};

const actionGetOrderItems = (state, { orderItems }) => {
  return {
    ...state,
    orderItems,
  };
};

const actionGetOrderHistory = (state, { orderHistory }) => {
  return {
    ...state,
    orderHistory,
  };
};
