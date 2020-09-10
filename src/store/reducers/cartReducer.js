const INITIAL_STATE = {
  item: [],
  addedItems: [], // id, description, quantity, price, image
  quantityOfItems: 0,
  subtotal: 0,
  shipping: 0,
  total: 0,
  paymentType: "",
  changeValue: 0,
};

/////////////////////////////////////////////////////////////////////
export default function cartReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "ACTION_CART_RESET":
      return actionCartReset(state);

    case "ACTION_SELECT_PRODUCT":
      return actionSelectProduct(state, action);

    case "ACTION_ADD_TO_CART":
      return actionAddToCart(state, action);

    case "ACTION_SUB_FROM_CART":
      return actionSubFromCart(state, action);

    case "ACTION_REMOVE_FROM_CART":
      return actionRemoveFromCart(state, action);

    case "ACTION_SELECT_PAYMENT_TYPE":
      return actionSelectPaymentType(state, action);

    default:
      return state;
  }
}

/////////////////////////////////////////////////////////////////////
const actionCartReset = (state) => {
  return {
    ...state,
    item: [],
    addedItems: [],
    quantityOfItems: 0,
    subtotal: 0,
    shipping: 0,
    total: 0,
    paymentType: "",
    changeValue: 0,
  };
};

const actionSelectProduct = (state, { product }) => {
  return {
    ...state,
    item: product,
  };
};

// itemToAdd = id:  description:  quantity:  price:  image:
const actionAddToCart = (state, { itemToAdd }) => {
  const addedItems = [...state.addedItems, itemToAdd];
  const addedItem = state.addedItems.find((item) => item.id === itemToAdd.id);
  let itemTotal = itemToAdd.price * itemToAdd.quantity;

  if (addedItem) {
    addedItem.quantity += itemToAdd.quantity;
    return {
      ...state,
      quantityOfItems: state.quantityOfItems + itemToAdd.quantity,
      subtotal: state.subtotal + itemTotal,
      total: state.subtotal + itemTotal + state.shipping,
    };
  } else {
    return {
      ...state,
      addedItems: addedItems,
      quantityOfItems: state.quantityOfItems + itemToAdd.quantity,
      subtotal: state.subtotal + itemTotal,
      total: state.subtotal + itemTotal + state.shipping,
    };
  }
};

// itemToSub = id:  quantity:  price:
const actionSubFromCart = (state, { itemToSub }) => {
  const addedItem = state.addedItems.find((item) => item.id === itemToSub.id);
  let itemTotal = itemToSub.price * itemToSub.quantity;

  if (addedItem) {
    if (addedItem.quantity === 1) {
      return { ...state };
    }

    addedItem.quantity -= itemToSub.quantity;
    return {
      ...state,
      quantityOfItems: state.quantityOfItems - itemToSub.quantity,
      subtotal: state.subtotal - itemTotal,
      total: state.subtotal - itemTotal + state.shipping,
    };
  }
};

const actionRemoveFromCart = (state, { itemToRemove }) => {
  const removedItem = state.addedItems.find(
    (item) => item.id === itemToRemove.id
  );
  let itemTotal = removedItem.price * removedItem.quantity;

  if (removedItem) {
    return {
      ...state,
      addedItems: state.addedItems.filter(
        (item) => item.id !== itemToRemove.id
      ),
      quantityOfItems: state.quantityOfItems - removedItem.quantity,
      subtotal: state.subtotal - itemTotal,
      total: state.subtotal - itemTotal + state.shipping,
    };
  }
  return { ...state };
};

const actionSelectPaymentType = (state, { paymentTypeData }) => {
  return {
    ...state,
    paymentType: paymentTypeData.paymentType,
    changeValue: paymentTypeData.changeValue,
  };
};