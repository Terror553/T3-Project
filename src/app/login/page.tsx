import { LoginForm } from "~/components/loginForm";

export default function LoginPage() {
  return (
    <div className="content">
      <h2>Login</h2>
      <div className="card">
        <div className="card-body">
          <div className="row justify-content-center">
            <div className="col-lg-5">
              <LoginForm />
              <div>
                <div className="separator">Noch nicht registriert?</div>
                <a href="/register" className="btn btn-success btn-block">
                  Regestrieren
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
