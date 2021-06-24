import React, { useState, useEffect } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';

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

import PedidtoDataService from "./services/servicio-pedido";

const App = () => {

  const [user, setUser] = useState(null);
  const [pedido, setPedido] = useState({});
  const location = useLocation();

  //console.log(user);
  const fetchPedido = async () => {
    try {
      if (user !== null) {
        const { data } = await PedidtoDataService.getProductosPedido(user.result._id);
        setPedido(data);
        //console.log({ "Respuesta al traer pedido del usuario: ": data });
      }
      else {
        setPedido({});
      }

    } catch (error) {
      console.log(error);
    }
  };

  const agregarAlPedido = async (idProducto, cantidad) => {
    try {
      const { data } = await PedidtoDataService.addProductoPedido(user.result._id, idProducto, cantidad)
      //console.log(data);
      setPedido(data);
      //alert("Producto agregado con éxito!")
    } catch (error) {
      console.log(error);
    }
  };

  const handleQuitarItemPedido = async (idProducto) => {
    try {
      console.log(user.result._id);
      const { data } = await PedidtoDataService.deleteProductoPedido(user.result._id, idProducto);
      setPedido(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleVaciarPedido = async () => {
    const { data } = await PedidtoDataService.vaciarPedido(user.result._id);
    if(data !== null){
      setPedido(data);
    }
    else {
      setPedido({});
    };
    
  };

  console.log(pedido);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('perfil')));
    fetchPedido();
  }, [location]);

  return (
    <Container>
      <Row>
        <Col>
          <Navbar totalItems={pedido.items ? pedido.items.length : 0} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Switch>
            <Route exact path={["/", "/imprenta"]} component={Inicio} usuario={user} />
            <Route
              exact path="/productos"
              render={(props) => (
                <ListaProductos {...props} usuario={user} alAgregarAlPedido={agregarAlPedido} />
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
                <Producto {...props} usuario={user} alAgregarAlPedido={agregarAlPedido} />
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
                <Pedido {...props}
                 usuario={user} 
                 pedido={pedido}
                 agregarAlPedido={agregarAlPedido}
                 handleQuitarItemPedido={handleQuitarItemPedido}
                 handleVaciarPedido={handleVaciarPedido}
                 />
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
        </Col>
      </Row>
    </Container>

  );
}

export default App;
