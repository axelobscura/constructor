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
import LayoutEntrada from './components/LayoutEntrada';
import Logotipo from './components/Logo';
import Dashboard from './components/Dashboard';

import './App.css';

export default function App() {
  return (
    <Router basename={'/www.constructor.com/app/'}>
          <Switch>
            <Route exact path="/">
              <LayoutEntrada>
                <PublicPage />
              </LayoutEntrada>
            </Route>
            <Route exact path="/public">
              <LayoutEntrada>
                <PublicPage />
              </LayoutEntrada>
            </Route>
            <Route exact path="/login">
              <LayoutEntrada>
                <LoginPage />
              </LayoutEntrada>
            </Route>
            <PrivateRoute exact path="/protected">
              <Dashboard />
            </PrivateRoute>
          </Switch>
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
      <p>GRACIAS POR VISITARNOS!</p>
      <p><small>A continuación encontrará sus cotizaciones.</small></p>
      <button onClick={login} type="button" class="btn btn-dark">INGRESAR AL ADMINISTRADOR</button>
    </div>
  );
}
