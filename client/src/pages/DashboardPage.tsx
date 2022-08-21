import useCheckUserLogged from "../hooks/useCheckUserLogged";

function DashboardPage() {
  useCheckUserLogged({ section: "dashboard" });

  return <div>DashboardPage</div>;
}

export default DashboardPage;
