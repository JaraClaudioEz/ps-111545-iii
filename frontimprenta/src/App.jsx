import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";

import Navbar from "./components/navbar";
import Inicio from "./components/inicio";
import Producto from "./components/producto";
import ListaProductos from "./components/lista-productos";
import AddProducto from "./components/agregar-producto";
import Autorizacion from "./components/autorizacion";

const App = () => {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('perfil')));

  return (
    <div className="container mt-3">
      <Navbar />

      <Switch>
        <Route exact path={["/", "/imprenta"]} component={Inicio} usuario={user} />
        <Route
          exact path="/productos"
          render={(props) => (
            <ListaProductos {...props} usuario={user} />
          )}
        />
        <Route
          path="/productos/agregar/:id"
          render={(props) => (
            <AddProducto {...props} usuario={user} />
          )}
        />
        <Route
          path="/productos/agregar"
          render={(props) => (
            <AddProducto {...props} usuario={user} />
          )}
        />
        <Route
          path="/productos/:id"
          render={(props) => (
            <Producto {...props} usuario={user} />
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
