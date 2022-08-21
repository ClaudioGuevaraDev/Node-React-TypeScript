import { createContext } from "react";
import { IDefaultState } from "../interfaces/provider";

const defaultState: IDefaultState = {
  contextData: {
    logged: false,
    user: {
      username: "",
    },
  },
  handleContextData(data) {},
};

const AppContext = createContext(defaultState);

export default AppContext;
