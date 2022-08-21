function RegisterPage() {
  return (
    <div className="container p-4">
      <div className="row d-flex justify-content-center">
        <div className="col-xl-3">
          <div className="card">
            <div className="card-body">
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
                />
              </div>
              <button className="btn btn-info w-100">REGISTRARSE</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
