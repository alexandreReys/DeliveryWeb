const INITIAL_STATE = {
  IdVeiculo: "",
  IdClienteVeiculo: "",
  DescricaoVeiculo: "",
  PlacaVeiculo: "",
  MarcaVeiculo: "",
  ModeloVeiculo: "",
  AnoVeiculo: "",
  CorVeiculo: "",
  operacaoVeiculo: "list",
};

export default function veiculoReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "ACTION_VEICULO_LIST":
      return functionList();
    case "ACTION_VEICULO_ADD":
      return functionAdd(state);
    case "ACTION_VEICULO_EDIT":
      return functionEdit(state, action);
    case "ACTION_VEICULO_DELETE":
      return functionDelete();
    default:
      return state;
  }
}

const functionList = () => INITIAL_STATE;
const functionAdd = (state) => ({
  ...state,
  IdVeiculo: "",
  IdClienteVeiculo: "",
  DescricaoVeiculo: "",
  PlacaVeiculo: "",
  MarcaVeiculo: "",
  ModeloVeiculo: "",
  AnoVeiculo: "",
  CorVeiculo: "",
  operacaoVeiculo: "add",
});
const functionEdit = (state, { dadosVeiculo }) => {
  return {
    ...state,
    IdVeiculo: dadosVeiculo.IdVeiculo,
    IdClienteVeiculo: dadosVeiculo.IdClienteVeiculo,
    DescricaoVeiculo: dadosVeiculo.DescricaoVeiculo,
    PlacaVeiculo: dadosVeiculo.PlacaVeiculo,
    MarcaVeiculo: dadosVeiculo.MarcaVeiculo,
    ModeloVeiculo: dadosVeiculo.ModeloVeiculo,
    AnoVeiculo: dadosVeiculo.AnoVeiculo,
    CorVeiculo: dadosVeiculo.CorVeiculo,
    operacaoVeiculo: "edit",
  };
};
const functionDelete = (state) => ({ ...state, operacaoVeiculo: "delete" });
