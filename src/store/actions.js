export function actionAdminModuleActivate() {
  return { type: "ACTION_ADMIN_MODULE_ACTIVATE" };
}
export function actionAdminModuleDeactivate() {
  return { type: "ACTION_ADMIN_MODULE_DEACTIVATE" };
}

export function actionLogin(user) {
  return { type: "ACTION_LOGIN", user };
}
export function actionLogout() {
  return { type: "ACTION_LOGOUT" };
}

export function actionVinhoGetProducts(products) {
  return { type: "ACTION_VINHO_GET_PRODUCTS", products };
}
export function actionVinhoAdd() {
  return { type: "ACTION_VINHO_ADD" };
}
export function actionVinhoEdit(dadosVinho) {
  return { type: "ACTION_VINHO_EDIT", dadosVinho };
}
export function actionVinhoDelete() {
  return { type: "ACTION_VINHO_DELETE" };
}
export function actionVinhoList() {
  return { type: "ACTION_VINHO_LIST" };
}
export function actionSetProductCategory(category) {
  return { type: "ACTION_SET_PRODUCT_CATEGORY", category };
}

export function actionCartReset() {
  return { type: "ACTION_CART_RESET" };
}
export function actionSelectProduct(product) {
  return { type: "ACTION_SELECT_PRODUCT", product };
}
export function actionAddToCart(itemToAdd) {
  return { type: "ACTION_ADD_TO_CART", itemToAdd };
}
export function actionSubFromCart(itemToSub) {
  return { type: "ACTION_SUB_FROM_CART", itemToSub };
}
export function actionRemoveFromCart(itemToRemove) {
  return { type: "ACTION_REMOVE_FROM_CART", itemToRemove };
}
export function actionSelectPaymentType(paymentTypeData) {
  return { type: "ACTION_SELECT_PAYMENT_TYPE", paymentTypeData };
}

export function actionGetDeliveryAddress() {
  return { type: "ACTION_GET_DELIVERY_ADDRESS" };
}
export function actionDeliveryAddressSave(address) {
  return { type: "ACTION_DELIVERY_ADDRESS_SAVE", address };
}

export function actionSetOrder(order) {
  return { type: "ACTION_SET_ORDER", order };
}
export function actionStoreOrder(order) {
  return { type: "ACTION_STORE_ORDER", order };
}
export function actionSetOrderOperation(operation) {
  return { type: "ACTION_SET_ORDER_OPERATION", operation };
}
export function actionSetSelectedStatus(selectedStatus) {
  return { type: "ACTION_SET_SELECTED_STATUS", selectedStatus };
}
export function actionGetOrders(orders) {
  return { type: "ACTION_GET_ORDERS", orders };
}
export function actionGetOrderItems(orderItems) {
  return { type: "ACTION_GET_ORDER_ITEMS", orderItems };
}
export function actionGetOrderHistory(orderHistory) {
  return { type: "ACTION_GET_ORDER_HISTORY", orderHistory };
}
