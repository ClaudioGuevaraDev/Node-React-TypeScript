import axios from "axios";
import ReactDOM from "react-dom/client";
import App from "./App";

axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App />
);
