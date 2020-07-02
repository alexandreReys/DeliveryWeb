const INITIAL_STATE = {
  name: "",
  document: "",
  phoneNumber: "",
  addressType: "Residencial",
  postalCode: "",
  street: "",
  number: "",
  complement: "",
  info: "",
  neighborhood: "",
  city: "",
  state: "SP",
};

export default function deliveryAddressReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "ACTION_GET_DELIVERY_ADDRESS":
      return getDeliveryAddress(state);
    case "ACTION_DELIVERY_ADDRESS_SAVE":
      return deliveryAddressSave(state, action);
    default:
      return state;
  }
}

const getDeliveryAddress = (state) => {
  return {
    ...state,
    name: localStorage.getItem("customer-name"),
    document: localStorage.getItem("customer-document"),
    phoneNumber: localStorage.getItem("customer-phoneNumber"),
    addressType: localStorage.getItem("deliveryAddress-addressType")
      ? localStorage.getItem("deliveryAddress-addressType")
      : "Residencial",
    postalCode: localStorage.getItem("deliveryAddress-postalCode"),
    street: localStorage.getItem("deliveryAddress-street"),
    number: localStorage.getItem("deliveryAddress-number"),
    complement: localStorage.getItem("deliveryAddress-complement"),
    info: localStorage.getItem("deliveryAddress-info"),
    neighborhood: localStorage.getItem("deliveryAddress-neighborhood"),
    city: localStorage.getItem("deliveryAddress-city"),
    state: localStorage.getItem("deliveryAddress-state")
      ? localStorage.getItem("deliveryAddress-state")
      : "SP",
  };
};

const deliveryAddressSave = (state, { address }) => {
  localStorage.setItem("customer-name", address.name);
  localStorage.setItem("customer-document", address.document);
  localStorage.setItem("customer-phoneNumber", address.phoneNumber);
  localStorage.setItem("deliveryAddress-addressType", address.addressType);
  localStorage.setItem("deliveryAddress-postalCode", address.postalCode);
  localStorage.setItem("deliveryAddress-street", address.street);
  localStorage.setItem("deliveryAddress-number", address.number);
  localStorage.setItem("deliveryAddress-complement", address.complement);
  localStorage.setItem("deliveryAddress-info", address.info);
  localStorage.setItem("deliveryAddress-neighborhood", address.neighborhood);
  localStorage.setItem("deliveryAddress-city", address.city);
  localStorage.setItem("deliveryAddress-state", address.state);

  return {
    ...state,
    name: address.name,
    document: address.document,
    phoneNumber: address.phoneNumber,
    addressType: address.addressType,
    postalCode: address.postalCode,
    street: address.street,
    number: address.number,
    complement: address.complement,
    info: address.info,
    neighborhood: address.neighborhood,
    city: address.city,
    state: address.state,
  };
};
