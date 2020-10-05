const INITIAL_STATE = {
  deliverymen: [],
  Id: "",
  email: "",
  password: "",
  name: "",
  operacaoDeliveryman: "list",
};

export default function deliverymanReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "ACTION_DELIVERYMAN_GET":    return functionGet(state, action);
    case "ACTION_DELIVERYMAN_LIST":   return functionList(state);
    case "ACTION_DELIVERYMAN_ADD":    return functionAdd(state);
    case "ACTION_DELIVERYMAN_EDIT":   return functionEdit(state, action);
    case "ACTION_DELIVERYMAN_DELETE": return functionDelete();
    default: return state;
  };
};

const functionGet = (state, { deliverymen }) => {
  return {
    ...state,
    deliverymen: deliverymen,
  };
};

const functionList = (state) => ({
  ...state,
  Id: "",
  email: "",
  password: "",
  name: "",
  operacaoDeliveryman: "list",
});

const functionAdd = (state) => ({
  ...state,
  Id: "",
  email: "",
  password: 0,
  name: "",
  operacaoDeliveryman: "add",
});

const functionEdit = (state, { dados }) => {
  return {
    ...state,
    Id: dados.Id,
    email: dados.email,
    password: dados.password,
    name: dados.name,
    operacaoDeliveryman: "edit",
  };
};

const functionDelete = (state) => ({ ...state, operacaoDeliveryman: "delete" });
