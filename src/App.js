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
    <Router basename={'/app'}>
      <div className="App">
        <header className="App-header">
          <Switch>
            <Route path={`${process.env.PUBLIC_URL}/`}>
              <PublicPage />
            </Route>
            <Route path={`${process.env.PUBLIC_URL}/public`}>
              <PublicPage />
            </Route>
            <Route path={`${process.env.PUBLIC_URL}/login`}>
              <LoginPage />
            </Route>
            <PrivateRoute path={`${process.env.PUBLIC_URL}/protected`}>
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
    <p>Usted no ha ingresado.</p>
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
          <ul>
            <li>
              <Link to="/public">Public Page</Link>
            </li>
            <li>
              <Link to="/protected">Protected Page</Link>
            </li>
          </ul>
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
