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
