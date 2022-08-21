import { useContext } from "react";
import AppContext from "../context/AppContext";
import useCheckUserLogged from "../hooks/useCheckUserLogged";

function DashboardPage() {
  useCheckUserLogged({ section: "dashboard" });
  const { contextData } = useContext(AppContext);

  return (
    <div className="container p-4">
      <h1 className="text-white h3">{contextData.user.username}</h1>
    </div>
  );
}

export default DashboardPage;
