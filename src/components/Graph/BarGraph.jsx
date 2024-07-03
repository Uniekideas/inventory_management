import React from "react";
import { Bar } from "react-chartjs-2";
import { Card } from "react-bootstrap";
import "./Graph.css";

function BarGraph({ data, options }) {
  return (
    <Card className="CardBody">
      <Card.Body className="CardBody">
        <Card.Title className="text-center CardTiTle">
          Stock Level Summary
        </Card.Title>
        <Bar data={data} options={options} className="mb-5" />
      </Card.Body>
    </Card>
  );
}

export default BarGraph;
