import React from 'react'
import { Card, Row, Col, Image } from 'react-bootstrap';
import "./Card.css";



function PresentaionCard({title, image, figure, margin, marginColor}) {
  return (
    <Card className='presentaionCardBody'>
      <Card.Body >
        <Row className='d-flex justify-content-between'>
          <Col xs={4}>
            <Image
              src={image}
              alt="Users"
              className="img-fluid"
            />
          </Col>
          <Col xs={6}>
            <Card.Title className="text-muted fs-6 d-flex justify-content-end presentaionCardTiTle"> {title}</Card.Title>
            <Card.Text className='d-flex justify-content-end gap-3 presentaionCardText'>
              {figure}
            </Card.Text>
            <div className="text-muted fs-6 d-flex justify-content-end gap-3">
              <span style={{ color: marginColor }}>{margin} </span> +1 this week
          </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default PresentaionCard


export function NoImagCard({title, figure, margin, marginColor}) {
  return (
    <Card className='NoImageCardBody'>
      <Card.Body >
            <Card.Title className="text-muted fs-6 presentaionCardTiTle"> {title}</Card.Title>
            <Card.Text className=' presentaionCardText'>
              {figure}
            </Card.Text>
            <div className="text-muted fs-6 ">
              <span style={{ color: marginColor }}>{margin} </span> +1 this week
          </div>
      </Card.Body>
    </Card>
  );
}