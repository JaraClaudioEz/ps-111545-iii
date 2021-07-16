import React, { useState, useEffect } from "react"
//import { Link } from "react-router-dom";
import Chart from 'react-apexcharts'
import { Container, Col, Row, InputGroup, FormControl } from 'react-bootstrap';
import moment from "moment";

import ReporteDataService from "../services/servicio-reporte";

const Reportes = () => {

  const [fechas, setFechas] = useState([]);
  const [ventasTotales, setVentasTotales] = useState([]);
  const [formatoFecha, setFormatoFecha] = useState("");
  const [cantidadesProductos, setCantidadesProductos] = useState([1, 1, 1, 1, 1]);
  const [productos, setProductos] = useState([]);
  const [mayores, setMayores] = useState("");
  const [fechasCategorias, setFechasCategorias] = useState([]);
  const [imprenta, setImpreta] = useState([]);
  const [estampado, setEstampado] = useState([]);
  const [carteleria, setCarteleria] = useState([]);

  const traerOrdenes = async () => {
    const fechas = [];
    const ventas = [];
    const formato = formatoFecha;

    try {
      const { data } = await ReporteDataService.getTotalVentasPeriodo(formato);
      //const { data } = await OrdenDataService.getListadoOrdenes();
      //console.log(data, formato);

      data.ordenes.forEach(item => {
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
      data.productos.forEach(item => {
        if (mayor === 'ventas') {
          cantidades.push(item.venta_total);
        }
        else {
          cantidades.push(item.cantidad_total);
        }
        nombres.push(item.producto);
      });
      //console.log(cantidades);
      setCantidadesProductos(cantidades);
      setProductos(nombres);
    } catch (error) {
      console.log(error);
    }
  };

  const traerCategorias = async () => {
    const NUM_OF_DAYS = 15;

    const fechas = [];
    let ventas_imprenta = Array(NUM_OF_DAYS).fill(0);
    const ventas_estampado = Array(NUM_OF_DAYS).fill(0);
    const ventas_carteleria = Array(NUM_OF_DAYS).fill(0);
    //const filtro = '';

    for (let i = 0; i < NUM_OF_DAYS; i++) {
      let fecha = moment();
      fecha.subtract(i, 'day');
      fechas.push(fecha.format('YYYY-MM-DD'));
    }
    //console.log(fechas);

    try {
      const { data } = await ReporteDataService.getVentasPorCategorias();
      //console.log(data);
      setFechasCategorias(fechas.reverse());
      data.imprenta.forEach(item => {
        //console.log(item);
        fechas.forEach(i => {
          if (item.fecha === i) {
            ventas_imprenta[fechas.indexOf(i)] = item.venta_total;
          }
        });
      });
      setImpreta(ventas_imprenta);

      data.estampado.forEach(item => {
        //console.log(item);
        fechas.forEach(i => {
          if (item.fecha === i) {
            ventas_estampado[fechas.indexOf(i)] = item.venta_total;
          }
        });
      });
      setEstampado(ventas_estampado);

      data.carteleria.forEach(item => {
        //console.log(item);
        fechas.forEach(i => {
          if (item.fecha === i) {
            ventas_carteleria[fechas.indexOf(i)] = item.venta_total;
          }
        });
      });
      setCarteleria(ventas_carteleria);

      //console.log(ventas_imprenta);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    traerOrdenes();
    traerProductos();
    traerCategorias();
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

  const formatoFechasCategorias = () => {
    const nuevo = [];
    fechasCategorias.forEach(fecha => {
      nuevo.push(moment(fecha).format('L'));
    });
    return nuevo;
  };
  //console.log(fechasCategorias);

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
              categories: fechas,
            },
            yaxis: {
              labels: {
                formatter: function (value) {
                  return "$ " + value;
                }
              },
            },
            dataLabels: {
              enabled: true
            },
          }} series={[{
            name: 'Ventas',
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
            <h6 className="display-6">Productos más vendidos: </h6>
          </div>
          <Chart options={{
            chart: {
              type: 'polarArea',
            },
            labels: productos,
            stroke: {
              colors: ['#fff']
            },
            yaxis: {
              labels: {
                formatter: function (value) {
                  if (mayores === 'ventas') {
                    return "$ " + value;
                  } else {
                    return value;
                  }
                }
              },
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
          <Chart options={{
            chart: {
              id: 'ventas-categoria'
            },
            xaxis: {
              categories: formatoFechasCategorias()
            },
            yaxis: {
              labels: {
                formatter: function (value) {
                  return "$ " + value;
                }
              },
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              curve: 'smooth'
            },
          }} series={[{
            name: 'Imprenta',
            data: imprenta
          },
          {
            name: 'Estampado',
            data: estampado
          },
          {
            name: 'Cartelería',
            data: carteleria
          },
          ]} type="area" width={500} height={320} />
        </Col>
        <Col xs lg="2">
        </Col>
      </Row>
    </Container>
  );
}

export default Reportes;