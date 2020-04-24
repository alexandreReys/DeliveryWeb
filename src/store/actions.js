export function actionLogout() {
  return { type: "ACTION_LOGOUT" };
}
export function actionLogin(user) {
  return { type: "ACTION_LOGIN", user };
}

export function actionOficinaAdd() {
  return { type: "ACTION_OFICINA_ADD" };
}
export function actionOficinaEdit(dadosOficina) {
  return { type: "ACTION_OFICINA_EDIT", dadosOficina };
}
export function actionOficinaDelete() {
  return { type: "ACTION_OFICINA_DELETE" };
}
export function actionOficinaList() {
  return { type: "ACTION_OFICINA_LIST" };
}

export function actionClienteAdd() {
  return { type: "ACTION_CLIENTE_ADD" };
}
export function actionClienteEdit(dadosCliente) {
  return { type: "ACTION_CLIENTE_EDIT", dadosCliente };
}
export function actionClienteDelete() {
  return { type: "ACTION_CLIENTE_DELETE" };
}
export function actionClienteList() {
  return { type: "ACTION_CLIENTE_LIST" };
}

export function actionVeiculoAdd() {
  return { type: "ACTION_VEICULO_ADD" };
}
export function actionVeiculoEdit(dadosVeiculo) {
  return { type: "ACTION_VEICULO_EDIT", dadosVeiculo };
}
export function actionVeiculoDelete() {
  return { type: "ACTION_VEICULO_DELETE" };
}
export function actionVeiculoList() {
  return { type: "ACTION_VEICULO_LIST" };
}
