import React, { useState, useEffect } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import moment from "moment";
import 'moment/locale/es';
import "./App.css";

import Navbar from "./components/navbar";
import Inicio from "./components/inicio";
import Producto from "./components/producto";
import ListaProductos from "./components/lista-productos";
import AddProducto from "./components/agregar-producto";
import Autorizacion from "./components/autorizacion";
import Usuario from "./components/usuario";
import Pedido from "./components/pedido";
import ListaOrdenes from "./components/lista-ordenes";
import ListaUsuarios from "./components/lista-usuarios";
import Reportes from "./components/reportes";
import Legales from "./components/legales";
import Orden from "./components/orden";
import ProcesoPago from "./components/procesar-pago";
import Footer from "./components/footer";
import Contacto from "./components/contacto";

import PedidoDataService from "./services/servicio-pedido";
import UsuarioDataService from "./services/servicio-usuario";


const App = () => {

  const [user, setUser] = useState(null);
  const [pedido, setPedido] = useState(null);
  const location = useLocation();

  moment.locale('es');
  //console.log(location);
  const fetchPedido = async () => {
    try {
      if (user !== null) {
        const resultado = await UsuarioDataService.getUsuario(user.result.email);
        //console.log(resultado.data._id);
        const { data } = await PedidoDataService.getProductosPedido(resultado.data._id);
        if (data) {
          setPedido(data);
        }
        //localStorage.setItem('pedido', JSON.stringify(data))
        //console.log({ "Respuesta al traer pedido del usuario: ": data });
      }
      else {
        setPedido(null);
      }

    } catch (error) {
      console.log(error);
    }
  };

  const agregarAlPedido = async (idProducto, cantidad) => {
    try {

      const { data } = await PedidoDataService.addProductoPedido(user.result._id, idProducto, cantidad)
      //console.log(data);
      setPedido(data);

    } catch (error) {
      console.log(error);
    }
  };

  const handleQuitarItemPedido = async (idProducto) => {
    try {
      //console.log(user.result._id);
      const { data } = await PedidoDataService.deleteProductoPedido(user.result._id, idProducto);
      setPedido(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleVaciarPedido = async () => {
    const { data } = await PedidoDataService.vaciarPedido(user.result._id);
    if (data !== null) {
      setPedido(data);
    }
    else {
      setPedido(null);
    };

  };

  const obtenerUsuario = async () => {
    try {
      const usuario = JSON.parse(localStorage.getItem('perfil'));
      //console.log(usuario);
      setUser(usuario);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('perfil')));
    //fetchPedido();
  }, [location]);

  useEffect(() => {
    obtenerUsuario();
    fetchPedido();
  }, []);

  useEffect(() => {
    fetchPedido();
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  //console.log(pedido);
  //console.log(user);


  return (
    <Container>
      <Row>
        <Col>
          <Navbar totalItems={!pedido ? 0 : pedido.items.length} user={user} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Switch>
            <Route exact path={["/", "/imprenta"]} component={Inicio} usuario={user} />
            <Route exact path={"/orden/respuestamp"} component={ProcesoPago} usuario={user} />
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
              path="/ordenes"
              render={(props) => (
                <ListaOrdenes {...props} usuario={user} />
              )}
            />
            <Route
              path="/orden/:id"
              render={(props) => (
                <Orden {...props} usuario={user} />
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
              path="/reportes"
              render={(props) => (
                <Reportes {...props} usuario={user} />
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
            <Route exact path="/legales" component={Legales} />
            <Route exact path="/contacto" component={Contacto} />
          </Switch>
        </Col>
      </Row>
      <Row>
        <Col>
          <Footer />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
