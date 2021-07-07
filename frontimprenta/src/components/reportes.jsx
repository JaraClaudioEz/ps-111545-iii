import React, { useState, useEffect } from "react"
//import { Link } from "react-router-dom";
import Chart from 'react-apexcharts'
import { Container, Col, Row, InputGroup, FormControl, Button } from 'react-bootstrap';
import moment from "moment";

import ReporteDataService from "../services/servicio-reporte";

const Reportes = ({ usuario }) => {

  const [fechas, setFechas] = useState([]);
  const [ventasTotales, setVentasTotales] = useState([]);
  const [formatoFecha, setFormatoFecha] = useState("");
  const [cantidadesProductos, setCantidadesProductos] = useState([1, 1, 1, 1, 1]);
  const [productos, setProductos] = useState([]);
  const [mayores, setMayores] = useState("");

  const [options3, setOptions3] = useState({
    chart: {
      id: 'area-example'
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
  });

  const [series3, setSeries3] = useState([{
    name: 'series-1',
    data: [30, 40, 35, 50, 49, 60, 70]
  },
  {
    name: 'series2',
    data: [11, 32, 45, 32, 34, 52, 41]
  }]
  );

  const traerOrdenes = async () => {
    const fechas = [];
    const ventas = [];
    const formato = formatoFecha;

    try {
      const { data } = await ReporteDataService.getTotalVentasPeriodo(formato);
      //const { data } = await OrdenDataService.getListadoOrdenes();
      //console.log(data, formato);

      data.ordenes.map(item => {
        switch (formato) {
          case 'year':
            fechas.push(moment(item._id).format('YYYY'));
            break;
          case 'month':
            fechas.push(moment(item._id).format('MMM - YYYY'));
            break;
          default:
            fechas.push(moment(item._id).format('LL'));
            break;
        };
        ventas.push(item.totalVentas);
        //console.log(item);
      });

      //console.log(fecha)
      setFechas(fechas);
      setVentasTotales(ventas);
      //console.log(fechas, ventas);
    } catch (error) {
      console.log(error);
    }
  };

  const traerProductos = async () => {
    const cantidades = [];
    const nombres = [];
    const mayor = mayores;

    try {
      const { data } = await ReporteDataService.getCantidadesPorProducto(mayor);
      //console.log(data);
      data.productos.map(item => {
        if (mayor === 'ventas') {
          cantidades.push(item.venta_total);
        }
        else{
          cantidades.push(item.cantidad_total);
        }
        
        data.nombres.map(nombre => {
          if (nombre._id === item.idProducto) {
            nombres.push(nombre.nombre_producto);
          }
        });
      });
      //console.log(cantidades);
      setCantidadesProductos(cantidades);
      setProductos(nombres);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    traerOrdenes();
    traerProductos();
  }, []);

  useEffect(() => {
    traerOrdenes();
  }, [formatoFecha]);

  useEffect(() => {
    traerProductos();
  }, [mayores]);

  const onChangeFiltrarPeriodo = e => {
    const filtro = e.target.value;
    setFormatoFecha(filtro);
  };

  const onChangeFiltrarProducto = e => {
    const filtro = e.target.value;
    setMayores(filtro);
  };

  //console.log(mayores);

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs lg="2">

        </Col>
        <Col md="auto">
          <div>
            <h6 className="display-6">Total Ventas por período: </h6>
          </div>
          <Chart options={{
            chart: {
              id: 'ventas-periodo'
            },
            xaxis: {
              categories: fechas
            },
            dataLabels: {
              enabled: true
            },
          }} series={[{
            name: 'ventas',
            data: ventasTotales
          },
          ]} type="bar" width={500} height={320} />
        </Col>
        <Col xs lg="3" className="d-flex align-items-center">
          <label>Filtrar por...</label>
          <InputGroup className="mb-3">
            <FormControl as="select" custom onChange={onChangeFiltrarPeriodo}>
              <option value="day" key="1">Día</option>
              <option value="month" key="2">Mes</option>
              <option value="year" key="3">Año</option>
            </FormControl>
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col xs lg="2">
        </Col>
        <Col md="auto">
          <div>
            <h6 className="display-6">Productos mas vendidos: </h6>
          </div>
          <Chart options={{
            chart: {
              type: 'polarArea',
            },
            labels: productos,
            stroke: {
              colors: ['#fff']
            },
            fill: {
              opacity: 0.8
            },
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: 'bottom'
                }
              }
            }]
          }} series={cantidadesProductos} type="polarArea" width={500} height={320} />
        </Col>
        <Col xs lg="2" className="d-flex align-items-center">
          <label>Filtrar por...</label>
          <InputGroup className="mb-3">
            <FormControl as="select" custom onChange={onChangeFiltrarProducto}>
              <option value="cantidades" key="1">Cantidades</option>
              <option value="ventas" key="2">Ventas</option>
            </FormControl>
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col xs lg="2">
        </Col>
        <Col md="auto">
          <div>
            <h6 className="display-6">Ventas por Categoría: </h6>
          </div>
          <Chart options={options3} series={series3} type="area" width={500} height={320} />
        </Col>
        <Col xs lg="2">
        </Col>
      </Row>
    </Container>
  );
}

export default Reportes;