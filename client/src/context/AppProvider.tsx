import { ReactElement, useState } from "react";
import { IContextData } from "../interfaces/provider";
import AppContext from "./AppContext";

interface AppProviderProps {
  children: ReactElement;
}

function AppProvider({ children }: AppProviderProps) {
  const [contextData, setContextData] = useState<IContextData>({
    user: {
      username: "",
    },
    logged: false,
  });

  const handleContextData = (data: IContextData) => {
    setContextData({
      user: {
        username: data.user.username,
      },
      logged: data.logged,
    });
  };

  return (
    <AppContext.Provider value={{ contextData, handleContextData }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
