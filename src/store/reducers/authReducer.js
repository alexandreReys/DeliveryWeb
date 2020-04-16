const INITIAL_STATE = {
  loggedUser: process.env.appusername,
};

export default function authReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "ACTION_LOGIN":
      return { ...state, loggedUser: action.user };
    case "ACTION_LOGOUT":
      return { ...state, loggedUser: "" };
    default:
      return state;
  }
}
