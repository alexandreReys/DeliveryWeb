import { combineReducers } from "redux";
import defaultReducer from "./reducers/defaultReducer";
import loginReducer from "./reducers/loginReducer";
import vinhoReducer from "./reducers/vinhoReducer";
import cartReducer from "./reducers/cartReducer";
import deliveryAddressReducer from "./reducers/deliveryAddressReducer";
import orderReducer from "./reducers/orderReducer";
import deliverymanReducer from "./reducers/deliverymanReducer";
import categoryReducer from "./reducers/categoryReducer";

export default combineReducers({
  defaultState: defaultReducer,
  loginState: loginReducer,
  vinhoState: vinhoReducer,
  cartState: cartReducer,
  deliveryAddressState: deliveryAddressReducer,
  orderState: orderReducer,
  deliverymanState: deliverymanReducer,
  categoryState: categoryReducer,
});
