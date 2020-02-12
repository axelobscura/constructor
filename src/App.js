import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import Logotipo from './components/Logo';

import './App.css';

export default function App() {
  return (
    <Router basename={'/www.constructor.com/app/'}>
      <div className="App">
        <header className="App-header">
          <Switch>
            <Route exact path="/">
              <PublicPage />
            </Route>
            <Route exact path="/public">
              <PublicPage />
            </Route>
            <Route exact path="/login">
              <LoginPage />
            </Route>
            <PrivateRoute exact path="/protected">
              <ProtectedPage />
            </PrivateRoute>
          </Switch>
        </header>
      </div>
    </Router>
  );
}

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

function AuthButton() {
  let history = useHistory();

  return fakeAuth.isAuthenticated ? (
    <p>
      Benvenido!{" "}
      <button
        onClick={() => {
          fakeAuth.signout(() => history.push("/"));
        }}
      >
        Salir
      </button>
    </p>
  ) : (
    <p style={{fontSize: '0.5em', fontWeight: '100', padding: '20px'}}>NO HA INGRESADO</p>
  );
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        fakeAuth.isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

function PublicPage() {
  return(
    <div className="App">
        <header className="App-header">
          <Logotipo />
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                <i className="lni-users"></i>
              </span>
            </div>
            <input type="text" className="form-control" placeholder="Usuario" aria-label="Username" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                <i className="lni-lock"></i>
              </span>
            </div>
            <input type="text" className="form-control" placeholder="Password" aria-label="Username" aria-describedby="basic-addon1" />
          </div>
          <Link to="/protected">
            <button type="button" class="btn btn-dark">ENTRAR A SU CUENTA</button>
          </Link>
          <AuthButton />
        </header>
    </div>
  )
}

function ProtectedPage() {
  return <h3>Protected</h3>;
}

function LoginPage() {
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };
  let login = () => {
    fakeAuth.authenticate(() => {
      history.replace(from);
    });
  };

  return (
    <div>
      <p>Usted debe estar registrado para ver la página {from.pathname}</p>
      <button onClick={login}>Ingresar</button>
    </div>
  );
}
