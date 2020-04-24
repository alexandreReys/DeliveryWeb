const INITIAL_STATE = {
  IdCliente: "",
  NomeCliente: "",
  EnderecoCliente: "",
  NumeroCliente: "",
  BairroCliente: "",
  CidadeCliente: "",
  EstadoCliente: "",
  CepCliente: "",
  TelefoneCliente: "",
  operacaoCliente: "list",
};

export default function clienteReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "ACTION_CLIENTE_LIST":
      return functionList();
    case "ACTION_CLIENTE_ADD":
      return functionAdd(state);
    case "ACTION_CLIENTE_EDIT":
      return functionEdit(state, action);
    case "ACTION_CLIENTE_DELETE":
      return functionDelete();
    default:
      return state;
  }
}

const functionList = () => INITIAL_STATE;
const functionAdd = (state) => ({
  ...state,
  IdCliente: "",
  NomeCliente: "",
  EnderecoCliente: "",
  NumeroCliente: "",
  BairroCliente: "",
  CidadeCliente: "",
  EstadoCliente: "",
  CepCliente: "",
  TelefoneCliente: "",
  operacaoCliente: "add",
});
const functionEdit = (state, { dadosCliente }) => {
  return {
    ...state,
    IdCliente: dadosCliente.IdCliente,
    NomeCliente: dadosCliente.NomeCliente,
    EnderecoCliente: dadosCliente.EnderecoCliente,
    NumeroCliente: dadosCliente.NumeroCliente,
    BairroCliente: dadosCliente.BairroCliente,
    CidadeCliente: dadosCliente.CidadeCliente,
    EstadoCliente: dadosCliente.EstadoCliente,
    CepCliente: dadosCliente.CepCliente,
    TelefoneCliente: dadosCliente.TelefoneCliente,
    operacaoCliente: "edit",
  };
};
const functionDelete = (state) => ({ ...state, operacaoCliente: "delete" });
