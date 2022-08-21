import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

function NavbarComponent() {
  const { contextData, handleContextData } = useContext(AppContext);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const { data } = await axios.get("/api/auth/logout");
      toast.success(data.message);
      handleContextData({
        logged: false,
        user: {
          username: "",
        },
      });
      navigate("/");
    } catch (error: any) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          Node + React + TypeScript
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {contextData.logged === false ? (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    <button className="btn btn-primary">INICIAR SESIÓN</button>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    <button className="btn btn-info">REGISTRARSE</button>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/dashboard" className="nav-link">
                    <button className="btn btn-warning">Dashboard</button>
                  </Link>
                </li>
                <li className="nav-item">
                  <span className="nav-link">
                    <button className="btn btn-danger" onClick={logout}>
                      CERRAR SESIÓN
                    </button>
                  </span>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavbarComponent;
