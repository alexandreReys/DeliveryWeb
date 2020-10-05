const INITIAL_STATE = {
  categories: [],
  IdCategory: "",
  DescriptionCategory: "",
  operacaoCategory: "list",
};

export default function deliverymanReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "ACTION_CATEGORY_GET":    return functionGet(state, action);
    case "ACTION_CATEGORY_LIST":   return functionList(state);
    case "ACTION_CATEGORY_ADD":    return functionAdd(state);
    case "ACTION_CATEGORY_EDIT":   return functionEdit(state, action);
    case "ACTION_CATEGORY_DELETE": return functionDelete();
    default: return state;
  };
};

const functionGet = (state, { data }) => {
  return {
    ...state,
    categories: data,
  };
};

const functionList = (state) => ({
  ...state,
  IdCategory: "",
  DescriptionCategory: "",
  operacaoCategory: "list",
});

const functionAdd = (state) => ({
  ...state,
  IdCategory: "",
  DescriptionCategory: "",
  operacaoCategory: "add",
});

const functionEdit = (state, { dados }) => {
  return {
    ...state,
    IdCategory: dados.IdCategory,
    DescriptionCategory: dados.DescriptionCategory,
    operacaoCategory: "edit",
  };
};

const functionDelete = (state) => ({ ...state, operacaoCategory: "delete" });
