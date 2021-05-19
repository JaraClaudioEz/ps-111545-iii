import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import logo from "./assets/IntegralLogo.png";
//import {Navbar} from "react-bootstrap";

//import AddReview from "./components/add-review";
import Login from "./components/login";
import Producto from "./components/producto";
import ListaProductos from "./components/lista-productos";
//import ListaProductos from "./components/lista-productos";

function App() {

  const [user, setUser] = React.useState(null);

  async function login(user = null) {
    setUser(user)
  }

  async function logout() {
    setUser(null)
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "#e3f2fd" }}>
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img src={logo} alt="Integral Imagen" width="35%" height="30%" className="d-inline-block align-text-top" />
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/productos"} className="nav-link">
                  Productos
              </Link>
              </li>
              <li className="nav-item" >
                {user ? (
                  <a onClick={logout} className="nav-link" style={{ cursor: 'pointer' }}>
                    Logout {user.name}
                  </a>
                ) : (
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/imprenta"]} component={ListaProductos} />
          <Route
            path="/restaurants/:id/review"
            render={(props) => (
              <Producto {...props} user={user} />
            )}
          />
          <Route
            path="/restaurants/:id"
            render={(props) => (
              <Producto {...props} user={user} />
            )}
          />
          <Route
            path="/login"
            render={(props) => (
              <Login {...props} login={login} />
            )}
          />
        </Switch>
      </div>
    </div>
  );
}

export default App;
