import axios from "axios";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/auth/register", user);
      toast.success(data.message);
      navigate("/login");
    } catch (error: any) {
      if (error.response.data.message) toast.error(error.response.data.message);
    }
    setUser({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="container p-4">
      <div className="row d-flex justify-content-center">
        <div className="col-xl-3">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username-input" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username-input"
                    placeholder="Claudio Guevara"
                    required
                    autoFocus={true}
                    className="form-control"
                    value={user.username}
                    onChange={(e) =>
                      setUser({ ...user, username: e.target.value })
                    }
                  />
                </div>
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
                <button
                  className="btn btn-info w-100"
                  type="submit"
                  disabled={
                    user.username === "" ||
                    user.email === "" ||
                    user.password === ""
                  }
                >
                  REGISTRARSE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
