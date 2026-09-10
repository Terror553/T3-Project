import { LoginForm } from "~/components/loginForm";

export default function LoginPage() {
  return (
    <div className="content">
      <div className="page-header mb-3"><h1 className="h3">Log In</h1></div>
      <div className="card">
        <div className="card-header">Log In</div>
        <div className="card-body">
          <div className="row justify-content-center">
            <div className="col-lg-5">
              <LoginForm />
              <div>
                <div className="separator">Not registered yet?</div>
                <a href="/register" className="btn btn-secondary btn-block">
                  Register
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
