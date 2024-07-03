import React from "react";
import { Line } from "react-chartjs-2";
import { Card } from "react-bootstrap";
import "./Graph.css";

function LineGraph({data, options}) {
  return (
    <Card className="CardBody">
      <Card.Body className="CardBody">
        <Card.Title className="text-center CardTiTle">
          Material Usage Graph
        </Card.Title>
        <Line data={data} options={options} className="mb-5" />
      </Card.Body>
    </Card>
  );
}

export default LineGraph;
