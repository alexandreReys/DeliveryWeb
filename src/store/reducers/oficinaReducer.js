const INITIAL_STATE = {
  IdOficina: "",
  FantasiaOficina: "",
  NomeOficina: "",
  EnderecoOficina: "",
  NumeroOficina: "",
  BairroOficina: "",
  CidadeOficina: "",
  EstadoOficina: "",
  CepOficina: "",
  ContatoOficina: "",
  TelefoneOficina: "",
  operacaoOficina: "list",
};

export default function oficinaReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "ACTION_OFICINA_LIST":
      return functionList();
    case "ACTION_OFICINA_ADD":
      return functionAdd(state);
    case "ACTION_OFICINA_EDIT":
      return functionEdit(state, action);
    case "ACTION_OFICINA_DELETE":
      return functionDelete();
    default:
      return state;
  }
}

const functionList = () => INITIAL_STATE;
const functionAdd = (state) => ({
  ...state,
  IdOficina: "",
  FantasiaOficina: "",
  NomeOficina: "",
  EnderecoOficina: "",
  NumeroOficina: "",
  BairroOficina: "",
  CidadeOficina: "",
  EstadoOficina: "",
  CepOficina: "",
  ContatoOficina: "",
  TelefoneOficina: "",
  operacaoOficina: "add",
});
const functionEdit = (state, { dadosOficina }) => {
  return {
    ...state,
    IdOficina: dadosOficina.IdOficina,
    FantasiaOficina: dadosOficina.FantasiaOficina,
    NomeOficina: dadosOficina.NomeOficina,
    EnderecoOficina: dadosOficina.EnderecoOficina,
    NumeroOficina: dadosOficina.NumeroOficina,
    BairroOficina: dadosOficina.BairroOficina,
    CidadeOficina: dadosOficina.CidadeOficina,
    EstadoOficina: dadosOficina.EstadoOficina,
    CepOficina: dadosOficina.CepOficina,
    ContatoOficina: dadosOficina.ContatoOficina,
    TelefoneOficina: dadosOficina.TelefoneOficina,
    operacaoOficina: "edit",
  };
};
const functionDelete = (state) => ({ ...state, operacaoOficina: "delete" });
