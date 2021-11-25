import React, { useState, useEffect } from "react"
//import { Link } from "react-router-dom";
import Chart from 'react-apexcharts'
import { Container, Col, Row, InputGroup, FormControl, Form, Button } from 'react-bootstrap';
import moment from "moment";
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';

import ReporteDataService from "../services/servicio-reporte";
import AccessDenied from "../components/403.jsx";

const Reportes = ({ usuario }) => {

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
  const [fechaDesde, setFechaDesde] = useState(new Date());
  const [fechaHasta, setFechaHasta] = useState(new Date());

  //setDefaultLocale('es');


  const traerOrdenes = async () => {
    const fechas = [];
    const ventas = [];
    const formato = formatoFecha;

    try {
      const { data } = await ReporteDataService.getTotalVentas(formato);
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
      setFechas(fechas.reverse());
      setVentasTotales(ventas.reverse());
      //console.log(fechas, ventas);
    } catch (error) {
      console.log(error);
    }
  };

  const buscarPorFechas = async () => {
    var desde = moment(fechaDesde).format('YYYY[-]MM[-]DD')
    var hasta = moment(fechaHasta).format('YYYY[-]MM[-]DD')
    //console.log(typeof(desde), hasta);
    const fechas = [];
    const ventas = [];
    const formato = formatoFecha;

    try {
      const { data } = await ReporteDataService.getTotalVentasPeriodo(desde, hasta);
      //console.log(data, formato);

      if (!data) {
        alert("No hay ventas para el período seleccionado!");
      }

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
      setFechas(fechas.reverse());
      setVentasTotales(ventas.reverse());
      //console.log(fechas, ventas);
    } catch (error) {
      console.log(error);
    }
  };

  const traerProductos = async () => {
    const cantidades = [];
    const nombres = [];
    const mayor = mayores;
    const max = 10;

    try {
      const { data } = await ReporteDataService.getCantidadesPorProducto(mayor);
      //console.log(data);

      data.productos.forEach(item => {
        if (nombres.length < max) {
          if (mayor === 'ventas') {
            cantidades.push(item.venta_total);
          }
          else {
            cantidades.push(item.cantidad_total);
          }
          nombres.push(item.producto);
        }
      });
      //console.log(cantidades);
      setCantidadesProductos(cantidades);
      setProductos(nombres);
    } catch (error) {
      console.log(error);
    }
  };

  const traerCategorias = async () => {
    const NUM_OF_DAYS = 13;

    const fechas = [];
    let ventas_imprenta = Array(NUM_OF_DAYS).fill(0);
    const ventas_estampado = Array(NUM_OF_DAYS).fill(0);
    const ventas_carteleria = Array(NUM_OF_DAYS).fill(0);
    //const filtro = '';

    for (let i = 0; i < NUM_OF_DAYS; i++) {
      let fecha = moment();
      fecha.subtract(i, 'month');
      fechas.push(fecha.format('YYYY-MM'));
    }
    //console.log(fechas);

    try {
      const { data } = await ReporteDataService.getVentasPorCategorias();
      //console.log(data);
      setFechasCategorias(fechas.reverse());
      //console.log(fechasCategorias);
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
      nuevo.push(moment(fecha).format('MMMM YYYY'));
    });
    return nuevo;
  };
  //console.log(fechasCategorias);

  return (
    <div>
      {usuario ? (
        <Container>
          <Row className="justify-content-md-center py-4">
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
                plotOptions: {
                  bar: {
                    borderRadius: 2,
                    dataLabels: {
                      position: 'top', // top, center, bottom
                    },
                  }
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
                  enabled: true,
                  style: {
                    colors: ['#333']
                  },
                  offsetY: -20,
                },
              }} series={[{
                name: 'Ventas',
                data: ventasTotales
              },
              ]} type="bar" width={500} height={320} />
            </Col>
            <Col xs lg="3" className="d-flex align-items-center">
              <Form.Label>Filtrar por...</Form.Label>
              <InputGroup className="mb-3">
                <FormControl as="select" onChange={onChangeFiltrarPeriodo}>
                  <option value="day" key="1">Día</option>
                  <option value="month" key="2">Mes</option>
                  <option value="year" key="3">Año</option>
                </FormControl>
              </InputGroup>
            </Col>
          </Row>
          <Row className="justify-content-md-center mb-4">
            <Col md="auto">
              <Form.Label>Filtrar desde:</Form.Label>
              <DatePicker
                selected={fechaDesde}
                onChange={(date) => setFechaDesde(date)}
                selectsStart
                startDate={fechaDesde}
                endDate={fechaHasta}
                maxDate={new Date()}
                locale={es}
                dateFormat="dd/MM/yyyy"
              />
            </Col>
            <Col md="auto">
              <Form.Label>Filtrar hasta:</Form.Label>
              <DatePicker
                selected={fechaHasta}
                onChange={(date) => setFechaHasta(date)}
                selectsEnd
                startDate={fechaDesde}
                endDate={fechaHasta}
                minDate={fechaDesde}
                maxDate={new Date()}
                locale={es}
                dateFormat="dd/MM/yyyy"
              />
            </Col>
            <Col md="auto" className="my-2">
              <Button variant="outline-secondary" onClick={buscarPorFechas}>Buscar</Button>
            </Col>
            <Col md="auto" className="my-2">
              <Form.Text id="ayudaFiltroPeriodo" muted>
                Seleccione el rango de fechas las cuales desea conocer las ventas totales para dicho período.
                ATENCIÓN: Sólo se mostrarán los primeros 15 resultados.
              </Form.Text>
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
              <Row>
                <label>Filtrar por...</label>
              </Row>
              <Row>
                <InputGroup className="mb-3">
                  <FormControl as="select" onChange={onChangeFiltrarProducto}>
                    <option value="cantidades" key="1">Cantidades</option>
                    <option value="ventas" key="2">Ventas</option>
                  </FormControl>
                </InputGroup>
              </Row>
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
      ) : (
        <AccessDenied />
      )}
    </div>
  );
}

export default Reportes;