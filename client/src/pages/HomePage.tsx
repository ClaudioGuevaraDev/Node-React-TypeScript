import useCheckUserLogged from "../hooks/useCheckUserLogged";

function HomePage() {
  useCheckUserLogged({ section: "home" });

  return <h1>Home Page</h1>;
}

export default HomePage;
