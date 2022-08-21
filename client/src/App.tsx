import { Toaster } from "react-hot-toast";

import "bootswatch/dist/cyborg/bootstrap.min.css";
import Router from "./router/Router";

function App() {
  return (
    <>
      <Router />
      <Toaster />
    </>
  );
}

export default App;
