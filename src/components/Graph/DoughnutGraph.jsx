import React from "react";
import {Doughnut } from "react-chartjs-2";
import { Card } from "react-bootstrap";
import "./Graph.css";

function DoughnutGraph({data, options}) {
  return (
    <Card className="CardBody">
      <Card.Body className="CardBody">
        <Card.Title className="text-center CardTiTle">
          Material Usage Chart
        </Card.Title>
        <Doughnut data={data} options={options} className="mb-5" />
      </Card.Body>
    </Card>
  );
}

export default DoughnutGraph;
