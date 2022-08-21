import axios from "axios";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useCheckUserLogged from "../hooks/useCheckUserLogged";

function LoginPage() {
  useCheckUserLogged({ section: "login" })

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/auth/login", user);
      toast.success(data.message);
      navigate("/");
    } catch (error: any) {
      if (error.response.data.message) toast.error(error.response.data.message);
      setUser({
        email: "",
        password: "",
      });
    }
  };

  return (
    <div className="container p-4">
      <div className="row d-flex justify-content-center">
        <div className="col-xl-3">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email-input" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email-input"
                    className="form-control"
                    placeholder="example@gmail.com"
                    required
                    autoFocus={true}
                    value={user.email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password-input" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password-input"
                    className="form-control"
                    placeholder="********"
                    required
                    value={user.password}
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                  />
                </div>
                <button className="btn btn-primary w-100" type="submit">
                  INICIAR SESIÓN
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
