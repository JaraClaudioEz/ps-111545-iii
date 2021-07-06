import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import Chart from 'react-apexcharts'
import { Container, Col, Row, InputGroup, FormControl, Button } from 'react-bootstrap';

const Reportes = ({ usuario }) => {

  const [options1, setOptions1] = useState({
    chart: {
      id: 'bar-example'
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
    },
    dataLabels: {
      enabled: true
    },
  });

  const [options2, setOptions2] = useState({
    chart: {
      type: 'polarArea',
    },
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
  });

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

  const [series1, setSeries1] = useState([{
    name: 'series-1',
    data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
  },
  {
    name: 'series2',
    data: [11, 32, 45, 32, 34, 52, 41]
  }]
  );

  const [series2, setSeries2] = useState([14, 23, 21, 17, 15, 10, 12, 17, 21]);

  const [series3, setSeries3] = useState([{
    name: 'series-1',
    data: [30, 40, 35, 50, 49, 60, 70]
  },
  {
    name: 'series2',
    data: [11, 32, 45, 32, 34, 52, 41]
  }]
  );


  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs lg="2">
        </Col>
        <Col md="auto">
          <Chart options={options1} series={series1} type="bar" width={500} height={320} />
        </Col>
        <Col xs lg="2">
        </Col>
      </Row>
      <Row>
        <Col xs lg="2">
        </Col>
        <Col md="auto">
          <Chart options={options2} series={series2} type="polarArea" width={500} height={320} />
        </Col>
        <Col xs lg="2">
        </Col>
      </Row>
      <Row>
        <Col xs lg="2">
        </Col>
        <Col md="auto">
          <Chart options={options3} series={series3} type="area" width={500} height={320} />
        </Col>
        <Col xs lg="2">
        </Col>
      </Row>
    </Container>
  );
}

export default Reportes;