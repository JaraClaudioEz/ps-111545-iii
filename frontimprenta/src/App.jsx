import React from "react";
import { Switch, Route, Link } from "react-router-dom";

import Login from "./components/login";
import Navbar from "./components/navbar";
import Inicio from "./components/inicio";
import Producto from "./components/producto";
import ListaProductos from "./components/lista-productos";
import AddProducto from "./components/agregar-producto";
import Autorizacion from "./components/autorizacion";

const App = () => {

  const [user, setUser] = React.useState(null);
  async function login(user = null) {
    setUser(user)
  }
  async function logout() {
    setUser(null)
  }

  return (
    <div className="container mt-3">
      <Navbar />
      
      <Switch>
        <Route exact path={["/", "/imprenta"]} component={Inicio} usuario={user} />
        <Route
          exact path="/productos"
          render={(props) => (
            <ListaProductos {...props} user={user} />
          )}
        />
        <Route
          path="/productos/agregar/:id"
          render={(props) => (
            <AddProducto {...props} user={user} />
          )}
        />
        <Route
          path="/productos/agregar"
          render={(props) => (
            <AddProducto {...props} user={user} />
          )}
        />
        <Route
          path="/productos/:id"
          render={(props) => (
            <Producto {...props} user={user} />
          )}
        />
        <Route
          path="/autorizacion"
          render={(props) => (
            <Autorizacion {...props} login={Autorizacion} />
          )}
        />
      </Switch>
      
    </div>
  );
}

export default App;
