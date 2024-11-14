import { DataState } from "./DataContext";

type ActionsProps =
  | { type: "login"; payload: any }
  | { type: "setUser"; payload: any }


  

export const dataReducer = (state: DataState, actions: ActionsProps): DataState => {
  switch (actions.type) {
    case "login":
      return {
        ...state,
        user: actions.payload, // Manejo del login
      };

    case "setUser":
      return {
        ...state,
        user: actions.payload,
      };
    default:
      return state;
  }
};
