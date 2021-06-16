import React, { useState, useEffect } from "react";
import { Switch, Route, useLocation } from "react-router-dom";

import Navbar from "./components/navbar";
import Inicio from "./components/inicio";
import Producto from "./components/producto";
import ListaProductos from "./components/lista-productos";
import AddProducto from "./components/agregar-producto";
import Autorizacion from "./components/autorizacion";
import Usuario from "./components/usuario";
import Pedido from "./components/pedido";
import ListaPedidos from "./components/lista-pedidos";
import ListaUsuarios from "./components/lista-usuarios";

const App = () => {

  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('perfil')));
  }, [location]);

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
          path="/pedidos"
          render={(props) => (
            <ListaPedidos {...props} usuario={user} />
          )}
        />
        <Route
          path="/pedido"
          render={(props) => (
            <Pedido {...props} usuario={user} />
          )}
        />
        <Route
          path="/autorizacion"
          render={(props) => (
            <Autorizacion {...props} login={Autorizacion} />
          )}
        />
        <Route
          path="/usuarios"
          render={(props) => (
            <ListaUsuarios {...props} usuario={user} />
          )}
        />
        <Route
          path="/usuario/:nombre"
          render={(props) => (
            <Usuario {...props} usuario={user} />
          )}
        />
      </Switch>

    </div>
  );
}

export default App;
